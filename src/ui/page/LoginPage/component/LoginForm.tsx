import {Box, Button, Divider, SvgIcon, TextField, Typography} from "@mui/material";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import {useContext, useEffect, useState} from "react";
import Paper from '@mui/material/Paper';
import logo from "../../../assets/aniposter_logo.png";
import {signInWithEmailAndPassword, signInWithGoogle} from "../../../../authService/FirebaseAuthService.ts";
import {UserContext} from "../../../../context/UserContext.jsx.ts";
import {useRouter} from "@tanstack/react-router";

export default function LoginForm() {

  const loginUser = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const loginResult = await signInWithEmailAndPassword(email, password);
    console.log(loginResult);

    if(loginResult) {
      router.history.back();
    }
  }

  const handleGoogleSignIn = async () => {
    const loginResult = await signInWithGoogle();
    console.log(loginResult);

    if(loginResult) {
      router.history.back();
    }
  }

  useEffect(() => {
    if(loginUser) {
      router.history.back();
    }
    document.title = "Login";
  }, [loginUser]);

  function GoogleIcon() {
    return (
        <SvgIcon>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0509V14.0655H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z"
                fill="#4285F4"
            />
            <path
                d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0655L10.6982 12.0509C9.98545 12.5309 9.07636 12.8218 8 12.8218C5.92 12.8218 4.15273 11.4182 3.52 9.52727H0.858182V11.5927C2.17455 14.2036 4.87273 16 8 16Z"
                fill="#34A853"
            />
            <path
                d="M3.52 9.52C3.36 9.04 3.26545 8.53091 3.26545 8C3.26545 7.46909 3.36 6.96 3.52 6.48V4.41455H0.858182C0.312727 5.49091 0 6.70545 0 8C0 9.29455 0.312727 10.5091 0.858182 11.5855L2.93091 9.97091L3.52 9.52Z"
                fill="#FBBC05"
            />
            <path
                d="M8 3.18545C9.17818 3.18545 10.2255 3.59273 11.0618 4.37818L13.3527 2.08727C11.9636 0.792727 10.16 0 8 0C4.87273 0 2.17455 1.79636 0.858182 4.41455L3.52 6.48C4.15273 4.58909 5.92 3.18545 8 3.18545Z"
                fill="#EA4335"
            />
          </svg>
        </SvgIcon>
    );
  }

  return (
      <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 2,
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            width: "100%",
            my: 2
          }}
          onSubmit={handleLogin}
      >
        <Paper elevation={3} sx={{maxWidth: "400px", width: "100%", display: "flex", flexDirection: "column", p: 3}}>
          <Box
              component="img"
              src={logo}
              alt="Aniposter logo"
              sx={{height: 100, objectFit: "contain", mb: 1}}
          >
          </Box>

          <Typography variant="h5" sx={{fontWeight: "500", mb: 1, textAlign: "center"}}>
            Sign In to Aniposter
          </Typography>

          <Typography variant="body1" sx={{mb: 3, textAlign: "center"}}>
            Welcome user, please sign in to continue
          </Typography>

          <TextField
              required
              id="outlined-required"
              label="Email Address"
              placeholder="you@email.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              sx={{mb: 2}}
          />

          <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="******"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              sx={{mb: 2}}
          />

          <Button
              //type="submit"
              variant="outlined"
              size="large"
              startIcon={<LoginRoundedIcon />}
              sx={{my: 1, textTransform: "none"}}
              onClick={handleLogin}
          >
            Sign In With Email and Password
          </Button>

          <Divider>or</Divider>

          <Button
              fullWidth
              variant="outlined"
              onClick={handleGoogleSignIn}
              startIcon={GoogleIcon()}
              sx={{my: 1, textTransform: "none"}}
          >
            Sign in with Google
          </Button>

        </Paper>
      </Box>
  )
}