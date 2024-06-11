import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FolderTree from '../components/FolderTree';
import FileList from '../components/FileList';
import styled from "styled-components";
import customFetch from '../utils/axios';

const FileShare = () => {
  const location = useLocation();
  const { folders: initialFolders, files: initialFiles, projectId: initialProjectId } = location.state || {};
  const [folders, setFolders] = useState(initialFolders || []);
  const [fileShares, setFileShares] = useState(initialFiles || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectId, setProjectId] = useState(initialProjectId || []);
  const [folderIdPrev, setfolderIdPrev] = useState(null);
  const [path, setPath] = useState('');
  const [showAddFolderDialog, setShowAddFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    setFolders(initialFolders || []);
    setFileShares(initialFiles || []);
  }, [initialFolders, initialFiles]);

  // Filter files and folders based on search term
  const filteredFolders = folders.filter(folder => folder.folderName.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredFileShares = fileShares.filter(file => file.filename.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleFolderClick = (data) => {
    setfolderIdPrev(data.id);
    setPath(prevPath => `${prevPath}${data.folderName}/`);
    setFolders(data.subFolders || []);
    setFileShares(data.fileShares || []);
  };

  const handleBackClick = (data) => {
    if (data.id === undefined) {
      setfolderIdPrev(null);
      setFolders(data.folder || []);
      setFileShares(data.fileShare || []);
      setPath("");
    }
    else {
      setfolderIdPrev(data.id);
      setFolders(data.subFolders || []);
      setFileShares(data.fileShares || []);
      setPath(removeLastSegment(path));
    }
  }
 
  const handleBack = async () => {
    try {
      const resp = await customFetch.get(`/folder/back/${folderIdPrev}`);
      handleBackClick(resp.data);
    } catch (error) { 
      console.error('Error', error);
    }
  }

  function removeLastSegment(path) {
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    const lastSlashIndex = path.lastIndexOf('/');
    if (lastSlashIndex !== -1) {
        path = path.slice(0, lastSlashIndex);
    }
    if (path === '') {
        return '';
    }
    return path + '/';
  }

  const handleAddFile = async (event) => {
    let url1 = `/project/addFile`;
    let url2 = `/folder/addFile`;
    const file = event.target.files[0];
    const formData = new FormData();

    if (file) {
      if (path === "") {
        formData.append('fileShare', file);
        formData.append('projectId', projectId);
        try {
          const resp = await customFetch.post(url1, formData);
          const newFileShare = resp.data;
          setFileShares(prevFileShares => [...prevFileShares, newFileShare]);
          console.log(JSON.stringify(resp.data))
          return resp.data;
        } catch (error) {
          return;
        } 
      }
      else {
        formData.append('fileShare', file);
        formData.append('projectId', projectId);
        formData.append('folderId', folderIdPrev);
        formData.append('folderPath', path);
        try {
          const resp = await customFetch.post(url2, formData);
          const newFileShare = resp.data;
          setFileShares(prevFileShares => [...prevFileShares, newFileShare]);
          console.log(JSON.stringify(resp.data))
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
        parentId: folderIdPrev === null ? 0 : folderIdPrev
      };
      try {
        const resp = await customFetch.post(`/folder/addFolder`, info);
        console.log(JSON.stringify(resp.data));
        const newFolder = resp.data;
        setFolders(prevFolders => [...prevFolders, newFolder]);
      } catch (error) { 
        console.error('Error', error);
      }    

      setShowAddFolderDialog(false);
    }
  };

  const handleDeleteFile = (data) => {
    setFileShares((prevFileShares) => prevFileShares.filter((file) => file.id !== data.id));
  };

  const handleDeleteFolder = (data) => {
    setFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== data.id));
  };


  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <FolderTree folders={filteredFolders} onFolderClick={handleFolderClick} onFolderDeleteClick={handleDeleteFolder} />
            <FileList files={filteredFileShares} onFileDeleteClick={handleDeleteFile}/>
          </div>
          <div className="col-md-3">
            <div className="float-right">
              <SearchBar setSearchTerm={setSearchTerm} />
              <div>
                {/* <button onClick={handleAddFile} className="btn btn-primary ml-2">Add File</button> */}
                <input type="file" onChange={handleAddFile} className="btn-primary ml-2 add-file-input" />
              </div>
              <div>
                <button onClick={handleAddFolder} className="btn btn-secondary ml-2 add-folder-button">Add Folder</button>
                {showAddFolderDialog && (
                  <div className="dialog">
                    <h3>Add Folder</h3>
                    <form onSubmit={handleFolderSubmit}>
                      <label>
                        Folder Name:
                        <input type="text" name="folderName" value={newFolderName} 
                                onChange={(e) => setNewFolderName(e.target.value)}/>
                      </label>
                      <button type="submit">OK</button>
                      <button type="button" onClick={() => setShowAddFolderDialog(false)}>Cancel</button>
                    </form>
                  </div>
                )}
              </div>
              <button className="btn btn-back" onClick={handleBack}>Back</button>
            </div>
          </div>
        </div>
      </div>
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

  .search-bar {
    margin-bottom: 20px;
  }

  .folder-tree, .file-list {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .folder-tree li, .file-list li {
    padding: 5px 0;
    list-style-type: none;
  }

  .folder-tree li:hover, .file-list li:hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }

  .folder-tree ul, .file-list ul {
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

  .add-folder-button {
    margin-top: 20px; /* Điều chỉnh giá trị này để thay đổi khoảng cách */
  }
`;

export default FileShare;
