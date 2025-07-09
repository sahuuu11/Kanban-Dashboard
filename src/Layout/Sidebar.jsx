import React from "react";
import { Drawer, List, ListItem, Typography } from "@mui/material";

const Sidebar = ({ open, onCreate }) => {
  return (
    <Drawer
      variant={open ? "persistent" : "temporary"}
      open={open}
      onClose={() => {}}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        display: { xs: "none", sm: "block" },
      }}
    >
      <Typography variant="h6" sx={{ m: 2 }}>
        Menu
      </Typography>
      <List>
        <ListItem button onClick={onCreate}>
          + Create New Task
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
