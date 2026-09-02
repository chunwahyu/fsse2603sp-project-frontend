import {Typography} from "@mui/material";
import TopNavigationBar from "../../component/TopNavigationBar.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "@tanstack/react-router";

export default function ThankYouPage() {

  const navigate = useNavigate({from: "/thankyou/"});

  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    setTimeout(() => {
      setCountDown((prevState) => (
          prevState - 1
      ));
    }, 1000)
    if(countDown === 0) {
      void navigate({to: "/"});
    }
    document.title = "Thank You";
  }, [countDown]);

  return (
      <>
        <TopNavigationBar />
        <Typography variant="h6">
          Thank You Page
        </Typography>
        <Typography variant="body1">
          Redirect back to main page in {countDown} second(s)
        </Typography>
      </>
  )
}