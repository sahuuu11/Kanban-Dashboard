import React, { useState, useContext, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import dayjs from "dayjs";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import KanbanColumn from "./KanbanColumn";
import TaskModal from "./TaskModal";
import { TaskContext } from "../context/TaskContext";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"; // Drap Drop npm Functionality

const statuses = ["To Do", "In Progress", "Done"];

const KanbanBoard = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, addTask, updateTask } = useContext(TaskContext);
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true);
    }
  }, [isDesktop]);

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const onSubmit = (values) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...values });
    } else {
      addTask({ ...values, created: values.created || dayjs() });
    }
    closeModal();
  };

  const groupedTasks = statuses.reduce((acc, status) => {
  acc[status] = tasks
    .filter((t) => t.status === status)
    .filter((t) => {
      const search = searchTerm.toLowerCase();
      return (
        t.title.toLowerCase().includes(search) ||
        t.description?.toLowerCase().includes(search) ||
        t.assignee?.toLowerCase().includes(search)
      );
    });
  return acc;
}, {});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;

    const taskId = active.id;
    const targetColumn = over.id;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === targetColumn) return;

    updateTask({ ...task, status: targetColumn });

  };

  useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user])

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={sidebarOpen} onCreate={openCreateModal} onClose={toggleSidebar} />
      <Box sx={{ flexGrow: 1 }}>
        <Header onMenuClick={toggleSidebar} onSearch={setSearchTerm} />
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd} >
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              p: 2,
              gap: 2,
            }}
          >
            {statuses.map((status) => (
              <KanbanColumn key={status} status={status} tasks={groupedTasks[status]} onEdit={openEditModal} />
            ))}
          </Box>
        </DndContext>
      </Box>

      <TaskModal
        visible={modalOpen}
        onCancel={closeModal}
        onSubmit={onSubmit}
        task={editingTask}
      />
    </Box>
  );
};

export default KanbanBoard;