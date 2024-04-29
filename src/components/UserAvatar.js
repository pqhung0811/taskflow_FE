import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./logo";
import NavLinks from "./NavLinks";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../utils/utilsFunctions";
import React, { useEffect, useState } from "react";
import customFetch, { urlBase } from "../utils/axios";
import {
  getUserParticipationProjects,
  setDashboardText,
} from "../features/user/userSlice";
import { getUserFromLocalStorage } from "../utils/localStorage";

const UserAvatar = ({ id, name }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    getUserImage(id);
  }, []);

  const getUserImage = (id) => {
    customFetch.get(`/image/info/${id}`, { responseType: 'blob' })
      .then((response) => {
        if (response.status === 200) return response.data;   
      })
      .then((blob) => {
        if (blob) {
          const urlx = URL.createObjectURL(blob);
          setUrl(urlx);
        }
      })
      .catch((error) => {
        setUrl(null);
      });
  };

  return url ? (
    <Avatar src={url} key={id} />
  ) : (
    <Avatar {...stringAvatar(name)} key={id} />
  );
};
export default UserAvatar;
