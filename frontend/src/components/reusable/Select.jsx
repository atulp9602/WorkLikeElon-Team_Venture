import React from "react";
import { Form } from "react-bootstrap";

const Select = ({ currentValue, onChangeHandler, options }) => {
  return (
    <Form.Select
      aria-label="Default select example"
      size="sm"
      value={currentValue}
      className="w-25"
      onChange={(e) => onChangeHandler(e.target.value)}>
      {Array.isArray(options) &&
        options.map((item) => (
          <option
            key={item.value}
            value={item.value}
            defaultValue={!!item.defaultChecked}>
            {item.name}
          </option>
        ))}
    </Form.Select>
  );
};

export default Select;
