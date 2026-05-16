import { Truck, Wallet, BadgeCheck, Headphones, MapPin } from "lucide-react";

export function Delivery() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary font-bn">ডেলিভারি</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 font-bn">
            সারা <span className="text-primary">বাংলাদেশে</span> ডেলিভারি
          </h2>
          <p className="font-bn mt-4 text-muted-foreground max-w-lg">
            যেকোনো জেলায় ১-৩ দিনের মধ্যে ডেলিভারি। প্রোডাক্ট হাতে পেয়ে চেক করে তারপর টাকা পরিশোধ করুন।
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-8 font-bn">
            {[
              { icon: Truck, t: "হোম ডেলিভারি", d: "সারা বাংলাদেশে" },
              { icon: Wallet, t: "ক্যাশ অন ডেলিভারি", d: "পেয়ে টাকা দিন" },
              { icon: BadgeCheck, t: "চেক করে নিন", d: "১০০% ট্রান্সপারেন্ট" },
              { icon: Headphones, t: "ফাস্ট সাপোর্ট", d: "কল/হোয়াটসঅ্যাপ ২৪/৭" },
            ].map((b) => (
              <div key={b.t} className="glass rounded-xl p-4 flex items-start gap-3 gold-glow-hover">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{b.t}</div>
                  <div className="text-xs text-muted-foreground">{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square max-w-md mx-auto">
          <div className="absolute inset-0 rounded-[3rem] glass-strong p-8 shadow-card">
            <div className="absolute inset-8 rounded-[2.5rem] bg-foreground border border-primary/20 overflow-hidden">
              {[
                { x: "30%", y: "25%", label: "ঢাকা" },
                { x: "60%", y: "55%", label: "চট্টগ্রাম" },
                { x: "20%", y: "55%", label: "খুলনা" },
                { x: "70%", y: "30%", label: "সিলেট" },
                { x: "25%", y: "70%", label: "বরিশাল" },
                { x: "45%", y: "20%", label: "রাজশাহী" },
              ].map((p, i) => (
                <div
                  key={p.label}
                  className="absolute"
                  style={{ left: p.x, top: p.y, animationDelay: `${i * 0.3}s` }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 w-8 h-8 rounded-full bg-primary opacity-30 animate-ping" />
                    <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-gold">
                      <MapPin className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-background/70 font-bn">
                🇧🇩 সারা দেশে ডেলিভারি
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
