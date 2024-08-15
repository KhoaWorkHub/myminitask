import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery } from '@mui/material';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <List>
      <ListItem button>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Questions" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Admins" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Interns" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#000', fontWeight: 'bold' }}>
          Amazing Tech
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ color: '#000' }} // Đảm bảo rằng màu sắc của biểu tượng là màu đen
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <>
            <Button sx={{ color: '#000', display: 'block', fontWeight: 500 }}>Home</Button>
            <Button sx={{ color: '#000', display: 'block', fontWeight: 500 }}>Questions</Button>
            <Button sx={{ color: '#000', display: 'block', fontWeight: 500 }}>Admins</Button>
            <Button sx={{ color: '#000', display: 'block', fontWeight: 500 }}>Interns</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;