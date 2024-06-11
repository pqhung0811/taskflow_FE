import React from 'react';
import folderIcon from "../assets/images/folder-icon.png";
import customFetch from '../utils/axios';
import styled from 'styled-components';

const FolderTree = ({ folders, onFolderClick, onFolderDeleteClick }) => {
  const handleFolderClick = async (folderId) => {
    try {
      const resp = await customFetch.get(`/folder/file/${folderId}`);
      onFolderClick(resp.data);
    } catch (error) { 
      console.error('Error', error);
    }
  };

  const handleFolderDelete = async (folderId) => {
    const confirmChange = window.confirm('Are you sure you want to delete this folder, it will delete all file in this folder?');
    if (confirmChange) {
      try {
        const response = await customFetch(`/folder/${folderId}`);
        onFolderDeleteClick(response.data);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  }
      
  const renderFolders = (folders) => {
    return (
      <ul>
        {folders.map(folder => (
          <li key={folder.id} onClick={() => handleFolderClick(folder.id)}>
            <img src={folderIcon} alt="Folder" className="folder-icon" style={{ width: '50px', height: '50px' }}/>
            {folder.folderName}
            <button className='delete-button' onClick={() => handleFolderDelete(folder.id)}> delete </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Wrapper>
      <div className="folder-tree">
        {/* <h2>Folder Tree</h2> */}
        {renderFolders(folders)}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
  .folder-icon, .file-icon {
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
