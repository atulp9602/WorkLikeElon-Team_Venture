import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";

const CustomSelect = ({ currentValue, onChangeHandler, options }) => {
  return (
    <FormControl fullWidth>
      <Select
        size="small"
        value={currentValue}
        displayEmpty
        onChange={onChangeHandler}
        sx={{
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#81e7f9",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#31D2F2",
          },
        }}
      >
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
