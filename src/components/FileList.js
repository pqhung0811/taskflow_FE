import React from "react";
import fileIcon from "../assets/images/file-icon.png";
import axios from "axios";
import customFetch, { urlBase } from "../utils/axios";
import styled from "styled-components";
import FileCard from "./FileCard";

const FileList = ({ files, onFileDeleteClick }) => {
  const handleFileClick = async (file) => {
    try {
      const response = await axios.get(urlBase + `/fileshare/${file.id}`, {
        responseType: "blob", // Đảm bảo rằng dữ liệu trả về là dạng blob
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Thêm header Authorization
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const url = window.URL.createObjectURL(response.data);

      // Tạo một thẻ 'a' để tải xuống tệp
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.filename); // Đặt tên tệp tùy thuộc vào fileId
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // Giải phóng bộ nhớ
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:" + error);
    }
  };

  const handleFileDelete = async (fileId) => {
    const confirmChange = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (confirmChange) {
      try {
        const response = await customFetch.delete(`/fileShare/${fileId}`);
        onFileDeleteClick(response.data);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  return (
    <Wrapper>
      <h6 class="title">Files</h6>
      <div className="file-group-view">
        {/* <h2>File List</h2> */}
        {files.map((file) => (
          <FileCard
            key={file.id}
            onClick={() => handleFileClick(file)}
            name={file.filename}
            onDelete={handleFileDelete}
            id={file.id}
            date={file.updateTime}
            size={file.size}
          />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
    margin-left: auto;
    font-size: 0.9em;

    &:hover {
      color: darkred;
    }
  }
`;

export default FileList;
