import { ShoppingBag, MessageCircle, ShieldCheck, Truck, BadgeCheck, Wallet } from "lucide-react";
import bannerImg from "@/assets/jeba-banner.jpg";

export function Hero() {
  return (
    <section id="home" className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
      <div className="absolute top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative">
        {/* Banner image */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-border animate-fade-up">
          <img
            src={bannerImg}
            alt="Jeba Shop — কোনো অগ্রিম টাকা ছাড়াই ঘরে বসে অর্ডার করুন"
            className="w-full h-auto block"
            loading="eager"
          />
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#checkout"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full gold-bg text-gold-foreground font-bold shadow-gold hover:scale-105 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-bn">অর্ডার করুন</span>
          </a>
          <a
            href="https://wa.me/message/3GYE2UMXBSTKE1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass-strong font-semibold hover:border-gold/50 transition"
          >
            <MessageCircle className="w-5 h-5 text-emerald-500" />
            <span className="font-bn">WhatsApp এ যোগাযোগ</span>
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { icon: Wallet, text: "Cash On Delivery" },
            { icon: BadgeCheck, text: "Check Before Pay" },
            { icon: Truck, text: "Fast Delivery" },
            { icon: ShieldCheck, text: "Warranty Included" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-sm glass rounded-xl px-3 py-2.5">
              <b.icon className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="text-foreground/80 font-medium">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
