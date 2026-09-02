import {AppBar, Badge, Box, CircularProgress, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link } from '@tanstack/react-router'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import logo from "../assets/aniposter_logo.png"
import {useContext} from "react";
import {UserContext} from "../../context/UserContext.jsx.ts";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {signOut} from "../../authService/FirebaseAuthService.ts";

export default function TopNavigationBar() {

  const loginUser = useContext(UserContext);

  const renderLoginContainer = () => {
    if(loginUser) {
      return (
          <div>
            <Typography variant="body1" component="span" sx={{color: "#212529"}}>
              {loginUser.email}
            </Typography>

            <Tooltip title="Home">
              <IconButton component={Link} to="/" sx={{color: "#212529"}}>
                <HomeRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Shopping Cart">
              <IconButton component={Link} to="/cart" sx={{color: "#212529"}}>
                <Badge
                    badgeContent={0}
                    showZero
                    color="primary"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                >
                  <ShoppingCartRoundedIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout" sx={{color: "#212529"}}>
                <IconButton>
                  <LogoutRoundedIcon
                      fontSize="large"
                      onClick={async() => {
                        await signOut();
                      }}
                  />
                </IconButton>
            </Tooltip>
          </div>
      )
    } else if(loginUser === null) {
      return (
          <>
            <Tooltip title="Home">
              <IconButton component={Link} to="/" sx={{color: "#212529"}}>
                <HomeRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Login">
              <IconButton component={Link} to="/login" sx={{color: "#212529"}}>
                <LoginRoundedIcon fontSize="large"/>
              </IconButton>
            </Tooltip>
          </>
      )
    } else {
      return (
          <CircularProgress enableTrackSlot size="3rem" aria-label="Loading…" />
      )
    }
  }

  return (
        <AppBar position="sticky" elevation={0} sx={{backgroundColor: "#F0EEE9"}}>
          <Toolbar>
            <Box
              component="img"
              src={logo}
              sx={{height: 100}}
            >
            </Box>

            <Box sx={{flexGrow: 1}} />

            {renderLoginContainer()}
          </Toolbar>
        </AppBar>
  )
}