import {Box, Button, Stack, Tooltip, Typography} from "@mui/material";
import TopNavigationBar from "../../component/TopNavigationBar.tsx";
import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "@tanstack/react-router";
import thankyouImage from "../ThankYouPage/assets/thank_you_for_your_order.png"
import {UserContext} from "../../../context/UserContext.ts";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoadingContainer from "../../component/LoadingContainer.tsx";

export default function ThankYouPage() {

  const navigate = useNavigate({from: "/thankyou/"});
  const loginUser = useContext(UserContext);

  const [countDown, setCountDown] = useState(20);

  useEffect(() => {
    document.title = "Thank You";
  }, []);

  useEffect(() => {
    if(loginUser) {
      setTimeout(() => {
        setCountDown((prevState) => (
            prevState - 1
        ));
      }, 1000)
      if(countDown === 0) {
        void navigate({to: "/"});
      }
    } else if(loginUser === null || loginUser === undefined) {
      void navigate({to: "/error"});
    }
  }, [countDown, loginUser, navigate]);

  return (
      <>
        <TopNavigationBar />
        {
          loginUser
              ? (
                  <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                  >
                    <Stack
                        direction="column"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                    >
                      <Box
                          component="img"
                          src={thankyouImage}
                          width="250px"
                      />
                      <Typography
                          variant="body1"
                          align="center"
                          sx={{mb: 3}}
                      >
                        Hi, {loginUser.display_name === undefined ? loginUser.email.split("@")[0] : loginUser.display_name}! Your order has been placed and is being processed.
                      </Typography>
                      <Typography
                          variant="body2"
                          align="center"
                          sx={{mb: 4}}
                      >
                        You will return to the homepage in {countDown} second(s).<br/>
                        Alternatively, click the button below.
                      </Typography>
                      <Tooltip title="Click to go back to home page">
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to={`/`}
                            startIcon={<HomeRoundedIcon/>}
                            sx={{
                              borderRadius: 50,
                              mb: 3,
                              backgroundColor: "#607D8B",
                              textTransform: "none"
                            }}
                        >
                          Home
                        </Button>
                      </Tooltip>
                    </Stack>
                  </Box>
              ) : (
                  <LoadingContainer/>
              )
        }
      </>
  )
}