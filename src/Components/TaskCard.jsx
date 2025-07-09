import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Popconfirm } from "antd";
import { TaskContext } from "../context/TaskContext";

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask } = useContext(TaskContext);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        p: 2,
        mb: 2,
        boxShadow: 1,
        position: "relative",
        cursor: "move",
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {task.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {task.description}
      </Typography>
      <Typography variant="caption" display="block">
        Created: {task.created.format("YYYY-MM-DD")}
      </Typography>
      <Typography variant="caption" display="block">
        Assignee: {task.assignee}
      </Typography>
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <Button size="small" type="link" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Popconfirm
          title="Delete task?"
          onConfirm={() => deleteTask(task.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      </Box>
    </Box>
  );
};

export default TaskCard;
