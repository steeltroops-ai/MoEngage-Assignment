import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import SearchBar from '../SearchBar/SearchBar';

function Navbar({ userInfo = null }) {
  const [searchCategory, setSearchCategory] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = (value) => {
    navigate(`/search/${value}`);
  };

  const onClearSearch = () => {
    setSearchCategory("");
    navigate(`/`); // Navigate to default path
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(75, 85, 99, 0.5)' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dog's House
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchBar
            value={searchCategory}
            onChange={({ target }) => {
              setSearchCategory(target.value);
              handleSearch(target.value);
            }}
            onClearSearch={onClearSearch}
          />
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={NavLink} to="/" sx={{ '&.active': { color: 'orange' } }}>
            Home
          </Button>
          <Button color="inherit" component={NavLink} to="/lists" sx={{ '&.active': { color: 'orange' } }}>
            Your Lists
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;