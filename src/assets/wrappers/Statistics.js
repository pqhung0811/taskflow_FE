import styled from "styled-components";

const Wrapper = styled.section`
    .dashboard-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    }

    .chart-container {
    flex: 0 0 48%; /* Adjust to fit two charts per row */
    margin-bottom: 20px;
    }

    .full-width-chart {
    flex: 0 0 100%;
    }

    h1 {
        font-size: 30px; 
      }
      
    h2 {
        font-size: 20px;
    }
      
    select {
        margin-left: 10px;
    }

    #email-select {
        padding: 4px 8px; /* Kích thước lề bên trong */
        font-size: 18px; /* Kích thước font chữ */
        border: 1px solid #ccc; /* Viền */
        border-radius: 4px; /* Bo góc */
        background-color: #fff; /* Màu nền */
        color: #333; /* Màu chữ */
        outline: none; /* Loại bỏ đường viền khi focus */
        transition: border-color 0.3s; /* Hiệu ứng khi hover */
      
        &:hover {
          border-color: #999;
        }
      
        &:focus {
          border-color: #66afe9;
          box-shadow: 0 0 0 0.1rem rgba(0, 123, 255, 0.25);
        }
      }   
      
    label[for="email-select"] {
        font-size: 18px; /* Chỉnh kích thước chữ */
        /* Các thuộc tính CSS khác có thể được thêm vào đây nếu cần thiết */
    }
`;
export default Wrapper;
