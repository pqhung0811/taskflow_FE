import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import React, { useEffect, useState, useCallback } from 'react';
import useWebSocket from './UseWebSocket';

const NavLinks = ({ toggleSidebar }) => {
  const [notificationCount, setNotificationCount] = useState(0);

  const handleNewMessage = useCallback(() => {
    setNotificationCount(prevCount => prevCount + 1);
  }, []);

  const { sendMessage } = useWebSocket(handleNewMessage);

  useEffect(() => {
    // Lấy danh sách thông báo từ máy chủ và cập nhật số lượng thông báo
    // fetchNotifications();
  }, []);

  return (
    <div>
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            key={id}
            onClick={toggleSidebar}
            end
          >
            <span className='icon'>{icon}</span>
            {text}
            <div className="notification-icon">
              {id === 5 && notificationCount >= 0 && (
                <span className='notification-count'>{notificationCount}</span>
              )}
            </div>
          </NavLink>
        );
      })}
    </div>
      <style>
        {`
          .notification-icon {
            position: relative;
            margin-left: 20px; 
          }

          .notification-count {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: red;
            color: white;
            border-radius: 50%;
            padding: 4px 8px;
            font-size: 12px;
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};
export default NavLinks;
