import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/payment/success")({
  head: () => ({ meta: [{ title: "Payment Successful — Jeba Shop" }] }),
  component: () => (
    <PaymentResult
      icon={<CheckCircle2 className="w-16 h-16 text-emerald-400" />}
      title="Payment Successful 🎉"
      desc="আপনার পেমেন্ট সফল হয়েছে। অর্ডার শীঘ্রই প্রসেস হবে।"
    />
  ),
});

export function PaymentResult({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-strong rounded-3xl p-10 max-w-md text-center shadow-card">
        <div className="mx-auto mb-4 w-20 h-20 rounded-full glass flex items-center justify-center">{icon}</div>
        <h1 className="font-display text-3xl font-bold">{title}</h1>
        <p className="font-bn mt-3 text-muted-foreground">{desc}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full gold-bg text-gold-foreground font-bold shadow-gold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
