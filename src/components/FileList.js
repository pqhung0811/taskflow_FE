import React from 'react';
import fileIcon from "../assets/images/file-icon.png";
import axios from 'axios';
import { urlBase } from '../utils/axios';

const FileList = ({ files }) => {
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

  return (
    <div className="file-list">
      {/* <h2>File List</h2> */}
      <ul>
        {files.map(file => (
          <li key={file.id} onClick={() => handleFileClick(file)}>
            <img src={fileIcon} alt="File Icon" className="file-icon" style={{ width: '50px', height: '50px' }}/>
            {file.filename}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
