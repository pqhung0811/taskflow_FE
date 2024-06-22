import React from "react";
import folderIcon from "../assets/images/folder-icon.png";
import customFetch from "../utils/axios";
import styled from "styled-components";
import FolderCard from "./FolderCard";

const FolderTree = ({ folders, onFolderClick, onFolderDeleteClick }) => {
  const handleFolderClick = async (folderId) => {
    try {
      const resp = await customFetch.get(`/folder/file/${folderId}`);
      onFolderClick(resp.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleFolderDelete = async (folderId) => {
    const confirmChange = window.confirm(
      "Are you sure you want to delete this folder, it will delete all file in this folder?"
    );
    if (confirmChange) {
      try {
        const response = await customFetch.delete(`/folder/${folderId}`);
        onFolderDeleteClick(response.data);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const renderFolders = (folders) => {
    return (
      <>
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            id={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            name={folder.folderName}
            onDelete={handleFolderDelete}
            date={folder.updateTime}
          />
        ))}
      </>
    );
  };

  return (
    <Wrapper>
      <h6 class="title">Folder</h6>
      <div className="folder-grid-view">
        {/* <h2>Folder Tree</h2> */}
        {renderFolders(folders)}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 3rem;

  .title {
    border-top: 1px solid #e5e9f2;
    font-size: 1rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 1rem 0;
    margin: 0;
    font-weight: 700;
    line-height: 1.1;
    color: var(--bs-heading-color);
    text-align: start;
  }

  /* Tùy chỉnh style cho danh sách thư mục */
  ul {
    list-style: none; /* Xóa dấu chấm trước mỗi mục */
    padding-left: 0; /* Xóa padding bên trái */
  }

  /* Tùy chỉnh style cho mỗi mục thư mục và tập tin */
  li {
    margin-bottom: 10px; /* Tạo khoảng cách giữa các mục */
    cursor: pointer; /* Biểu tượng chuột khi di chuột qua */
  }

  /* Tùy chỉnh style cho biểu tượng thư mục */
  .folder-icon,
  .file-icon {
    width: 30px; /* Điều chỉnh kích thước */
    height: 30px;
    margin-right: 10px; /* Tạo khoảng cách giữa biểu tượng và văn bản */
  }

  .delete-button {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    margin-left: 10px;
    font-size: 0.9em;

    &:hover {
      color: darkred;
    }
  }
`;

export default FolderTree;
