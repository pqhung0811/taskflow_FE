import { IoBarChartSharp } from "react-icons/io5";
import { FaProjectDiagram, FaBell } from "react-icons/fa";

import { ImProfile } from "react-icons/im";
import { FaTasks } from "react-icons/fa";
import { MdSchedule } from 'react-icons/md';
import { MdOutlineAddBox } from "react-icons/md";

const links = [
  /*{ id: 1, text: "statistiques", path: "/", icon: <IoBarChartSharp /> },*/
  { id: 2, text: "your projects", path: "projects", icon: <FaProjectDiagram /> },
  {
    id: 3,
    text: "tasks received ",
    path: "tasks",
    icon: <FaTasks />,
  },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "Notification", path: "notify", icon: <FaBell />},
  { id: 6, text: "Personal statistics", path: "statistics", icon: <IoBarChartSharp/> },
  { id: 7, text: "Task scheduling support", path: "schedule", icon: <MdSchedule/> },
  // { id: 6, text: "Calendar", path: "calendar", icon: <FaCalendar />},
  /*{
    id: 5,
    text: 'create project',
    path: 'add-project',
    icon: <MdOutlineAddBox />,
  },*/
];

export default links;
