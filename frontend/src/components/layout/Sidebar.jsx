import React, { useCallback, useContext, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  InputGroup,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import "./style.css";
import useModal from "../../hooks/useModal";
import { deleteGroup, updateGroup } from "../../services/group";
import toast from "react-hot-toast";
import { DELETE_GROUP, UPDATE_GROUP } from "../../context/groups/constant";
import { GroupsContext } from "../../context/groups/GroupsProvider";
import { ConfirmDialog, FormModal } from "../reusable";
import { updateGroupFormData } from "./../../util/form/updateGroup/data";
import { updateGroupFormValidationSchema } from "./../../util/form/updateGroup/validation";

const Sidebar = ({
  groups,
  setSelectedGroupOption,
  selectedGroupOption,
  isCreateGroupResponseLoading,
  handleCreateGroup,
  setGroupInput,
  groupInput,
}) => {
  const { dispatch } = useContext(GroupsContext);

  const [groupToBeUpdated, setGroupToBeBeUpdated] = useState({});
  const [groupIdToBeDeleted, setGroupIdToBeDeleted] = useState("");
  const [isUpdateGroupResponseLoading, setIsUpdateTodoResponseLoading] =
    useState(false);

  const updateGroupModal = useModal();
  const confirmModal = useModal();

  const handleUpdateGroup = useCallback(
    async (values) => {
      try {
        setIsUpdateTodoResponseLoading(true);
        const response = await updateGroup(groupToBeUpdated?._id, values);
        toast.success("Group Updated Successfully!");
        dispatch({
          type: UPDATE_GROUP,
          payload: response?.data?.data,
        });
      } catch (error) {
        toast.error(error, { id: error });
      } finally {
        setIsUpdateTodoResponseLoading(false);
      }
    },
    [groupToBeUpdated]
  );

  const handleDeleteGroup = useCallback(async () => {
    try {
      await deleteGroup(groupIdToBeDeleted);
      toast.success("Group Deleted Successfully");
      dispatch({
        type: DELETE_GROUP,
        payload: groupIdToBeDeleted,
      });
    } catch (error) {
      toast.error(error, { id: error });
    }
  }, [groupIdToBeDeleted]);

  const handleCloseConfirmModal = useCallback(
    (confirmRes) => {
      if (confirmRes) {
        handleDeleteGroup();
      }
      confirmModal.closeModal();
    },
    [groupIdToBeDeleted]
  );
  return (
    <div className="sidebar-content">
      <h5 className="mb-3 text-center">Groups</h5>
      {Array.isArray(groups) && groups.length > 0 ? (
        <ListGroup className="scroll-auto display">
          {groups.map((group) => (
            <ListGroup.Item
              className="py-2 my-1 rounded-2"
              key={group?._id}
              active={selectedGroupOption?.id === group?._id}
              onClick={() =>
                setSelectedGroupOption({
                  id: group?._id,
                  title: group?.name,
                })
              }
            >
              <div className="d-flex justify-content-between align-items-center ">
                <img
                  src={require("../../assets/to-do-list.png")}
                  height={"25px"}
                  width={"25px"}
                  className="object-fit-cover me-2"
                />
                <h6 className="text-black-black justify-content-start flex-grow-1 my-auto">
                  {group?.name}
                </h6>
                <div className="">
                  <button
                    className="btn bg-transparent text-primary fw-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroupToBeBeUpdated(group);
                      updateGroupModal.openModal();
                    }}
                  >
                    <BiEdit fontSize={20} />
                  </button>
                  <button
                    className="btn bg-transparent text-danger fw-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroupIdToBeDeleted(group?._id);
                      confirmModal.openModal();
                    }}
                  >
                    <AiFillDelete fontSize={20} />
                  </button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <h4 className="text-secondary">No Groups !!</h4>
      )}
      <InputGroup className="mt-3">
        <Form.Control
          placeholder="Enter New Group"
          aria-label="group's name"
          aria-describedby="basic-addon2"
          className="rounded-start"
          onChange={(e) => setGroupInput(e.target.value)}
          value={groupInput}
        />
        <Button
          variant="info"
          id="button-addon"
          disabled={!groupInput}
          onClick={() => {
            handleCreateGroup({ name: groupInput });
          }}
          className="rounded-end"
        >
          {isCreateGroupResponseLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <span>Add</span>
          )}
        </Button>
      </InputGroup>
      <FormModal
        isOpen={updateGroupModal.isOpen}
        handleCloseModal={updateGroupModal.closeModal}
        modalTitle="Update Group"
        formConfig={updateGroupFormData}
        formValidationSchema={updateGroupFormValidationSchema}
        formInitialValues={{
          name: groupToBeUpdated?.name,
        }}
        isResponseLoading={isUpdateGroupResponseLoading}
        defaultValues={{ name: "" }}
        handleSubmit={handleUpdateGroup}
        buttonLabel="Update"
      />
      <ConfirmDialog
        isOpen={confirmModal.isOpen}
        proceed={handleCloseConfirmModal}
        bodyText="Are you sure to delete this group?"
      />
    </div>
  );
};

export default Sidebar;
