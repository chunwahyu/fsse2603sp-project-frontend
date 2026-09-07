import {AppBar, Box, CircularProgress, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Link } from '@tanstack/react-router'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import logo from "../assets/aniposter_logo.png"
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext.ts";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {signOut} from "../../authService/FirebaseAuthService.ts";
import LogoutDialog, {type DialogActionType} from "./LogoutDialog.tsx";

export default function TopNavigationBar() {

  const loginUser = useContext(UserContext);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = async (action: DialogActionType) => {
    setDialogOpen(false);
    if(action === 'logout') {
      await signOut();
    }
  };

  const renderLoginContainer = () => {
    if(loginUser) {
      return (
          <div>
            <Typography
                variant="body1"
                component="span"
                sx={{color: "#212529", mx:1}}
            >
              Welcome back, {loginUser.display_name === undefined ? loginUser.email.split("@")[0] : loginUser.display_name}!
            </Typography>

            <Tooltip title="Home">
              <IconButton
                  component={Link} to="/"
                  sx={{color: "#212529"}}
              >
                <Box
                    sx={{display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                >
                  <HomeRoundedIcon fontSize="large"/>
                  <Typography
                      variant="caption"
                      sx={{color: "#212529"}}
                  >
                    Home
                  </Typography>
                </Box>
              </IconButton>
            </Tooltip>

            <Tooltip title="Shopping Cart">
              <IconButton
                  component={Link}
                  to="/cart"
                  sx={{color: "#212529"}}
              >
                <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                >
                  <ShoppingCartRoundedIcon fontSize="large"/>
                  <Typography
                      variant="caption"
                      sx={{color: "#212529"}}
                  >
                    Cart
                  </Typography>
                </Box>
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton
                  onClick={handleOpenDialog}
                  sx={{color: "#212529"}}
              >
                <Box
                    sx={{display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                >
                  <LogoutRoundedIcon fontSize="large"/>
                  <Typography
                      variant="caption"
                      sx={{color: "#212529"}}
                  >
                    Logout
                  </Typography>
                </Box>
              </IconButton>
            </Tooltip>

            <LogoutDialog open={dialogOpen} onClose={handleCloseDialog} />
          </div>
      )
    } else if(loginUser === null) {
      return (
          <>
            <Typography
                variant="body1"
                component="span"
                sx={{color: "#212529", mx:1}}
            >
              Hello, Guest!
            </Typography>

            <Tooltip title="Home">
              <IconButton
                  component={Link} to="/"
                  sx={{color: "#212529"}}
              >
                <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                >
                  <HomeRoundedIcon fontSize="large"/>
                  <Typography
                      variant="caption"
                      sx={{color: "#212529"}}
                  >
                    Home
                  </Typography>
                </Box>
              </IconButton>
            </Tooltip>

            <Tooltip title="Login">
              <IconButton
                  component={Link}
                  to="/login"
                  sx={{color: "#212529"
                  }}
              >
                <Box
                    sx={{display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                >
                  <LoginRoundedIcon fontSize="large"/>
                  <Typography
                      variant="caption"
                      sx={{color: "#212529"}}
                  >
                    Login
                  </Typography>
                </Box>
              </IconButton>
            </Tooltip>
          </>
      )
    } else {
      return (
          <CircularProgress
              enableTrackSlot size="3rem"
              aria-label="Loading…"
              sx={{color: "#607D8B"}}
          />
      )
    }
  }

  return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{backgroundColor: "#F0EEE9"}}
        >
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