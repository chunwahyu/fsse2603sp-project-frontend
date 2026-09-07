import {Box, Button, Container, Tooltip, Typography} from "@mui/material";
import TopNavigationBar from "../../component/TopNavigationBar.tsx";
import {useEffect} from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {useNavigate, useRouter} from "@tanstack/react-router";

export default function ErrorPage() {

  const navigate = useNavigate({from:"/error/"});
  const router = useRouter();

  const handleGoBackButtonClick = () => {
    router.history.back();
  }

  const handleGoHomeButtonClick = () => {
    void navigate({to:"/"});
  }

  useEffect(() => {
    document.title = "Error";
  }, []);

  return (
      <>
        <TopNavigationBar />
        <Container>
          <Box
              sx={{p:2,}}
          >
            <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%"
                }}
            >
              <Typography
                  variant="body1"
                  align="center"
                  sx={{
                    m: 1,
                    p: 1,
                    display: 'inline-block',
                    border: '1px solid',
                    borderColor: "inherit",
                    borderRadius: 50
                  }}
              >
                <WarningRoundedIcon
                    fontSize="inherit"
                    color="error"
                    sx={{mr: 1}}
                />
                404 error
              </Typography>
            </Box>
            <Typography
                variant="h2"
                align="center"
                sx={{fontWeight: 700, m:1}}
            >
              We can't find this page
            </Typography>
            <Typography
                variant="body1"
                align="center"
                sx={{m:1}}
            >
              The page you are looking for doesn't exist or has been moved.
            </Typography>
            <Box
                sx={{
                  display:"flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 3
                }}
            >
              <Tooltip title="Back to previous page">
                <Button
                    variant="outlined"
                    size="large"
                    color="inherit"
                    startIcon={<ArrowBackRoundedIcon/>}
                    sx={{
                      borderRadius:50,
                      m:1,
                      color: "#607D8B",
                      textTransform:"none"
                    }}
                    onClick={handleGoBackButtonClick}
                >
                  Go back
                </Button>
              </Tooltip>
              <Tooltip title="Back to main page">
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                      borderRadius:50,
                      m:1,
                      backgroundColor: "#607D8B",
                      textTransform:"none"
                    }}
                    onClick={handleGoHomeButtonClick}
                >
                  Go home
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Container>
      </>
  )
}