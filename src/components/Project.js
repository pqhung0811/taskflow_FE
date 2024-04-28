import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { IoPeopleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch, useSelector } from "react-redux";
import ProjectInfo from "./ProjectInfo";
import moment from "moment";
import {
  setCurrentProject,
  getProjectTasks,
  clearCurrentProjectState,
  getProjectMembers,
} from "../features/currentProject/currentProjectSlice";
import { toggleSidebar } from "../features/user/userSlice";

import {
  deleteProject,
  getTasksByProject,
  setEditProject,
} from "../features/project/projectSlice";
import React, { useEffect, useState } from "react";
import { stringAvatar } from "../utils/utilsFunctions";
import { Avatar, AvatarGroup, Stack } from "@mui/material";
import customFetch, { urlBase } from "../utils/axios";
import userIcon from "../assets/images/user.png";
import UserAvatar from "./UserAvatar";

const Project = ({
  id,
  name,
  members,
  startDate,

  projectManager,

  isSidebarOpen,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSidebarOpen) dispatch(toggleSidebar());
    getTasksByProject(id);

    //console.log("tasks= " + tasks.length);
  }, []);

  const date = moment(startDate).format("MMM Do, YYYY");
  const members1 = members.filter(
    (item, index) => members.findIndex((i) => i.id === item.id) === index
  );
  function timePassed(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const differenceInMilliseconds = now - date;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    const differenceInDaysRounded = Math.floor(differenceInDays);
    return differenceInDaysRounded;
  }
  const [tasks, setTasks] = useState([]);
  const getTasksByProject = async (projectId) =>
    // await fetch(`${urlBase}/projects/${projectId}/tasks`).then(
    await customFetch.get(`/projects/${projectId}/tasks`).then(
    async (response) => {
        if (response.ok) {
          const data = await response.json();
          setTasks(data.tasks);
        } else console.log(response);
        return;
      }
    );

  /*getUserImage(id) {
    fetch(`${urlBase}/image/info/${id}`)
      .then((response) => {
        if (response.ok) return response.blob();
        return;
      })
      .then((blob) => {
        if (blob) {
          const urlx = URL.createObjectURL(blob);
          setUrl(urlx);
          //console.log(urlx);
        }
      })
      .catch((error) => {
        setUrl(userIcon);
      });
  }*/

  return (
    <Wrapper>
      <header style={{ backgroundColor: "#f3f0f8" }}>
        {/*<div className='main-icon'>{name.charAt(0)}</div>*/}
        <Avatar {...stringAvatar(name)} style={{ margin: "4%" }} />
        <div className="info" style={{ marginLeft: "4%" }}>
          <h5>{name}</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <ProjectInfo icon={<FaCalendarAlt />} text={`start date ${startDate}`} />
          <ProjectInfo
            icon={<FaBriefcase />}
            text={`from ${timePassed(startDate)} days`}
          />
          <ProjectInfo
            icon={<IoPeopleOutline />}
            text={` ${tasks.length} tasks`}
          ></ProjectInfo>
          <ProjectInfo
            icon={<IoPeopleOutline />}
            text={` ${members1.length} members`}
          ></ProjectInfo>
          <div style={{ height: "25", float: "right" }}>
            <AvatarGroup max={4} sx={{ marginLeft: "10%" }}>
              {members1.map((item) => {
                return <UserAvatar id={item.id} name={item.name} />;
              })}
            </AvatarGroup>
          </div>
        </div>
        <footer>
          <div className="actions" style={{ float: "center" }}>
            <Link
              to={{
                pathname: "/project-details",
                state: { currentProject: { id, name, members, startDate } },
              }}
              className="btn edit-btn"
              onClick={() => {
                const project = { id, name, members, startDate };
                dispatch(clearCurrentProjectState());
                dispatch(setCurrentProject(project));
                dispatch(getProjectTasks(project.id));
                dispatch(getProjectMembers(project.id));
                if (isSidebarOpen) dispatch(toggleSidebar());
              }}
            >
              See more
            </Link>
            {/*<button
                  type='button'
                  className='btn delete-btn'
                  onClick={() => console.log('edit')}
                >
                  Stop the project
                </button>*/}
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Project;
