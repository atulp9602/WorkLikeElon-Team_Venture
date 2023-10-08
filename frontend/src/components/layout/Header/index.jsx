import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FcTodoList } from "react-icons/fc";
import { toast } from "react-hot-toast";
import React, { useContext, useEffect } from "react";

import "./header.css";

import { UserContext } from "../../../context/user/UserProvider";
import { RESET_USER } from "../../../context/user/constant";
import { setUserProfile } from "../../../context/user/action";

const Header = () => {
  const navigate = useNavigate();
  const {
    state: { user, loading },
    dispatch: userActionDispatch,
  } = useContext(UserContext);

  const handleLogout = async () => {
    localStorage.clear();
    userActionDispatch({
      type: RESET_USER,
    });
    navigate("/authentication/login");
    toast.success("Logout Successfull !!");
  };

  useEffect(() => {
    if (user && !Object.keys(user).length) {
      setUserProfile(userActionDispatch);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light variant-dark shadow-sm">
      <div className="container-fluid px-5">
        <div
          className="navbar-brand d-flex align-items-center"
          onClick={() => window.location.replace("/dashboard")}
          style={{
            cursor: "pointer",
          }}
        >
          <FcTodoList fontSize={30} className="me-1" />
          <span className="fw-bold fs-5">Todo App</span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item dropdown-center position-relative">
              <button
                className="btn border-0 bg-transparent dropdown-toggle px-0"
                type="button"
                data-bs-toggle="dropdown"
                data-display="static"
                aria-expanded="false"
              >
                <CgProfile fontSize={23} className="me-1" />
                <span style={{ fontSize: "15px" }}>
                  {loading ? "Loading..." : user?.username}
                </span>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow-sm"
                style={{
                  maxHeight: "280px",
                }}
              >
                <li className="dropdown-item">
                  <Link className="nav-link" to={`/dashboard/profile`}>
                    Profile
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="nav-link" to="/dashboard/change-password">
                    Change Password
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link
                    className="nav-link  d-flex align-items-center"
                    to="/authentication/login"
                    onClick={handleLogout}
                  >
                    <MdLogout className="me-1" />
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
