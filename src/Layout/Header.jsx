import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  InputBase,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";

const Header = ({ onMenuClick, onSearch }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Kanban Dashboard
          </Typography>

          {/* Search Box */}
          <Box
            sx={{
              backgroundColor: "white",
              px: 1,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              ml: 2,
            }}
          >
            {/* <SearchIcon fontSize="small" color="action" /> */}
            <InputBase
              placeholder="Search tasks..."
              onChange={(e) => onSearch(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
            />
          </Box>
        </Box>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
