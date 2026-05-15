import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, ShoppingBag } from "lucide-react";
import logoImg from "@/assets/jeba-logo.jpg";

const links = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#warranty", label: "Warranty" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-card" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-gold/40 shadow-gold bg-navy-deep flex items-center justify-center">
            <img src={logoImg} alt="Jeba Shop logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-xl md:text-2xl font-bold">
            Jeba <span className="gold-text">Shop</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/message/3GYE2UMXBSTKE1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium hover:border-gold/50 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            WhatsApp
          </a>
          <a
            href="#checkout"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gold-bg text-gold-foreground font-semibold text-sm shadow-gold hover:scale-105 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            Order Now
          </a>
        </div>

        <button
          className="lg:hidden p-2 glass rounded-lg"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass-strong border-t border-border animate-fade-up">
          <div className="px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-white/5 text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#checkout"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-xl gold-bg text-gold-foreground font-semibold text-center"
            >
              অর্ডার করুন
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
