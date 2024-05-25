import customFetch from "../utils/axios";

let notificationCount = 0;

export const getNotificationCount = () => notificationCount;

export const incrementNotificationCount = () => {
  notificationCount += 1;
};

export const resetNotificationCount = () => {
  notificationCount = 0;
};

export const setNotificationCount = (count) => {
  notificationCount = count;
};

export const fetchNumberNotifications = async () => {
  try {
      const response = await customFetch.get(`/user/noNotify`);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error("There was an error fetching the notifications!", error);
  }
};