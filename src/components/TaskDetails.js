import React, { useEffect, useState } from "react";
import { Comments } from "./Comments"; // a custom component for displaying comments
import Wrapper from "../assets/wrappers/TaskDetails";
import { MdDone } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { TfiTimer } from "react-icons/tfi";
import { GiStairsGoal } from "react-icons/gi";
import { AiOutlineSave } from "react-icons/ai";
import ProjectInfo from "./ProjectInfo";
import { BiTask } from "react-icons/bi";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import { FaPaperclip } from 'react-icons/fa'
import CustomInput from "./CustomInput";
import {
  updateTaskDeadLine,
  updateTaskDesc,
  updateTaskTitle,
  addCommentToTask,
  getCurrentTask,
  updateTaskProgress,
  addFileAttachment,
  deleteFileAttachment,
} from "../features/currentProject/currentProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { toast } from "react-toastify";
import { getAllTasks } from "../features/tasks/allTasksSlice";
import NumericInput from "react-numeric-input";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { setDashboardText } from "../features/user/userSlice";
import File from './File';

function TaskDetails({ taskId, chef, toggleModal, handleCardClick }) {
  const dispatch = useDispatch();
  /*useEffect(() => {
    console.log(" TaskDetail : currentTaskId : " + taskId);
    dispatch(getCurrentTask(taskId));
    toast.info("getcurrentTask called");
  }, []);*/

  const { currentTask } = useSelector((store) => store.currentProject);
  const task = currentTask;
  const comments = task.comments;
  const files = task.files;

  const updateTitle = async (newTitle) => {
    const info = { taskId: task.id, newTitle: newTitle };
    //setTaskValues({...taskValues, title:newTitle});

    dispatch(updateTaskTitle(info)).then(dispatch(getCurrentTask(taskId)));
  };
  const updateDesc = async (newDescription) => {
    const info = { taskId: task.id, newDescription: newDescription };
    //setTaskValues({...taskValues, description:newDescription});

    return await dispatch(updateTaskDesc(info)).then(
      dispatch(getCurrentTask(taskId))
    );
  };
  const updateDeadLine = async (newDeadline) => {
    if (chef) {
      const info = { taskId: task.id, newDeadline: newDeadline };
      dispatch(updateTaskDeadLine(info)).then(dispatch(getCurrentTask(taskId)));
    } else toast.error("only the project manager can modify the deadLine");
  };
  const addComment = async (data) => {
    const info = {
      text: data.text,
      authorId: getUserFromLocalStorage().id,
      taskId: task.id,
    };
    return await dispatch(addCommentToTask(info))
      .then(dispatch(getCurrentTask(taskId)))
      .then(dispatch(getAllTasks()));
  };

  const updateProgress = async (value) => {
    value.preventDefault();
    const info = { taskId: task.id, newAdvance: newAdvances };
    //setTaskValues({...taskValues, description:newDescription});

    return await dispatch(updateTaskProgress(info)).then(
      dispatch(getCurrentTask(taskId))
    );
  };

  const addFile = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('id', task.id);

    const info = formData;
    const response = await dispatch(addFileAttachment(info));

    dispatch(getCurrentTask(taskId));
    return response;
  };

  const deleteFile = async (data) => {
    const info = data;
    const response = await dispatch(deleteFileAttachment(info));
    dispatch(getCurrentTask(taskId));
    return response;
  };

  function toggleEditProgressForm() {
    setEditProgressFormIsOpen(!editProgressFormIsOpen);
  }

  const [editProgressFormIsOpen, setEditProgressFormIsOpen] = useState(false);
  const [newAdvances, setNewAdvances] = useState(task.advance);
  let displayType = "none";
  if (!chef) displayType = "block";

  const deadlineDate = new Date(task.deadline);
  const formattedDeadline = deadlineDate instanceof Date && !isNaN(deadlineDate) ? deadlineDate.toISOString().split('T')[0] : '';

  return (
    <Wrapper>
      <div className="cardinfo">
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={task.title}
            text={task.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
            chef={chef}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <List />
            <p>Description</p>
          </div>
          <CustomInput
            defaultValue={task.description}
            text={task.description || "Add a Description"}
            placeholder="Enter description"
            onSubmit={updateDesc}
            chef={chef}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Calendar />
            <p>DeadLine</p>
          </div>
          <input
            type="date"
            // value={task.deadline}
            value={formattedDeadline}
            min={new Date().toISOString().substr(0, 10)}
            onChange={(event) => updateDeadLine(event.target.value)}
            readOnly={!chef}
          />
        </div>

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <FaPaperclip /> 
            <p>File Attachment</p>
          </div>
          <File files={files} addFile={addFile} deleteFile={deleteFile} />
        </div>

        <header />

        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <CheckSquare />
            <p className="work-progress-text">Work progress</p>
            <button
              className={chef ? "notDisplay" : "hhh"}
              style={{
                backgroundColor: "initial",

                marginLeft: "80%  ",
                marginTop: "5px",
                border: "none",
                float: "right",
              }}
              onClick={toggleEditProgressForm}
            >
              <MdOutlineEdit
                style={{ color: "black", fontSize: "25px", cursor: "hand" }}
              />
            </button>
          </div>
          <div
            className="cardinfo-box-progress-bar"
            style={{ marginBottom: "5%" }}
          >
            <progress value={newAdvances} max="100" />
            <p style={{ marginLeft: "8px", color: "#6ab04c" }}>
              {newAdvances} %
            </p>
          </div>

          {editProgressFormIsOpen && (
            <Form
              onSubmit={updateProgress}
              style={{ marginLeft: "6%", marginTop: "3%", marginRight: "6%" }}
            >
              <div
                className="form-group "
                style={{
                  display: "flex",
                  alignItems: "center",
                  float: "center",
                }}
              >
                <input
                  type="number"
                  value={newAdvances}
                  min={0}
                  max={100}
                  onChange={(event) => setNewAdvances(event.target.value)}
                  readOnly={chef}
                  autoFocus
                  style={{
                    width: "60px",
                    padding: "4px",
                    borderColor: "#95a5a6",
                    borderRadius: "5px",
                    borderWidth: "thin",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: "10px",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <MdDone style={{ color: "#535c68", fontSize: "20" }} />
                </button>
              </div>
            </Form>
          )}

          <header />

          <div className="cardinfo-box">
            <div className="cardinfo-box-title">
              <BiCommentDetail />
              <p>Comments</p>
            </div>
            <Comment comments={comments} addComment={addComment} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default TaskDetails;
