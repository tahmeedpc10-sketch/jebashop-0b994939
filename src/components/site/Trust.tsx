import { ShieldCheck, Truck, Lock, Wrench } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "১০০% অরিজিনাল", desc: "অরিজিনাল প্রোডাক্ট গ্যারান্টি" },
  { icon: Truck, title: "ফাস্ট ডেলিভারি", desc: "সারা বাংলাদেশে ১-৩ দিনে" },
  { icon: Lock, title: "নিরাপদ পেমেন্ট", desc: "ক্যাশ অন ডেলিভারি সহ" },
  { icon: Wrench, title: "ওয়ারেন্টি সাপোর্ট", desc: "সার্ভিস ও গ্যারান্টি" },
];

export function Trust() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((it) => (
          <div
            key={it.title}
            className="glass rounded-2xl p-5 md:p-6 gold-glow-hover text-center"
          >
            <div className="mx-auto w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary flex items-center justify-center shadow-gold mb-4">
              <it.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bn font-semibold text-base md:text-lg">{it.title}</h3>
            <p className="font-bn text-xs md:text-sm text-muted-foreground mt-1">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
