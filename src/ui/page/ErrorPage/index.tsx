import {Typography} from "@mui/material";
import TopNavigationBar from "../../component/TopNavigationBar.tsx";
import {useEffect} from "react";

export default function ErrorPage() {

  useEffect(() => {
    document.title = "Error";
  }, []);

  return (
      <>
        <TopNavigationBar />
        <Typography variant="h6">
          Error Page
        </Typography>
      </>
  )
}