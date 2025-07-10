import React from "react";
import {
  Drawer,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Sidebar = ({ open, onCreate, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
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
