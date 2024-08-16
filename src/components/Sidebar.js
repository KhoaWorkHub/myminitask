import React, { useState } from 'react';
import { useMediaQuery, IconButton, Drawer, List, ListItem, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NewQuestionForm from './NewQuestionForm';

const Sidebar = ({ onNewQuestion, user }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleQuestionSubmit = (newQuestion) => {
    onNewQuestion(newQuestion);
    handleDialogClose();
  };

  const sidebarContent = (
    <List component="nav" className="sidebar">
      <ListItem>
        <Button variant="contained" fullWidth>Manage Questions</Button>
      </ListItem>
      <ListItem>
        <Button variant="contained" fullWidth>Manage Interns</Button>
      </ListItem>
      {user.role === 'student' && (
        <ListItem>
          <Button variant="contained" fullWidth onClick={handleDialogOpen}>Submit Question</Button>
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer(true)}
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        sidebarContent
      )}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Submit a New Question</DialogTitle>
        <DialogContent>
          <NewQuestionForm onQuestionSubmit={handleQuestionSubmit} user={user} />      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;