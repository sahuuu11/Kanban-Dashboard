import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Popconfirm } from "antd";
import { TaskContext } from "../context/TaskContext";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask, updateTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleTitleSave = () => {
    if (newTitle.trim() && newTitle !== task.title) {
      updateTask({ ...task, title: newTitle.trim() });
      onEdit({ ...task, title: newTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setIsEditing(false);
  };

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
      {isEditing ? (
        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
          <TextField
            variant="standard"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
            fullWidth
          />
          <IconButton onClick={handleTitleSave}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          onClick={() => setIsEditing(true)}
          sx={{ cursor: "pointer", mb: 1 }}
        >
          {task.title}
        </Typography>
      )}

      <Typography variant="body2" sx={{ mb: 1 }}>
        {task.description}
      </Typography>
      <Typography variant="caption" display="block">
        Created: {task.created.format("DD-MM-YYYY")}
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
          <Button size="small" type="link" color="error">
            Delete
          </Button>
        </Popconfirm>
      </Box>
    </Box>
  );
};

export default TaskCard;
