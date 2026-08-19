import {Outlet} from "@tanstack/react-router";
import TopNavigationBar from "./ui/component/TopNavigationBar.tsx";
import BottomFooter from "./ui/component/BottomFooter.tsx";
import BackToTopButton from "./ui/component/BackToTopButton.tsx";

export default function RootComponent() {
  return (
      <>
        <TopNavigationBar />
        <Outlet/>
        <BottomFooter />
        <BackToTopButton />
      </>
  )
}