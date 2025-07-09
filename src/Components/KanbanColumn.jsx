import React from "react";
import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
// import Draggable from 'react-draggable';
import Draggable, {DraggableCore} from 'react-draggable';

const KanbanColumn = ({ status, tasks, onEdit, onDrop }) => {
  return (
    <Box
      sx={{
        minWidth: 300,
        backgroundColor: "#f0f2f5",
        borderRadius: 2,
        p: 1,
        flexShrink: 0,
        height: "calc(100vh - 128px)",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {status}
      </Typography>
      {tasks.map((task) => (
        // <Draggable
        //   axis="x"
        //   bounds="parent"
        //   key={task.id}
        //   onStop={(e, data) => onDrop(task, data.x)}
        // >
          <div>
            <TaskCard task={task} onEdit={onEdit} />
          </div>
        // </Draggable>
      ))}
    </Box>
  );
};

export default KanbanColumn;


// ""
// "Create a Kanban style dashboard with 3 columns
// To Do, In progress, Done

// Each task should have
// Title
// Description
// Status
// Created date
// Asignee

// allow users to:
// Create a new task via model or side panel.
// Edit a task inline or model.
// Delete a task
// Drag & drop tasks between columns

// Responsivness 
// The app should be mobile-friendly.
// Collapsible sidebar for samller screens

// Create kanban dashboard using react js with material ui antd design & react-draggable"