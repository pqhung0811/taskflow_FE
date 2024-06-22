import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import FolderTree from "../components/FolderTree";
import FileList from "../components/FileList";
import styled from "styled-components";
import customFetch from "../utils/axios";
import FileUpload from "../components/FileUpload";
import { BsCloudUpload, BsPlus } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const FileShare = () => {
  const location = useLocation();
  const {
    folders: initialFolders,
    files: initialFiles,
    projectId: initialProjectId,
  } = location.state || {};
  const [folders, setFolders] = useState(initialFolders || []);
  const [fileShares, setFileShares] = useState(initialFiles || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectId, setProjectId] = useState(initialProjectId || []);
  const [folderIdPrev, setfolderIdPrev] = useState(null);
  const [path, setPath] = useState("");
  const [showAddFolderDialog, setShowAddFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [openFileUpload, setOpenFileUpload] = useState(false);

  useEffect(() => {
    setFolders(initialFolders || []);
    setFileShares(initialFiles || []);
  }, [initialFolders, initialFiles]);

  // Filter files and folders based on search term
  const filteredFolders = folders.filter((folder) =>
    folder.folderName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredFileShares = fileShares.filter((file) =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFolderClick = (data) => {
    setfolderIdPrev(data.id);
    setPath((prevPath) => `${prevPath}${data.folderName}/`);
    setFolders(data.subFolders || []);
    setFileShares(data.fileShares || []);
  };

  const handleBackClick = useCallback(
    (data) => {
      if (data.id === undefined) {
        setfolderIdPrev(null);
        setFolders(data.folder || []);
        setFileShares(data.fileShare || []);
        setPath("");
      } else {
        setfolderIdPrev(data.id);
        setFolders(data.subFolders || []);
        setFileShares(data.fileShares || []);
        setPath(removeLastSegment(path));
      }
    },
    [path]
  );

  const handleBack = useCallback(async () => {
    try {
      const resp = await customFetch.get(`/folder/back/${folderIdPrev}`);
      handleBackClick(resp.data);
    } catch (error) {
      console.error("Error", error);
    }
  }, [folderIdPrev, handleBackClick]);

  function removeLastSegment(path) {
    if (path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    const lastSlashIndex = path.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      path = path.slice(0, lastSlashIndex);
    }
    if (path === "") {
      return "";
    }
    return path + "/";
  }

  const handleAddFile = async (file) => {
    let url1 = `/project/addFile`;
    let url2 = `/folder/addFile`;
    const formData = new FormData();

    if (file) {
      if (path === "") {
        formData.append("fileShare", file);
        formData.append("projectId", projectId);
        try {
          const resp = await customFetch.post(url1, formData);
          const newFileShare = resp.data;
          setFileShares((prevFileShares) => [...prevFileShares, newFileShare]);
          console.log(JSON.stringify(resp.data));
          return resp.data;
        } catch (error) {
          return;
        }
      } else {
        formData.append("fileShare", file);
        formData.append("projectId", projectId);
        formData.append("folderId", folderIdPrev);
        formData.append("folderPath", path);
        try {
          const resp = await customFetch.post(url2, formData);
          const newFileShare = resp.data;
          setFileShares((prevFileShares) => [...prevFileShares, newFileShare]);
          console.log(JSON.stringify(resp.data));
          return resp.data;
        } catch (error) {
          return;
        }
      }
    }
  };

  const handleAddFolder = () => {
    setShowAddFolderDialog(true);
  };

  const handleFolderSubmit = async (event) => {
    event.preventDefault();
    const folderName = event.target.elements.folderName.value.trim();
    if (folderName) {
      const info = {
        folderName: folderName,
        projectId: folderIdPrev === null ? projectId : 0,
        parentId: folderIdPrev === null ? 0 : folderIdPrev,
      };
      try {
        const resp = await customFetch.post(`/folder/addFolder`, info);
        console.log(JSON.stringify(resp.data));
        const newFolder = resp.data;
        setFolders((prevFolders) => [...prevFolders, newFolder]);
      } catch (error) {
        console.error("Error", error);
      }

      setShowAddFolderDialog(false);
    }
  };

  const handleDeleteFile = (data) => {
    setFileShares((prevFileShares) =>
      prevFileShares.filter((file) => file.id !== data.id)
    );
  };

  const handleDeleteFolder = (data) => {
    setFolders((prevFolders) =>
      prevFolders.filter((folder) => folder.id !== data.id)
    );
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const breadcrumb = useMemo(() => {
    let pt = path
    if (pt.endsWith("/")) {
      pt = pt.slice(0, -1);
    }
    const names = pt.split('/')
    const breadcrumbs = names?.length ? ["HOME", ...names].filter((item)=> !!item) : ["HOME"];
    return (
      <nav ariaLabel="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbs?.map((item, idx) => {
            if (idx === breadcrumbs.length - 1)
              return (
                <li className="breadcrumb-item active" key={idx}>
                  {item}
                  <span>/</span>
                </li>
              );
            if (idx === breadcrumbs.length - 2 && breadcrumbs.length > 1)
              return (
                <li className="breadcrumb-item prev" onClick={handleBack}>
                  {item}
                </li>
              );
            return <li className="breadcrumb-item">{item}</li>;
          })}
        </ol>
      </nav>
    );
  }, [path, handleBack]);

  return (
    <Wrapper>
      <div>
        <div className="file-search-body">
          <div className="search-bar">
            <input
              class="search-input"
              type="text"
              placeholder="Search..."
              onChange={handleChange}
            />
          </div>
          <button onClick={handleAddFolder} className="btn btn-add-folder ml-2">
            <BsPlus />
            Add Folder
          </button>
          <button class="btn" onClick={() => setOpenFileUpload(true)}>
            <BsCloudUpload /> Upload
          </button>
        </div>

        <div className="row">
          <div>
            <div className="tf-breadcrumb">{breadcrumb}</div>
            <FolderTree
              folders={filteredFolders}
              onFolderClick={handleFolderClick}
              onFolderDeleteClick={handleDeleteFolder}
            />
            <FileList
              files={filteredFileShares}
              onFileDeleteClick={handleDeleteFile}
            />
          </div>
          <Modal
            show={showAddFolderDialog}
            onHide={() => setShowAddFolderDialog(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Folder</Modal.Title>
            </Modal.Header>
            <form onSubmit={handleFolderSubmit}>
              <Modal.Body>
                <div class="mb-3">
                  <label for="folderName" class="form-label">
                    Folder Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="folderName"
                    value={newFolderName}
                    id="folderName"
                    onChange={(e) => setNewFolderName(e.target.value)}
                  />
                </div>
                <Modal.Footer>
                  <Button type="submit">OK</Button>
                  <Button
                    type="button"
                    onClick={() => setShowAddFolderDialog(false)}
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal.Body>
            </form>
          </Modal>
        </div>
      </div>
      {openFileUpload && (
        <FileUpload
          handleAddFile={handleAddFile}
          onClose={() => setOpenFileUpload(false)}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    padding-top: 20px;
  }

  .mb-4 {
    margin-bottom: 1.5rem;
  }

  .btn-block {
    width: 100%;
    margin-top: 10px;
  }

  .search-input {
    border: none;
    background: transparent;
    flex: 1;
  }
  .search-input:focus {
    outline: none;
  }

  .search-bar {
    display: flex;
    gap: 1rem;
    flex: 1;
  }

  .folder-tree,
  .file-list {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .folder-tree li,
  .file-list li {
    padding: 5px 0;
    list-style-type: none;
  }

  .folder-tree li:hover,
  .file-list li:hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }

  .folder-tree ul,
  .file-list ul {
    padding-left: 0;
  }

  /* Đảm bảo các cột có đủ không gian trống giữa chúng */
  .col-md-3 {
    margin-top: 20px; /* Thêm khoảng cách giữa các cột */
  }

  .float-left {
    float: left; /* Đưa nút "Back" sang trái */
    margin-right: 10px; /* Tạo khoảng cách giữa nút "Back" và các nút khác */
  }

  .btn-back {
    margin-top: 20px; /* Điều chỉnh giá trị này để thay đổi khoảng cách */
    // position: absolute;
    // top: 110px; /* Điều chỉnh vị trí từ phía trên */
    // left: 280px; /* Điều chỉnh vị trí từ phía trái */
  }

  .add-file-input {
    margin-right: 20px; /* Điều chỉnh giá trị này để thay đổi khoảng cách */
  }
`;

export default FileShare;
