import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

export default function CustomDatePicker({ selectedDate, setSelectedDate }) {
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [cleared, setCleared] = useState(false);

  console.log("value", value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{
          padding: 0,
          margin: 0,
          width: "100%",
          "&:hover fieldset.MuiOutlinedInput-notchedOutline": {
            borderColor: "#81e7f9",
          },
          "& .Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
            borderColor: "#31D2F2",
          },
        }}
        format="DD/MM/YYYY"
        defaultValue={dayjs(new Date().toLocaleDateString())}
        disableFuture={true}
        value={selectedDate}
        onChange={(newValue) => {
          setSelectedDate(newValue);
        }}
        slotProps={{
          field: { clearable: true, onClear: () => setCleared(true) },
        }}
        renderInput={(params) => (
          <TextField {...params} className="myDatePicker" fullWidth />
        )}
      />
    </LocalizationProvider>
  );
}
