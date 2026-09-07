import {Outlet} from "@tanstack/react-router";
import BottomFooter from "./ui/component/BottomFooter.tsx";
import BackToTopButton from "./ui/component/BackToTopButton.tsx";
import {UserContext} from "./context/UserContext.ts";
import {useEffect, useState} from "react";
import type {UserData} from "./data/user/user.type.ts";
import {onAuthStateChanged} from "./authService/FirebaseAuthService.ts";

export default function RootComponent() {

  const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(setLoginUser);
  }, []);

  return (
      <UserContext.Provider value={loginUser}>
        <Outlet/>
        <BottomFooter />
        <BackToTopButton />
      </UserContext.Provider>
  )
}