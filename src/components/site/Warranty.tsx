import { ShieldCheck, QrCode, Phone } from "lucide-react";

export function Warranty() {
  return (
    <section id="warranty" className="py-20 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary font-bn">ওয়ারেন্টি</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 font-bn">
            প্রিমিয়াম <span className="text-primary">ওয়ারেন্টি কার্ড</span>
          </h2>
        </div>

        <div className="relative">
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 border-2 border-primary/30 shadow-card overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-gold">
                    <ShieldCheck className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold">Jeba Shop Warranty</h3>
                    <p className="text-xs text-muted-foreground font-bn">অথরাইজড সার্ভিস কার্ড</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 font-bn">
                  <div className="glass rounded-xl p-4">
                    <div className="text-xs text-muted-foreground">গ্যারান্টি</div>
                    <div className="text-2xl font-bold text-primary">৬ মাস</div>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="text-xs text-muted-foreground">সার্ভিস ওয়ারেন্টি</div>
                    <div className="text-2xl font-bold text-primary">৫ বছর</div>
                  </div>
                </div>

                <div className="space-y-3 font-bn">
                  {[
                    { l: "কাস্টমারের নাম", v: "________________________" },
                    { l: "প্রোডাক্ট", v: "________________________" },
                    { l: "অর্ডার তারিখ", v: "________________________" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{r.l}</span>
                      <span className="font-mono text-primary/80">{r.v}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-bn">সার্ভিস নাম্বার</div>
                    <a href="tel:01832860787" className="font-bold text-lg text-primary">
                      01832-860787
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-40 h-40 rounded-2xl glass border-2 border-primary/30 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-primary/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
