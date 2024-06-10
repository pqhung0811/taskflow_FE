import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import FolderTree from '../components/FolderTree';
import FileList from '../components/FileList';
import customFetch from '../utils/axios';

const FileShare = () => {
  const location = useLocation();
  const { folders: initialFolders, files: initialFiles } = location.state || {};
  const [folders, setFolders] = useState(initialFolders || []);
  const [fileShares, setFileShares] = useState(initialFiles || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectId, setProjectId] = useState(null);
  const [path, setPath] = useState('');

  useEffect(() => {
    setFolders(initialFolders || []);
    setFileShares(initialFiles || []);
  }, [initialFolders, initialFiles]);

  // Filter files and folders based on search term
  const filteredFolders = folders.filter(folder => folder.folderName.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredFileShares = fileShares.filter(file => file.filename.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleFolderClick = (data) => {
    setPath(prevPath => `${prevPath}${data.folderName}/`);
    setFolders(data.subFolders || []);
    setFileShares(data.fileShares || []);
  };

  const handleAddFile = async () => {
    // let url1 = `/project/addFile`;
    // let url2 = `/folder/addFile`;
    // const formData = new FormData();

    // if (path == "") {
    //     formData.append('fileShare', data.file);
    //     formData.append('projectId', projectId);
    // }
    // formData.append('file', data.file);
    // formData.append('id', task.id);
    // try {
    //   const resp = await customFetch.post(url, info);

    //   return resp.data;
    // } catch (error) {
    //   return;
    // }
  };

  const handleAddFolder = () => {
    // Implement logic for adding a folder
    console.log('Add Folder button clicked');
  };

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-9">
        <FolderTree folders={filteredFolders} onFolderClick={handleFolderClick} />
        <FileList files={filteredFileShares} />
      </div>
      <div className="col-md-3">
        <div className="float-right">
          <SearchBar setSearchTerm={setSearchTerm} />
          <button onClick={handleAddFile} className="btn btn-primary ml-2">Add File</button>
          <button onClick={handleAddFolder} className="btn btn-secondary ml-2">Add Folder</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FileShare;
