import {AppBar, Box, IconButton, Toolbar, Tooltip} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link } from '@tanstack/react-router'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default function TopNavigationBar() {
  return (
        <AppBar position="sticky" elevation={0} sx={{backgroundColor: "#F0EEE9"}}>
          <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, color: "#212529" }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              src="./src/ui/assets/aniposter_logo.png"
              sx={{height: 100}}
            >
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Tooltip title="Home">
              <IconButton component={Link} to="/" sx={{ color: "#212529" }}>
                <HomeRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Shopping Cart">
              <IconButton component={Link} to="/cart" sx={{ color: "#212529" }}>
                <ShoppingCartRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Login">
              <IconButton component={Link} to="/login" sx={{ color: "#212529" }}>
                <LoginRoundedIcon fontSize="large"/>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
  )
}