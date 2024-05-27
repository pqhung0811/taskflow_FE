import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing, Error, Register, ProtectedRoute, Home } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Profile,
  Tasks,
  Projects,
  Stats,
  SharedLayout,
  ProjetcDetails,
  Notification,
} from "./pages/dashboard";
import webSocketManager from "./components/WebSocketContext";
import React, { useEffect } from 'react';
// import CalendarComponent from "./components/CalendarComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="profile" element={<Profile />} />

          <Route path="project-details" element={<ProjetcDetails />} />
          <Route path="notify" element={<Notification />}/>
          {/* <Route path="calendar" element={<CalendarComponent />}/> */}
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
