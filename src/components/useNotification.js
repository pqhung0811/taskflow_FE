import { useState } from 'react';
import { fetchNumberNotifications, getNotificationCount, incrementNotificationCount, resetNotificationCount, setNotificationCount as setManagerNotificationCount  } from './NotificationCount';

const useNotification = () => {
  const [notificationCount, setNotificationCount] = useState(getNotificationCount());

  const initializeNotifications = async () => {
    const count = await fetchNumberNotifications();
    setManagerNotificationCount(count);
    setNotificationCount(count);
  };

  const increment = () => {
    incrementNotificationCount();
    setNotificationCount(getNotificationCount());
  };

  const reset = () => {
    resetNotificationCount();
    setNotificationCount(getNotificationCount());
  };

  return {
    notificationCount,
    initializeNotifications,
    increment,
    reset,
    setNotificationCount
  };
};

export default useNotification;
