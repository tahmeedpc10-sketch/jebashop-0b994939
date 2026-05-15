import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { PaymentResult } from "./payment.success";

export const Route = createFileRoute("/payment/cancel")({
  head: () => ({ meta: [{ title: "Payment Cancelled — Jeba Shop" }] }),
  component: () => (
    <PaymentResult
      icon={<AlertCircle className="w-16 h-16 text-gold" />}
      title="Payment Cancelled"
      desc="আপনি পেমেন্ট বাতিল করেছেন। চাইলে আবার অর্ডার করতে পারেন।"
    />
  ),
});
