import styled from "styled-components";

const Wrapper = styled.section`
    /* Style for table */
    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }

    /* Style for table rows */
    tr {
        border-bottom: 1px solid #ddd;
    }

    td, th {
        padding: 8px;
        text-align: left;
        font-size: 20px;
        border-right: 1px solid #ddd; /* Add border to the right of each cell */
    }

    td:last-child, th:last-child {
        border-right: none; /* Remove border from the last cell of each row */
    }

    .readall {
        background-color: red;
    }

    .message-column {
        width: 50%; /* Set the width of the Message column */
        font-weight: bold; /* Make the text bold */
    }

    .isread-column {
        width: 15%; 
        font-weight: bold;
    }

    /* Style for unread notifications */
    .unread {
        position: relative;
    }

    .unread::before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ff7f0e; /* Choose your color */
        margin-right: 8px;
        position: absolute;
        left: -16px;
        top: 50%;
        transform: translateY(-50%);
    }

    /* Style for the button */
    button {
        padding: 6px 12px;
        background-color: #007bff; /* Choose your color */
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3; /* Choose your color */
    }

    /* Style for the button when notification is read */
    .read + td button {
        display: none;
    }
`;
export default Wrapper;
