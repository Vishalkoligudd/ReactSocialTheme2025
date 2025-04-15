import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
    const navigate= useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/',{replace:true})
    }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            My App Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton component={Link} to="/dashboard/postlist">
              <ListItemText primary="PostList" />
            </ListItemButton>
            <ListItemButton component={Link} to="/dashboard/posts">
              <ListItemText primary="Posts" />
            </ListItemButton>
            <ListItemButton component={Link} to="/dashboard/createPost">
              <ListItemText primary="CreatePost" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
