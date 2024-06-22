import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./logo";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, clearStore } from "../features/user/userSlice";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => {
    dispatch(toggleSidebar());
  };
  const { dashBoardText } = useSelector((store) => store.user);
  console.log("this is dash text" + dashBoardText);

  const changePassword = async () => {
    navigate("/changepass");
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <div style={{ display: "flex" }}>
          <button type="button" className="toggle-btn" onClick={toggle}>
            <FaAlignLeft />
          </button>
          <button
            className="button-81"
            role="button"
            style={{ padding: "7px", marginLeft: "35px", marginBottom: "5px" }}
            onClick={() => navigate(-1)}
          >
            <RiArrowGoBackLine style={{ fontSize: "large" }} />
          </button>
        </div>
        <div>
          <Logo />
          <h3 className="logo-text">{dashBoardText}</h3>
        </div>

        <DropdownButton
          title={
            <span className="d-inline-flex align-items-center">
              <FaUserCircle />
              {user?.name}
            </span>
          }
        >
          <Dropdown.Item>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore("Logging out..."));
              }}
            >
              logout
            </button>
          </Dropdown.Item>
          <Dropdown.Item>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                changePassword();
              }}
            >
              Change Password
            </button>
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </Wrapper>
  );
};
export default Navbar;
