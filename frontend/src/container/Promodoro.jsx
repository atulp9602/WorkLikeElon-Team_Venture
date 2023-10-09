import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const Pomodoro = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [tasksBeforeLongBreak, setTasksBeforeLongBreak] = useState(4);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);

        if (timer === 0) {
          if (isBreak) {
            setTaskCount((prev) => prev + 1);
          }

          if (taskCount === tasksBeforeLongBreak) {
            setIsBreak(false);
            setTimer(longBreakTime * 60);
            setTaskCount(0);
          } else {
            setIsBreak(!isBreak);
            setTimer((prev) => (isBreak ? workTime : breakTime) * 60);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, timer, isBreak, taskCount]);

  const handleStart = () => {
    setIsActive(true);
    setTimer(workTime * 60);
    setIsBreak(false);
    setTaskCount(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimer(0);
    setIsBreak(false);
    setTaskCount(0);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Pomodoro Timer
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Work Time (minutes)"
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(Number(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Break Time (minutes)"
              type="number"
              value={breakTime}
              onChange={(e) => setBreakTime(Number(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Long Break Time (minutes)"
              type="number"
              value={longBreakTime}
              onChange={(e) => setLongBreakTime(Number(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Tasks Before Long Break"
              type="number"
              value={tasksBeforeLongBreak}
              onChange={(e) => setTasksBeforeLongBreak(Number(e.target.value))}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
            {timer % 60}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {isBreak ? "Break Time" : "Work Time"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Tasks Completed: {taskCount}
          </Typography>
        </Box>
        <Box mt={3}>
          {!isActive ? (
            <Button variant="contained" color="primary" onClick={handleStart}>
              Start
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePause}
              >
                Pause
              </Button>
              <Button variant="contained" onClick={handleReset}>
                Reset
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Pomodoro;
