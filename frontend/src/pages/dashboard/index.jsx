import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import moment from "moment/moment";
import { useMediaQuery } from "@uidotdev/usehooks";

import "./dashboard.css";

import { updateTodoFormData } from "../../util/form/updateTodo/data";
import { todoUpdateFormValidationSchema } from "../../util/form/updateTodo/validation";
import { GroupsContext } from "../../context/groups/GroupsProvider";
import { setGroups } from "../../context/groups/action";
import useModal from "../../hooks/useModal";
import { getCreateTodoFormData } from "../../util/form/createTodo/data";
import { createTodoFormValidationSchema } from "../../util/form/createTodo/validation";
import Sidebar from "../../components/layout/Sidebar";
import {
  ListGridViewSwitch,
  TodosDND,
  SingleTodo,
  TodoList,
} from "../../container";
import { ADD_GROUP } from "../../context/groups/constant";
import LoadingResponsePage from "../LoadingResponsePage";
import {
  ConfirmDialog,
  DetailModal,
  FormModal,
  Select,
} from "../../components/reusable";
import {
  statusSelectionOptions,
  todayAllSelectionOptions,
} from "../../util/data";
import {
  createTodo,
  fetchCurrentDateLoggedUserGroupWiseTodos,
  deleteTodo,
  fetchGroupWiseUserTodoList,
  fetchStatusWiseTodos,
  updateTodo,
  updateTodoSequence,
} from "../../services/todo";
import { createGroup } from "../../services/group";

