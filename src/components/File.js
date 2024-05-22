import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import customFetch, { urlBase } from "../utils/axios";
import { deleteFileAttachment } from '../features/currentProject/currentProjectSlice';

const File = ({ addFile, deleteFile, files }) => {
    const fileInputRef = useRef(null);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      if (Array.isArray(files)) {
        const initialData = files.map((item) => ({
          fileId: item.id,
          filename: item.filename,
        }));
        setData(initialData);
      }
    }, [files]);

    useEffect(() => {
      console.table(data);
    }, [data]);

    const handleFileChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const newFile = { file };
          const response = await addFile(newFile);
  
          // Sau khi thành công, cập nhật danh sách file trong state
          setData((prevData) => [
            ...prevData,
            { fileId: response.payload.id, filename: response.payload.filename },
          ]);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    const handleFileUpload = () => {
      fileInputRef.current.click();
    };

    const handleFileDownload = async (fileId) => {
      try {
        const file = data.find((file) => file.fileId === fileId);
        if (!file) {
            console.error("File not found for fileId:", fileId);
            return;
        }
  
        const response = await axios.get(urlBase + `/file/${fileId}`, {
          responseType: 'blob', // Đảm bảo rằng dữ liệu trả về là dạng blob
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Thêm header Authorization
          }
        });
    
        const url = window.URL.createObjectURL(response.data);

        // Tạo một thẻ 'a' để tải xuống tệp
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', file.filename); // Đặt tên tệp tùy thuộc vào fileId
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);

        // Giải phóng bộ nhớ
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading file:' + error);
      }
    };

    const handleFileDelete = async (fileId) => {
      try {
        // Gửi yêu cầu DELETE đến endpoint `/file/${fileId}`
        const response = await deleteFile(fileId);

        // Cập nhật danh sách file trong state sau khi xóa
        setData((prevData) => prevData.filter((file) => file.fileId !== fileId));
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    };
  
    return (
      <Wrapper>
        <div className="file-upload">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <button onClick={handleFileUpload}>Upload File</button>
        </div>
        <div className="file-list">
            {data.length === 0 ? (
                <NoFileMessage>No files uploaded</NoFileMessage>
            ) : (
            <FileListContainer>
                {data.map((file) => (
                <FileItemContainer key={file.fileId}>
                  <FileItem onClick={() => handleFileDownload(file.fileId)}>
                      <FileName>{file.filename}</FileName>
                  </FileItem >
                  <DeleteButton onClick={() => handleFileDelete(file.fileId)}>
                      delete
                      {/* &#x2715; */}
                  </DeleteButton>
                </FileItemContainer>
                ))}
            </FileListContainer>
            )}
        </div>
      </Wrapper>
    );
  };
  
  const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const FileListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
`;

const FileItem = styled.div`
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 90%;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FileName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const NoFileMessage = styled.div`
  text-align: center;
  color: #666;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  margin-left: 10px;
  font-size: 0.9em;

  &:hover {
    color: darkred;
  }
`;

  export default File;
  