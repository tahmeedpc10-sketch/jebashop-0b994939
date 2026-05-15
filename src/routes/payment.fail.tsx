import { createFileRoute } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { PaymentResult } from "./payment.success";

export const Route = createFileRoute("/payment/fail")({
  head: () => ({ meta: [{ title: "Payment Failed — Jeba Shop" }] }),
  component: () => (
    <PaymentResult
      icon={<XCircle className="w-16 h-16 text-destructive" />}
      title="Payment Failed"
      desc="দুঃখিত, পেমেন্ট সফল হয়নি। আবার চেষ্টা করুন।"
    />
  ),
});
