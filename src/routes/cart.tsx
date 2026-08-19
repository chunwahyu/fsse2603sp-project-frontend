import { createFileRoute } from '@tanstack/react-router'
import ShoppingCartPage from "../ui/page/ShoppingCartPage/ShoppingCartPage.tsx";

export const Route = createFileRoute('/cart')({
  component: ShoppingCartPage,
})