import {createFileRoute, redirect} from '@tanstack/react-router'
import ThankYouPage from "../../ui/page/ThankYouPage";

export const Route = createFileRoute('/thankyou/')({
  beforeLoad: ({ location }) => {
    const state = location.state as { fromCheckout?: boolean } | undefined;

    if (!state?.fromCheckout) {
      throw redirect({
        to: "/error",
      })
    }
  },
  component: ThankYouPage,
})
