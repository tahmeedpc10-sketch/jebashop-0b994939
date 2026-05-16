import { useEffect, useState } from "react";
import { Menu, X, MessageCircle, ShoppingBag } from "lucide-react";
import logoImg from "@/assets/jeba-logo.jpg";

const links = [
  { href: "#home", label: "হোম" },
  { href: "#products", label: "প্রোডাক্ট" },
  { href: "#warranty", label: "ওয়ারেন্টি" },
  { href: "#reviews", label: "রিভিউ" },
  { href: "#faq", label: "প্রশ্ন" },
  { href: "#contact", label: "যোগাযোগ" },
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
        scrolled ? "glass-strong shadow-card" : "bg-background/60 backdrop-blur"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/40 bg-foreground flex items-center justify-center">
            <img src={logoImg} alt="Jeba Shop logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-xl md:text-2xl font-bold">
            Jeba <span className="text-primary">Shop</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 font-bn">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3 font-bn">
          <a
            href="https://wa.me/message/3GYE2UMXBSTKE1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition"
          >
            <MessageCircle className="w-4 h-4" />
            হোয়াটসঅ্যাপ
          </a>
          <a
            href="#checkout"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-gold hover:scale-105 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            অর্ডার করুন
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
          <div className="px-4 py-4 flex flex-col gap-1 font-bn">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-muted text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#checkout"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-center"
            >
              এখনই অর্ডার করুন
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
