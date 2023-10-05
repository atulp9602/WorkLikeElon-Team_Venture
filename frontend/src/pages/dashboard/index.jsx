import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "@uidotdev/usehooks";

import "./dashboard.css";

import useModal from "../../hooks/useModal";
import Sidebar from "../../components/layout/Sidebar";
import { Select } from "../../components/reusable";
import {
  statusSelectionOptions,
  todayAllSelectionOptions,
} from "../../util/data";
import ListGridViewSwitch from "../../components/reusable/ListGridViewSwitch";

const Dashboard = () => {
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

  const handleSetListView = useCallback(() => {
    setListView(true);
  }, [listView]);
  const handleSetGridView = useCallback(() => {
    setListView(false);
  }, [listView]);

  //dummy groups data
  const groups = [
    {
      _id: 1,
      name: "group1",
    },
    {
      _id: 2,
      name: "group2",
    },
    {
      _id: 3,
      name: "group3",
    },
    {
      _id: 4,
      name: "group4",
    },
  ];
  const groupOptions = useMemo(() => {
    return Array.isArray(groups)
      ? groups.map((group) => ({ name: group?.name, value: group?._id }))
      : [];
  }, [groups]);

  return (
    <div className="parent">
      <Row className="container-fluid">
        <Col sm={3} className="sidebar">
          <Sidebar
            groups={groups}
            selectedGroupOption={selectedGroupOption}
            setSelectedGroupOption={setSelectedGroupOption}
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

              <ListGridViewSwitch
                listView={listView}
                handleSetListView={handleSetListView}
                handleSetGridView={handleSetGridView}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
