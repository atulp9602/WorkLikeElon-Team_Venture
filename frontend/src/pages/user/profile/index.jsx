import React, { useContext, useEffect } from "react";
import { RxAvatar } from "react-icons/rx";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-hot-toast";

import "./profile.css";

import { updateProfileFormData } from "../../../util/form/updateProfile/data";
import { updateProfileValidationSchema } from "../../../util/form/updateProfile/validation";
import FormModal from "../../../components/reusable/FormModal";
import { UserContext } from "../../../context/user/UserProvider";
import { setUserProfile } from "../../../context/user/action";
import useModal from "../../../hooks/useModal";
import { updateUserDetail } from "../../../services/user";

const Profile = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  const updateProfileModal = useModal();

  const handleUpdateProfile = async (data) => {
    try {
      await updateUserDetail(data);
      toast.success("Profile Updated Successfully!");
      setUserProfile(dispatch);
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
    }
  };

  const profileFormInitialValues = {
    username: user?.username,
    email: user?.email,
    contact: user?.contactno,
  };

  return (
    <div className="user-profile-container">
      <div className="card shadow-lg user-profile-box position-relative">
        <button
          className="btn btn-light shadow-sm position-absolute top-0 end-1 m-1"
          onClick={() => updateProfileModal.openModal()}
        >
          <AiFillEdit fontSize={25} className="me-1" /> Edit
        </button>
        <div className="profile-pic">
          <RxAvatar fontSize={100} />
        </div>
        <ul className="user-info">
          <li>{`Username : ${user?.username} `}</li>
          <li>{`Email : ${user?.email}`}</li>
          <li>{`Contact : ${user?.contactno}`}</li>
          <li>{`Account Created : ${new Date(
            user?.createdAt
          ).toLocaleDateString()}`}</li>
          <li>{`Last Updated : ${new Date(
            user?.updatedAt
          ).toLocaleDateString()}`}</li>
        </ul>
      </div>
      <FormModal
        isOpen={updateProfileModal.isOpen}
        handleCloseModal={updateProfileModal.closeModal}
        modalTitle="Update Profile"
        formConfig={updateProfileFormData}
        formValidationSchema={updateProfileValidationSchema}
        formInitialValues={profileFormInitialValues}
        handleSubmit={handleUpdateProfile}
        buttonLabel="Update"
      />
    </div>
  );
};

export default Profile;
