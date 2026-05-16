import { MessageCircle, Phone, ShoppingBag } from "lucide-react";

export function MobileCta() {
  return (
    <>
      <a
        href="https://wa.me/message/3GYE2UMXBSTKE1"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:scale-110 transition animate-pulse-glow"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-primary/20 px-3 py-2.5">
        <div className="grid grid-cols-3 gap-2 font-bn">
          <a
            href="https://wa.me/message/3GYE2UMXBSTKE1"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-700"
          >
            <MessageCircle className="w-5 h-5" />
            হোয়াটসঅ্যাপ
          </a>
          <a
            href="tel:01832860787"
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold"
          >
            <Phone className="w-5 h-5" />
            কল
          </a>
          <a
            href="#checkout"
            className="flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
          >
            <ShoppingBag className="w-5 h-5" />
            অর্ডার
          </a>
        </div>
      </div>
    </>
  );
}
