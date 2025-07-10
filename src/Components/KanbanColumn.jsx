import React from "react";
import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { useDroppable, useDraggable } from "@dnd-kit/core";

const DraggableTask = ({ task, onEdit }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={{ marginBottom: 8 }}>
      <TaskCard task={task} onEdit={onEdit} />
    </div>
  );
};

const KanbanColumn = ({ status, tasks, onEdit }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Box
      ref={setNodeRef}
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
        <DraggableTask key={task.id} task={task} onEdit={onEdit} />
      ))}
    </Box>
  );
};

export default KanbanColumn;