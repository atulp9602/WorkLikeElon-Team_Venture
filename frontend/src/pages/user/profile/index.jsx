import React, { useContext } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillEdit } from "react-icons/ai";

import "./profile.css";

import { UserContext } from "../../../context/user/UserProvider";

const Profile = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  return (
    <div className="user-profile-container">
      <div className="card shadow-lg user-profile-box position-relative">
        <button className="btn btn-light shadow-sm position-absolute top-0 end-1 m-1">
          <AiFillEdit fontSize={25} className="me-1" /> Edit
        </button>
        <div className="profile-pic">
          <RxAvatar fontSize={100} />
        </div>
        <ul className="user-info">
          <li>{`Username : ${user?.username}`}</li>
          <li>{`Contact : ${user?.contactno} `}</li>
          <li>{`Email : ${user?.email}`}</li>
          {/* <li>{`Account Created : ${new Date(
            user?.createdAt
          ).toLocaleDateString()}`}</li>
          <li>{`Last Updated : ${new Date(
            user?.updatedAt
          ).toLocaleDateString()}`}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
