import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { changePassword } from '../components/ActionChangePass';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleChangePassword = () => {
    // Kiểm tra xác nhận mật khẩu mới
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password don't match");
      return;
    }
    dispatch(changePassword(currentPassword, newPassword));
  };

  return (
    <Wrapper>
    <div>
      <h2>Change Password</h2>
      <div>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>Change Password</button>
      {message && <p>{message}</p>}
    </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
    .container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    }

    h2 {
    font-size: 24px;
    margin-bottom: 20px;
    }

    label {
    display: block;
    margin-bottom: 8px;
    }

    input[type="password"] {
    width: 30%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    }

    button {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    }

    button:hover {
    background-color: #45a049;
    }

    p {
    margin-top: 20px;
    color: #4caf50;
    }   
`;

export default ChangePassword;
