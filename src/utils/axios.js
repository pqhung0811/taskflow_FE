import axios from "axios";
import { clearStore } from "../features/user/userSlice";
import { getUserFromLocalStorage } from "./localStorage";

export const urlBase =
  //"http://ec2-15-188-207-170.eu-west-3.compute.amazonaws.com:8080";
  "http://localhost:8080/api/v1";

const customFetch = axios.create({
  baseURL: urlBase,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}` 
  }
});

/* customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});
*/

// customFetch.interceptors.request.use((config) => {
//   const user = getUserFromLocalStorage();
//   if (user) {
//     config.headers['Authorization'] = `Bearer ${user.token}`;
//   }
//   return config;
// });

customFetch.interceptors.request.use(
  function(config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data);
};

export default customFetch;
