import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
// import { TaskProvider, TaskContext } from "./context/TaskContext";
import dayjs from "dayjs";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import KanbanColumn from "./KanbanColumn";
import TaskModal from "./TaskModal";
import { TaskContext } from "../context/TaskContext";

const statuses = ["To Do", "In Progress", "Done"];

const KanbanBoard = ()=> {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, addTask, updateTask } = useContext(TaskContext);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };
  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Handle drag drop by calculating new status based on drag position
  const onDrop = (task, xPosition) => {
    const colWidth = 320; // should match KanbanColumn minWidth + gap
    const newIndex = Math.min(statuses.length - 1, Math.max(0, Math.round(xPosition / colWidth)));
    const newStatus = statuses[newIndex];
    if (newStatus !== task.status) {
      updateTask({ ...task, status: newStatus });
    }
  };

  const onSubmit = (values) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...values });
    } else {
      addTask({ ...values, created: values.created || dayjs() });
    }
    closeModal();
  };

  // Group tasks by status
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter((t) => t.status === status);
    return acc;
  }, {});

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={sidebarOpen} onCreate={openCreateModal} />
      <Box sx={{ flexGrow: 1 }}>
        <Header onMenuClick={toggleSidebar} />
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            p: 2,
            gap: 2,
          }}
        >
          {statuses.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={groupedTasks[status]}
              onEdit={openEditModal}
              onDrop={onDrop}
            />
          ))}
        </Box>
      </Box>

      <TaskModal visible={modalOpen} onCancel={closeModal} onSubmit={onSubmit} task={editingTask} />
    </Box>
  );
}

export default KanbanBoard


