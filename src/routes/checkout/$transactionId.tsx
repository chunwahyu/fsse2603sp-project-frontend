import { createFileRoute } from '@tanstack/react-router'
import CheckOutPage from "../../ui/page/CheckOutPage";

export const Route = createFileRoute('/checkout/$transactionId')({
  component: CheckOutPage,
})
