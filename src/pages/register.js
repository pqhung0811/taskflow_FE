import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  toggleSidebar,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import {
  clearCurrentProjectState,
  getProjectMembers,
  getProjectTasks,
  setCurrentProject,
} from "../features/currentProject/currentProjectSlice";
import { GoogleLogin } from "react-google-login";
import ExcelIcon from "../assets/icons/excel-icon";
import FolderCard from "../components/FolderCard";
import FileCard from "../components/FileCard";

const initialState = {
  name: "",
  email: "",
  password: "",
  id: 0,
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSelector((store) => store.user);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, id } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please complete all fields!");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password, id: id }));
      dispatch(toggleSidebar());

      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSuccess = async (response) => {
    const tokenId = response.tokenId;
    console.log('Login Success:', tokenId);

    try {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/api/v1/login/oauth2/google`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
                },
                body: JSON.stringify({ token: tokenId }),
            }
        );

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("token", data.jwtToken);
            console.log("Login successful:", data);
        } else {
            console.error("Login failed:", data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const onFailure = (response) => {
    console.error("Login failed:", response);

    if (response.error === "popup_closed_by_user") {
        alert("Bạn đã đóng cửa sổ đăng nhập trước khi hoàn tất. Vui lòng thử lại.");
    } else {
        console.log("Login failed:", response);
      }
    };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="btn btn-block"
          style={{ marginBottom: "20px" }}
          disabled={isLoading}
        >
          {isLoading ? "loading..." : "submit"}
        </button>
        <GoogleLogin
          clientId="894180138604-7kevalg7r8jgu1hfb1kjjfbceu4esobu.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          className="w-100 btn-google"
        />
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
