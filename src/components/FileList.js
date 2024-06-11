import React from 'react';
import fileIcon from "../assets/images/file-icon.png";
import axios from 'axios';
import customFetch, { urlBase } from '../utils/axios';
import styled from 'styled-components';

const FileList = ({ files, onFileDeleteClick }) => {
  const handleFileClick = async (file) => {
    try {
        const response = await axios.get(urlBase + `/fileshare/${file.id}`, {
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
    const confirmChange = window.confirm('Are you sure you want to delete this file?');
    if (confirmChange) {
      try {
        const response = await customFetch(`/fileShare/${fileId}`);
        onFileDeleteClick(response.data);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  }

  return (
    <Wrapper>
      <div className="file-list">
        {/* <h2>File List</h2> */}
        <ul>
          {files.map(file => (
            <li key={file.id} onClick={() => handleFileClick(file)}>
              <img src={fileIcon} alt="File Icon" className="file-icon" style={{ width: '50px', height: '50px' }}/>
              {file.filename}
              <button className='delete-button' onClick={() => handleFileDelete(file.id)}> delete </button>
            </li>
          ))}
        </ul>
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
    margin-left: auto;
    font-size: 0.9em;

    &:hover {
      color: darkred;
    }
  }
`;

export default FileList;
