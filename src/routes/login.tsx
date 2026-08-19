import { createFileRoute } from '@tanstack/react-router'
import LoginPage from "../ui/page/LoginPage/LoginPage.tsx";

export const Route = createFileRoute('/login')({
  component: LoginPage,
})
