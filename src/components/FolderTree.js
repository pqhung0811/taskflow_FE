import React from 'react';
import folderIcon from "../assets/images/folder-icon.png";
import customFetch from '../utils/axios';

const FolderTree = ({ folders, onFolderClick }) => {
  const handleFolderClick = async (folderId) => {
    try {
        const resp = await customFetch.get(`/folder/file/${folderId}`);
        onFolderClick(resp.data);
      } catch (error) { 
        console.error('Error editing comment:', error);
      }
  };
      
  const renderFolders = (folders) => {
    return (
      <ul>
        {folders.map(folder => (
          <li key={folder.id} onClick={() => handleFolderClick(folder.id)}>
            <img src={folderIcon} alt="Folder" className="folder-icon" style={{ width: '50px', height: '50px' }}/>
            {folder.folderName}
            {folder.subFolders.length > 0 && renderFolders(folder.subFolders)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="folder-tree">
      {/* <h2>Folder Tree</h2> */}
      {renderFolders(folders)}
    </div>
  );
};

export default FolderTree;
