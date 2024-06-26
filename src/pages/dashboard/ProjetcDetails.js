import React from "react";
import { Loading, TeamMember } from "../../components";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/ProjectDetails";
import ProgressBar from "react-bootstrap/ProgressBar";
import Board from "react-trello";
import NewCardForm from "react-trello";
import CardSubmitButton from "react-trello";
import { mapData } from "../../utils/taskMaper";

import { useState } from "react";
import NewTask from "../../components/NewTask";

import { MdOutlineAddCircleOutline } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  getProjectTasks,
  createTask,
  getProjectMembers,
  addMemberToProject,
  getCurrentProject,
  getCurrentTask,
  updateTaskState,
  deleteTask,
  removeMember
} from "../../features/currentProject/currentProjectSlice";
import { TaskModal } from "../../components/TaskModal";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/utilsFunctions";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../../features/tasks/allTasksSlice";
import { setDashboardText } from "../../features/user/userSlice";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { MDBCard, MDBCardHeader, MDBCardText } from "mdbreact";
import customFetch from "../../utils/axios";

export const ProjetcDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDashboardText("Project details"));
  }, []);
  const { project } = useSelector((store) => store.currentProject);
  console.log(project);

  //dispatch(getProjectMembers(project.id));
  //dispatch(getProjectTasks(project.payload.id));

  const { tasks, isLoading } = useSelector((store) => store.currentProject);
  //console.log('les taches');
  //console.log(tasks);
  const membersDup = useSelector((store) => store.currentProject).members;
  // [...project.payload.members];
  const members = membersDup.filter(
    (item, index) => membersDup.findIndex((i) => i.id === item.id) === index
  );
  //console.log(members);

  const [taskData, setTaskData] = useState(tasks);

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    const info = { taskId: cardId, newState: targetLaneId };
    dispatch(updateTaskState(info));
    setTaskData(tasks);
    //setBoardHeight(getMaxCardsPerLane() * 200);
    //setValue(value + 1);

    //setTaskData(mapData(tasks));
  };
  let navigate = useNavigate();

  const getAvancement = () => {
    return Math.round(
      tasks.reduce((total, task) => total + task.advance, 0) / tasks.length
    );
  };
  //modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState({});

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const handleCardClick = (taskId) => {
    if (!modalIsOpen) toggleModal();
    dispatch(getCurrentTask(taskId));
    setCurrentTaskId(taskId);
  };

  // const handleBeforeCardDelete = (taskId) => {
  //   const shouldDelete = window.confirm("Are you sure you want to delete this card?");
  //   console.log(shouldDelete);
  //   return shouldDelete; 
  // };

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCardDelete = (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this card?');
    if (confirmDelete) {
      dispatch(deleteTask(taskId));
      setConfirmDelete(false); // Đặt lại giá trị của biến cờ
    } else {
      console.log('Deletion cancelled');
    }
  };

  const [newTaskModalIsOpen, setNewTaskModalIsOpen] = useState(false);
  const handleOpenModal = () => {
    setNewTaskModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setNewTaskModalIsOpen(false);
    setTitle("");
    setAssignee("");
    setDeadline(null);
    setDescription("");
    setPriority(null);
    setCategory(null);
  };
  const addNewTask = () => {
    console.log(category);
    console.log(categoryList.find(item => item.name === category).id);
    const newTask = {
      title,
      // reponsible: members.find((m) => m.name == assignee).id,
      email: members.find((m) => m.name == assignee).email,
      deadline,
      projectId: project.payload.id,
      description,
      priority: priorityList.find(item => item.name === priority).id,
      category: categoryList.find(item => item.name === category).id,
    };
    dispatch(createTask(newTask));
  };
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(null);
  const [category, setCategory] = useState(null);
  const [addMemberFormIsOpen, setAddMemberFormIsOpen] = useState(false);
  const [emailToAdd, setEmailToAdd] = useState("");
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
  function toggleAddMemberForm() {
    setAddMemberFormIsOpen(!addMemberFormIsOpen);
  }
  function addMember(e) {
    e.preventDefault();
    if (members.find((x) => x.email == emailToAdd) != null) {
      toast.error("this user is already part of your project");
      setEmailToAdd("");
      return;
    }
    const data = { email: emailToAdd, id: project.payload.id };
    dispatch(addMemberToProject(data));
    setEmailToAdd("");
    //console.log('add member with email '+ emailToAdd);
  }

  const hanldleClickStatistics = async () => {
    try {
      const projectId = project.payload.id;
      const response = await customFetch.get(`/statistics/${projectId}`);
      navigate('/statistics-project', { state: { statistics: response.data } });
    } catch (error) { 
      console.error('Error: ', error);
    }
  };

  const hanldleClickFileShare = async () => {
    try {
      const projectId = project.payload.id;
      const response = await customFetch.get(`/project/file/${projectId}`);
      navigate('/fileshare', { 
        state: { 
          projectId: projectId,
          folders: response.data.folder,
          files: response.data.fileShare,
        } });
    } catch (error) { 
      console.error('Error: ', error);
    }
  };

  const handleRemoveMember = async (memberId, projectId) => {
    try {
      const confirmChange = window.confirm('Are you sure you want to delete this member?');
      if (confirmChange) {
        const info = {projectId: projectId, userId: memberId};
        dispatch(removeMember(info));
      }
    } catch (error) { 
      console.error('Error editing comment:', error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="main">
        <header>
          {/*<div className='main-icon'>{project.payload.name.charAt(0)}</div>*/}
          <Avatar
            {...stringAvatar(project.payload.name)}
            style={{ margin: "1%" }}
          />

          <div className="info">
            <h5>{project.payload.name}</h5>
            <button onClick={hanldleClickStatistics}> Statistics </button>
            <button onClick={hanldleClickFileShare} className="spaced-button"> File Sharing </button>
          </div>
        </header>

        {/*<div className="project">*/}
        <MDBRow className="row-cols-1 row-cols-md-4 g-7">
          <MDBCol className="col-md-10">
            {/*<div className="details ">*/}
            <div className="progres">
              <h5
                style={{
                  color: "#48484C",

                  marginBottom: 3,
                  fontSize: "large",
                }}
              >
                {" "}
                {!isNaN(getAvancement()) && `Avancement ${getAvancement()} %`}
              </h5>
              <progress value={getAvancement()} max="100" />
            </div>
            <header />

            <div style={{ textAlign: "right" }}>
              <button
                className="button-81"
                role="button"
                style={{
                  padding: "7px",
                  marginLeft: "35px",
                  marginBottom: "5px",
                }}
                onClick={handleOpenModal}
                title="Create a new task"
              >
                <MdOutlineAddCircleOutline
                  style={{
                    fontSize: "xx-large",
                    cursor: "hand",
                  }}
                />
              </button>
            </div>

            <div className="board-container">
              <p
                style={{
                  marginBottom: "2px",
                  color: "#576574",
                  fontSize: "smaller",
                  marginLeft: "35%",
                }}
              >
                click on the spot to see more
              </p>
              <Board
                data={mapData(tasks, true)}
                editable
                cardDraggable
                style={{
                  backgroundColor: " #F6F2FF",
                  //zIndex: '-1',

                  paddingTop: "1%",
                }}
                laneStyle={{ backgroundColor: " #D7CBF6" }}
                handleDragEnd={handleDragEnd}
                onCardClick={(cardId) => handleCardClick(cardId)}
                // onBeforeCardDelete ={(cardId) => handleBeforeCardDelete(cardId)}
                onCardDelete ={(cardId) => handleCardDelete(cardId)}
              >
                <NewCardForm
                  descriptionPlaceholder="assigned to "
                  labelPlaceholder="deadLine"
                  titlePlaceholder="titled"
                  onSubmit={(card) => console.log(card)}
                >
                  <CardSubmitButton />
                </NewCardForm>
              </Board>
            </div>
            {/*</div>*/}
          </MDBCol>
          <MDBCol
            className="col-md-2"
            style={{ marginTop: "5%", borderRadius: "5%", borderColor: "gray" }}
          >
            {/*<div className="members">*/}
            <MDBCard style={{ backgroundColor: "#f9f9ff" }}>
              <MDBCardHeader style={{ alignSelf: "center" }}>
                Members
              </MDBCardHeader>

              {members.map((member) => {
                return <TeamMember key={member.id} member={member} 
                                    onRemove={() => handleRemoveMember(member.id, project.payload.id)}/>;
              })}

              <button
                className="button-81"
                role="button"
                title="add a member"
                onClick={toggleAddMemberForm}
                style={{
                  marginLeft: "40%",
                  marginRight: "40%",
                  padding: "3px",
                  marginBottom: "2%",
                }}
              >
                <MdOutlineAddCircleOutline style={{ fontSize: "larger" }} />
              </button>
              {addMemberFormIsOpen && (
                <Form
                  onSubmit={addMember}
                  style={{
                    marginLeft: "6%",
                    marginTop: "3%",
                    marginRight: "6%",
                  }}
                >
                  <div
                    className="form-group "
                    style={{ display: "grid", alignItems: "center" }}
                  >
                    <input
                      type="email"
                      value={emailToAdd}
                      onChange={(e) => setEmailToAdd(e.target.value)}
                      placeholder="Email"
                      required
                      style={{
                        borderRadius: "5px",
                        border: "none",
                        width: "100%",
                        height: "40px",
                      }}
                    />
                    <Button
                      type="submit"
                      style={{
                        marginTop: "3%",
                        fontSize: "12px",
                        marginLeft: "20%",
                        marginRight: "20%",
                        backgroundColor: "#32257A",
                        border: "none",
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Form>
              )}
              {/*</div>*/}

              <div style={{ clear: "both" }} />
              {/*</div>*/}
            </MDBCard>
          </MDBCol>
        </MDBRow>
        {modalIsOpen && (
          <TaskModal
            currentTaskId={currentTaskId}
            toggleModal={toggleModal}
            chef={true}
          />
        )}

        {newTaskModalIsOpen && (
          <NewTask
            handleCloseModal={handleCloseModal}
            membersList={members}
            title={title}
            setTitle={setTitle}
            assignee={assignee}
            setAssignee={setAssignee}
            deadline={deadline}
            setDeadline={setDeadline}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
            category={category}
            setCategory={setCategory}
            addNewTask={addNewTask}
          />
        )}
      </div>
    </Wrapper>
  );
};