const Home = () => {
  const {
    state: { groups, loading },
    dispatch,
  } = useContext(GroupsContext);

  const [selectedGroupOption, setSelectedGroupOption] = useState({});
  const [userTodoList, setUserTodoList] = useState([]);
  const [todoToBeUpdated, setTodoToBeUpdated] = useState({});
  const [todoIdToBeDeleted, setTodoIdToBeDeleted] = useState();
  const [todoToShow, setTodoToShow] = useState({});
  const [todayOption, setTodayOption] = useState(0);
  const [groupInput, setGroupInput] = useState("");
  const [selectedTodoStatus, setSelectedTodoStatus] = useState("");
  const [listView, setListView] = useState(true);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const updateTodoModal = useModal();
  const createTodoModal = useModal();
  const confirmModal = useModal();
  const todoDetailModal = useModal();

  useEffect(() => {
    if (isSmallDevice && listView === false) {
      setListView(true);
      toast.success("Switched to List view due to small device.", {
        id: "listview",
      });
    }
  }, [isSmallDevice]);

  useEffect(() => {
    selectedGroupOption?.id && getGroupWiseUserTodoList();
  }, [listView, selectedGroupOption]);

  const statusWiseUserTodos = useMemo(() => {
    if (Array.isArray(userTodoList)) {
      return userTodoList.reduce(
        (acc, todo, index) => {
          if (todo?.status == "todo") {
            return {
              ...acc,
              todo: [...acc.todo, todo].sort((a, b) => a.sequence - b.sequence),
            };
          } else if (todo?.status == "in-progress") {
            return {
              ...acc,
              "in-progress": [...acc["in-progress"], todo].sort(
                (a, b) => a.sequence - b.sequence
              ),
            };
          } else {
            return {
              ...acc,
              completed: [...acc.completed, todo].sort(
                (a, b) => a.sequence - b.sequence
              ),
            };
          }
        },
        {
          todo: [],
          "in-progress": [],
          completed: [],
        }
      );
    }
  }, [userTodoList, listView]);

  const handleSetListView = useCallback(() => {
    setListView(true);
  }, [listView]);
  const handleSetGridView = useCallback(() => {
    setListView(false);
  }, [listView]);

  const [isFetchTodosResponseLoading, setIsFetchTodosResponseLoading] =
    useState(false);
  const [isCreateGroupResponseLoading, setIsCreateGroupResponseLoading] =
    useState(false);
  const [isCreateTodoResponseLoading, setIsCreateTodoResponseLoading] =
    useState(false);
  const [isUpdateTodoResponseLoading, setIsUpdateTodoResponseLoading] =
    useState(false);

  useEffect(() => {
    if (Array.isArray(groups) && !groups.length) {
      setGroups(dispatch);
    }
  }, []);

  useEffect(() => {
    !!selectedGroupOption?.id && getGroupWiseUserTodoList();
  }, [selectedGroupOption?.id]);

  useEffect(() => {
    !!selectedGroupOption?.id && getCurrentDateLoggedUserGroupWiseTodos();
  }, [todayOption]);

  useEffect(() => {
    !!selectedGroupOption?.id && getStatuswiseTodos(selectedTodoStatus);
  }, [selectedTodoStatus]);

  const getGroupWiseUserTodoList = async () => {
    setIsFetchTodosResponseLoading(true);
    try {
      const response = await fetchGroupWiseUserTodoList(
        selectedGroupOption?.id
      );
      setUserTodoList(response?.data?.data[0]?.todos || []);
      setTodayOption(0);
      setSelectedTodoStatus("");
    } catch (error) {
      toast.error(error, { id: error });
      setUserTodoList([]);
    } finally {
      setIsFetchTodosResponseLoading(false);
    }
  };

  const getCurrentDateLoggedUserGroupWiseTodos = async () => {
    if (todayOption == 0) {
      getGroupWiseUserTodoList();
    } else {
      setIsFetchTodosResponseLoading(true);
      try {
        const response = await fetchCurrentDateLoggedUserGroupWiseTodos({
          groupId: selectedGroupOption?.id,
        });
        setUserTodoList(response?.data?.data || []);
        setSelectedTodoStatus("");
      } catch (error) {
        toast.error(error, { id: error });
        setUserTodoList([]);
      } finally {
        setIsFetchTodosResponseLoading(false);
      }
    }
  };

  const handleCreateGroup = async (data) => {
    try {
      setIsCreateGroupResponseLoading(true);
      const response = await createGroup(data);
      toast.success("Group Succesfully created !");
      setGroupInput("");
      dispatch({
        type: ADD_GROUP,
        payload: response?.data?.data,
      });
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsCreateGroupResponseLoading(false);
    }
  };

  const handleCreateTodo = async (data) => {
    try {
      setIsCreateTodoResponseLoading(true);
      const response = await createTodo(data);
      toast.success("Todo Created Successfully");
      setUserTodoList((prev) => [...prev, response?.data?.data]);
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsCreateTodoResponseLoading(false);
    }
  };

  const handleUpdateTodo = async (values) => {
    try {
      setIsUpdateTodoResponseLoading(true);
      const response = await updateTodo(todoToBeUpdated?._id, values);
      toast.success("Todo Updated Successfully");
      setUserTodoList((prev) =>
        prev.map((item) =>
          item?._id === response?.data?.data?._id ? response?.data?.data : item
        )
      );
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsUpdateTodoResponseLoading(false);
    }
  };

  const handleDeleteTodo = useCallback(async () => {
    if (todoIdToBeDeleted) {
      try {
        await deleteTodo(todoIdToBeDeleted);
        toast.success("Todo Deleted Successfully !!");
        setUserTodoList((prev) =>
          prev.filter((item) => item?._id !== todoIdToBeDeleted)
        );
      } catch (error) {
        toast.error(error, { id: error });
      } finally {
      }
    }
  }, [todoIdToBeDeleted]);

  const getStatuswiseTodos = async () => {
    if (selectedTodoStatus === "") {
      getCurrentDateLoggedUserGroupWiseTodos();
    } else {
      const payload = {
        groupId: selectedGroupOption?.id,
        status: selectedTodoStatus,
      };
      setIsFetchTodosResponseLoading(true);
      try {
        const response = await fetchStatusWiseTodos(payload);
        setUserTodoList(response?.data?.data || []);
      } catch (error) {
        toast.error(error, { id: error });
      } finally {
        setIsFetchTodosResponseLoading(false);
      }
    }
  };

  const handleUpdateTodosSequence = useCallback(async (data) => {
    try {
      const response = await updateTodoSequence(data);
      // setUserTodoList((prev) => prev.sort((a, b) => b.sequence - a.sequence));
      // getGroupWiseUserTodoList();
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
    }
  }, []);

  const handleCloseConfirmModal = useCallback(
    (confirmRes) => {
      if (confirmRes) {
        handleDeleteTodo();
      }
      confirmModal.closeModal();
    },
    [handleDeleteTodo]
  );

  const groupOptions = useMemo(() => {
    return Array.isArray(groups)
      ? groups.map((group) => ({ name: group?.name, value: group?._id }))
      : [];
  }, [groups]);

  const renderSingleTodo = (todo) => {
    return (
      <SingleTodo
        isListView={listView}
        key={todo?._id}
        todo={todo}
        setTodoToShow={setTodoToShow}
        setTodoToBeUpdated={setTodoToBeUpdated}
        setTodoIdToBeDeleted={setTodoIdToBeDeleted}
        updateTodoModal={updateTodoModal}
        todoDetailModal={todoDetailModal}
        confirmModal={confirmModal}
      />
    );
  };

  if (loading) {
    return <LoadingResponsePage />;
  }

  return (
    <div className="parent">
      <Row className="container-fluid">
        <Col sm={3} className="sidebar">
          <Sidebar
            groups={groups}
            selectedGroupOption={selectedGroupOption}
            setSelectedGroupOption={setSelectedGroupOption}
            isCreateGroupResponseLoading={isCreateGroupResponseLoading}
            handleCreateGroup={handleCreateGroup}
            setGroupInput={setGroupInput}
            groupInput={groupInput}
          />
        </Col>
        <Col sm={9} className="todo-container">
          <div className="todo-input">
            <p className="fw-2 fs-5 m-0">
              {selectedGroupOption?.title ?? "No Group Selected"}
            </p>
            <button
              type="submit"
              className="btn btn-info shadow-lg"
              onClick={() => {
                createTodoModal.openModal();
              }}
            >
              <AiOutlinePlus fontSize={20} className="me-1" />
              Add Todo
            </button>
          </div>
          <div className="todolist">
            <div className="filter-div">
              <div className="d-flex gap-2 flex-grow-1 justify-content-center">
                <Select
                  currentValue={todayOption}
                  onChangeHandler={setTodayOption}
                  options={todayAllSelectionOptions}
                />
                <Select
                  currentValue={selectedTodoStatus}
                  onChangeHandler={setSelectedTodoStatus}
                  options={statusSelectionOptions}
                />
              </div>

              <ListGridViewSwitch
                listView={listView}
                handleSetListView={handleSetListView}
                handleSetGridView={handleSetGridView}
              />
            </div>

            {listView ? (
              isFetchTodosResponseLoading ? (
                <h5 className="m-3 text-secondary">Loading...</h5>
              ) : (
                <TodoList
                  isFetchTodosResponseLoading={isFetchTodosResponseLoading}
                  userTodoList={userTodoList}
                  renderSingleTodo={renderSingleTodo}
                />
              )
            ) : (
              <TodosDND
                groupId={selectedGroupOption?._id}
                allStatusTodosList={statusWiseUserTodos}
                renderSingleTodo={renderSingleTodo}
                handleUpdateTodosSequence={handleUpdateTodosSequence}
                todoToBeUpdated={todoToBeUpdated}
                setTodoToBeUpdated={setTodoToBeUpdated}
                isUpdateTodoResponseLoading={isUpdateTodoResponseLoading}
              />
            )}
          </div>
        </Col>
      </Row>
      <FormModal
        isOpen={createTodoModal.isOpen}
        handleCloseModal={createTodoModal.closeModal}
        modalTitle="Create Todo"
        formConfig={getCreateTodoFormData(groupOptions)}
        formInitialValues={{
          groupId: selectedGroupOption ? selectedGroupOption?.id : "",
          assignDueDate: moment().format("YYYY-MM-DD 12:00:00"),
        }}
        formValidationSchema={createTodoFormValidationSchema}
        isResponseLoading={isCreateTodoResponseLoading}
        handleSubmit={handleCreateTodo}
        buttonLabel="Add"
      />
      <FormModal
        isOpen={updateTodoModal.isOpen}
        handleCloseModal={updateTodoModal.closeModal}
        modalTitle="Update Todo"
        formConfig={updateTodoFormData}
        formValidationSchema={todoUpdateFormValidationSchema}
        isResponseLoading={isUpdateTodoResponseLoading}
        formInitialValues={{
          ...todoToBeUpdated,
          assignDueDate: moment(todoToBeUpdated?.assignDueDate).format(
            "YYYY-MM-DD"
          ),
        }}
        handleSubmit={handleUpdateTodo}
        buttonLabel="Update"
      />
      <DetailModal
        isOpen={todoDetailModal.isOpen}
        modalTitle="Todo Details"
        handleCloseModal={todoDetailModal.closeModal}
      >
        <h5 className="text-center">{todoToShow?.title}</h5>
        <p>Notes : {todoToShow?.description}</p>
        <p>Status : {todoToShow?.status}</p>
        <p>Due Date : {new Date(todoToShow?.assignDueDate).toLocaleString()}</p>
        <p>Created At : {new Date(todoToShow?.createdAt).toLocaleString()}</p>
        <p>
          Last updated At : {new Date(todoToShow?.updatedAt).toLocaleString()}
        </p>
      </DetailModal>
      <ConfirmDialog
        isOpen={confirmModal.isOpen}
        proceed={handleCloseConfirmModal}
        bodyText="Are you sure to delete this todo?"
      />
    </div>
  );
};

export default Home;
