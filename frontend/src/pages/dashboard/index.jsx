import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { AiOutlinePlus, AiOutlineMenuUnfold } from "react-icons/ai";
import { Col, Offcanvas, Row } from "react-bootstrap";
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
import SidebarCotent from "../../components/layout/SidebarContent";
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
  filterLoggedUserTodos,
} from "../../services/todo";
import { createGroup } from "../../services/group";
import CustomSelect from "../../container/CustomSelect";
import CustomDatePicker from "../../container/CustomDatePicker";
import SidebarContent from "../../components/layout/SidebarContent";
import dayjs from "dayjs";
import { Box } from "@mui/material";

const Home = () => {
  const {
    state: { groups, loading },
    dispatch,
  } = useContext(GroupsContext);

  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date().toLocaleDateString())
  );
  const [selectedGroupOption, setSelectedGroupOption] = useState({});
  const [userTodoList, setUserTodoList] = useState([]);
  const [todoToBeUpdated, setTodoToBeUpdated] = useState({});
  const [todoIdToBeDeleted, setTodoIdToBeDeleted] = useState();
  const [todoToShow, setTodoToShow] = useState({});
  const [todayOption, setTodayOption] = useState(0);
  const [groupInput, setGroupInput] = useState("");
  const [selectedTodoStatus, setSelectedTodoStatus] = useState("");
  const [listView, setListView] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

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
    const controller = new AbortController();
    !!selectedGroupOption?.id && getGroupWiseUserTodoList(controller.signal);

    return () => controller.abort();
  }, [selectedGroupOption?.id]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(dayjs(new Date().toLocaleDateString()));
    }
    !!selectedGroupOption?.id && fetchFilteredTodos();
  }, [selectedGroupOption?.id, selectedTodoStatus, selectedDate]);

  const getGroupWiseUserTodoList = async (signal) => {
    setIsFetchTodosResponseLoading(true);
    try {
      const response = await fetchGroupWiseUserTodoList(
        selectedGroupOption?.id,
        signal
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

  const fetchFilteredTodos = async () => {
    const payload = {
      groupId: selectedGroupOption?.id,
      status: selectedTodoStatus,
      createdAt: selectedDate,
    };
    setIsFetchTodosResponseLoading(true);
    try {
      const response = await filterLoggedUserTodos(payload);
      setUserTodoList(response?.data?.data || []);
    } catch (error) {
      toast.error(error, { id: error });
    } finally {
      setIsFetchTodosResponseLoading(false);
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
        <Col md={3} className="sidebar d-none d-md-block">
          <SidebarContent
            setShowSidebar={setShowSidebar}
            groups={groups}
            selectedGroupOption={selectedGroupOption}
            setSelectedGroupOption={setSelectedGroupOption}
            isCreateGroupResponseLoading={isCreateGroupResponseLoading}
            handleCreateGroup={handleCreateGroup}
            setGroupInput={setGroupInput}
            groupInput={groupInput}
          />
        </Col>
        <Col md={9} sm={12} className="todo-container">
          <div className="todo-input">
            <button
              type="button"
              variant="info"
              className="btn shadow-lg d-md-none bg-transparent"
              onClick={handleSidebarToggle}
            >
              <AiOutlineMenuUnfold fontSize={25} color="#31D2F2" />
            </button>
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
              <div className="d-flex gap-2 flex-grow-1">
                <Box sx={{ flex: 1 }}>
                  <CustomDatePicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <CustomSelect
                    currentValue={selectedTodoStatus}
                    onChangeHandler={(e) =>
                      setSelectedTodoStatus(e.target.value)
                    }
                    options={statusSelectionOptions}
                  />
                </Box>
              </div>
              {/* <ListGridViewSwitch
                listView={listView}
                handleSetListView={handleSetListView}
                handleSetGridView={handleSetGridView}
              /> */}
            </div>

            {isFetchTodosResponseLoading ? (
              <h5 className="m-3 text-secondary">Loading...</h5>
            ) : (
              <TodoList
                isFetchTodosResponseLoading={isFetchTodosResponseLoading}
                userTodoList={userTodoList}
                renderSingleTodo={renderSingleTodo}
              />
            )}
          </div>
        </Col>
        <Offcanvas
          show={showSidebar}
          onHide={() => setShowSidebar(false)}
          placement="start"
          style={{
            width: "350px",
          }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Groups</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <SidebarContent
              setShowSidebar={setShowSidebar}
              groups={groups}
              selectedGroupOption={selectedGroupOption}
              setSelectedGroupOption={setSelectedGroupOption}
              isCreateGroupResponseLoading={isCreateGroupResponseLoading}
              handleCreateGroup={handleCreateGroup}
              setGroupInput={setGroupInput}
              groupInput={groupInput}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </Row>
      <FormModal
        isOpen={createTodoModal.isOpen}
        handleCloseModal={createTodoModal.closeModal}
        modalTitle="Create Todo"
        formConfig={getCreateTodoFormData(groupOptions)}
        formInitialValues={{
          groupId: selectedGroupOption ? selectedGroupOption?.id : "",
        }}
        formValidationSchema={createTodoFormValidationSchema}
        isResponseLoading={isCreateTodoResponseLoading}
        handleSubmit={handleCreateTodo}
        buttonLabel="Add"
      />
      <FormModal
        isOpen={updateTodoModal.isOpen}
        handleCloseModal={updateTodoModal.closeModal}
        formInitialValues={{ ...todoToBeUpdated }}
        modalTitle="Update Todo"
        formConfig={updateTodoFormData}
        formValidationSchema={todoUpdateFormValidationSchema}
        isResponseLoading={isUpdateTodoResponseLoading}
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
        <p>Estimated Time : {todoToShow?.estimatedTime}</p>
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
