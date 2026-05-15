import { ShoppingBag, MessageCircle, ShieldCheck, Truck, BadgeCheck, Wallet } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      {/* glow orbs */}
      <div className="absolute top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gold/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative">
        {/* Left */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-gold border border-gold/30">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            #1 Premium Audio in Bangladesh
          </span>

          <h1 className="font-bn mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15]">
            প্রিমিয়াম <span className="gold-text">সাউন্ড এক্সপেরিয়েন্স</span> এখন আপনার হাতে
          </h1>

          <p className="font-bn mt-5 text-lg text-muted-foreground max-w-xl">
            ঘরে বসেই অর্ডার করুন Jeba Shop এর অরিজিনাল স্পিকার। ১০০% গ্যারান্টি, ক্যাশ অন ডেলিভারি।
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#checkout"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full gold-bg text-gold-foreground font-bold shadow-gold hover:scale-105 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-bn">অর্ডার করুন</span>
            </a>
            <a
              href="https://wa.me/8801832860787"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass-strong font-semibold hover:border-gold/50 transition"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span className="font-bn">WhatsApp এ যোগাযোগ</span>
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
            {[
              { icon: Wallet, text: "Cash On Delivery" },
              { icon: BadgeCheck, text: "Check Before Pay" },
              { icon: Truck, text: "Fast Delivery" },
              { icon: ShieldCheck, text: "Warranty Included" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm">
                <b.icon className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="text-muted-foreground">{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — speaker mockup placeholder */}
        <div className="relative h-[420px] lg:h-[560px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full gold-bg opacity-20 blur-3xl animate-pulse-glow" />
          </div>

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gold/60"
              style={{
                top: `${15 + i * 9}%`,
                left: `${10 + (i * 11) % 80}%`,
                animation: `float ${4 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}

          {/* Speaker placeholder */}
          <div className="relative z-10 animate-float">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-[2.5rem] glass-strong shadow-glow flex items-center justify-center overflow-hidden border-2 border-gold/30">
              <div className="absolute inset-2 rounded-[2.2rem] bg-gradient-to-br from-navy-deep to-navy" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-gold/40 flex items-center justify-center animate-rgb">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-gold/40 to-indigo-500/30 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-navy-deep border-2 border-gold/60" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground tracking-widest">JEBA AUDIO</div>
              </div>
            </div>
          </div>

          {/* Sound waves */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1.5 h-12">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full gold-bg origin-bottom"
                style={{
                  height: "100%",
                  animation: `wave ${0.8 + (i % 4) * 0.2}s ease-in-out ${i * 0.08}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
