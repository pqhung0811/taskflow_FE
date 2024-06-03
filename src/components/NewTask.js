import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Wrapper from "../assets/wrappers/TaskModal";
import ProjectInfo from "./ProjectInfo";
import { BiTask } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaAlignLeft, FaCalendarAlt } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { RiCloseLine } from "react-icons/ri";

const NewTask = ({
  handleCloseModal,
  membersList,
  title,
  setTitle,
  assignee,
  setAssignee,
  deadline,
  setDeadline,
  priority,
  setPriority,
  description,
  setDescription,
  category,
  setCategory,
  addNewTask,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !assignee || !priority || !category) {
      toast.error("Please complete all fields");
      return;
    }
    addNewTask();
    handleCloseModal();
  };

  let priorityList = [
    { name: "Low", id: 0 },
    { name: "Medium", id: 1 },
    { name: "High", id: 2}
  ];

  let categoryList = [
    { name: "Feature", id: 0 },
    { name: "Bug", id: 1 },
    { name: "Improvement", id: 2},
    { name: "Technical debt", id: 3},
    { name: "Testing", id: 4},
    { name: "Documentation", id: 5},
    { name: "Refactor", id: 6},
    { name: "Maintenance", id: 7},
    { name: "Research", id: 8},
    { name: "Support", id: 9},
    { name: "Design", id: 10},
    { name: "Meeting", id: 11},
    { name: "Training", id: 12},
    { name: "Deployment", id: 13}
  ];

  return (
    <Wrapper>
      <div>
        <div className="modal ">
          <div className="modal-body" style={{ height: "auto", width: "40%" }}>
            <header>
              <button
                className="button-81 "
                role="button"
                style={{
                  padding: "7px",
                  marginLeft: "35px",
                  marginBottom: "5px",
                  float: "right",
                  position: "absolute",
                  top: "40px",
                  right: "20px",
                }}
                onClick={() => handleCloseModal()}
              >
                <RiCloseLine style={{ fontSize: "large" }} />
              </button>

              <ProjectInfo icon={<BiTask />} text="New task" />
            </header>

            <form onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
              <label htmlFor="title" className="form__label">
                Task title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="form__input"
              />
              <br />
              <label htmlFor="assignee" className="form__label">
                Assigned to:
              </label>
              <div className="form__select-container">
                <select
                  id="assignee"
                  value={assignee}
                  onChange={(event) => setAssignee(event.target.value)}
                  className="form__select"
                  placeholder="choose a member"
                >
                  <option value="" key={-1} style={{ color: "gray" }}>
                    choose a member
                  </option>
                  {membersList.map((member) => {
                    //console.log(member.name);
                    return (
                      <option
                        value={member.name}
                        key={member.id}
                        style={{ color: "black" }}
                      >
                        {member.name}
                      </option>
                    );
                  })}
                </select>
                <FaCaretDown className="form__select-icon" />
              </div>
              <label htmlFor="description" className="form__label">
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="form__input"
                style={{
                  width: '100%',
                  height: '100px', 
                  padding: '10px',
                  fontSize: '16px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px', 
                  boxSizing: 'border-box', 
                  resize: 'vertical', 
                }}
                rows="5" 
              />
              <label htmlFor="priority" className="form__label">
                Priority:
              </label>
              <div className="form__select-container">
                <select
                  id="priority"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value)}
                  className="form__select"
                  placeholder="choose a priority"
                >
                  <option value="" key={-1} style={{ color: "gray" }}>
                    choose a priority
                  </option>
                  {priorityList.map((priority) => {
                    //console.log(member.name);
                    return (
                      <option
                        value={priority.name}
                        key={priority.id}
                        style={{ color: "black" }}
                      >
                        {priority.name}
                      </option>
                    );
                  })}
                </select>
                <FaCaretDown className="form__select-icon" />
              </div>
              <label htmlFor="category" className="form__label">
                Category:
              </label>
              <div className="form__select-container">
                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="form__select"
                  placeholder="choose a category"
                >
                  <option value="" key={-1} style={{ color: "gray" }}>
                    choose a category
                  </option>
                  {categoryList.map((category) => {
                    //console.log(member.name);
                    return (
                      <option
                        value={category.name}
                        key={category.id}
                        style={{ color: "black" }}
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                <FaCaretDown className="form__select-icon" />
              </div>
              <label htmlFor="deadline" className="form__label">
                Deadline:
              </label>
              <div className="form__datepicker-container">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={deadline}
                  onChange={(date) => setDeadline(date)}
                  id="deadline"
                  className="form__input"
                />
                <FaCalendarAlt className="form__datepicker-icon" />
              </div>
              <br />
              <button type="submit" className="form__button">
                Add task
              </button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewTask;
