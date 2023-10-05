import React from "react";
import { Button, Form, InputGroup, ListGroup, Spinner } from "react-bootstrap";

import "./style.css";

const Sidebar = ({
  groups,
  setSelectedGroupOption,
  selectedGroupOption,
  isCreateGroupResponseLoading,
  handleCreateGroup,
  setGroupInput,
  groupInput,
}) => {
  return (
    <div className="sidebar-content">
      <h5 className="mb-3 text-center">Groups</h5>
      <ListGroup className="scroll-auto">
        {Array.isArray(groups) &&
          groups.map((group) => (
            <ListGroup.Item
              key={group?._id}
              active={selectedGroupOption?.id === group?._id}
              onClick={() =>
                setSelectedGroupOption({
                  id: group?._id,
                  title: group?.name,
                })
              }
              action
            >
              {group?.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
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
    </div>
  );
};

export default Sidebar;
