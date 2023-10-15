import * as React from "react";
import { TiThList } from "react-icons/ti";
import { BsGridFill } from "react-icons/bs";

const ListGridViewSwitch = ({
  handleSetListView,
  handleSetGridView,
  listView,
}) => {
  return (
    <div className="btns border-secondary-subtle">
      <button
        className={`btn btn-sm ${
          listView ? "btn-info text-light" : "btn-light text-info"
        } `}
        onClick={() => handleSetListView()}
      >
        <TiThList fontSize={23} />
      </button>
      <button
        className={`btn btn-sm ${
          listView ? "btn-light text-info" : "btn-info text-light"
        }`}
        onClick={() => handleSetGridView()}
      >
        <BsGridFill fontSize={23} />
      </button>
    </div>
  );
};

export default ListGridViewSwitch;
