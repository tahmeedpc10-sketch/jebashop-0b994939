import { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag, MoreVertical, RefreshCw, Share2, Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const shareSite = async () => {
    setMenuOpen(false);
    const url = window.location.origin;
    if (navigator.share) {
      try { await navigator.share({ title: "Jeba Shop", text: "প্রিমিয়াম স্পিকার Jeba Shop থেকে", url }); } catch {}
    } else {
      navigator.clipboard.writeText(url);
      alert("লিংক কপি হয়েছে!");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-card" : "bg-background/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-16 md:h-20 gap-3">
        {/* Top-left: 3-dot menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded-full hover:bg-muted transition"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {menuOpen && (
            <div className="absolute left-0 mt-2 w-56 glass-strong rounded-xl shadow-card border border-border py-1.5 animate-fade-up font-bn z-50">
              <button
                onClick={() => { setMenuOpen(false); window.location.reload(); }}
                className="w-full px-4 py-2.5 text-sm flex items-center gap-2.5 hover:bg-muted text-left"
              >
                <RefreshCw className="w-4 h-4 text-primary" /> রিফ্রেশ
              </button>
              <button
                onClick={shareSite}
                className="w-full px-4 py-2.5 text-sm flex items-center gap-2.5 hover:bg-muted text-left"
              >
                <Share2 className="w-4 h-4 text-primary" /> শেয়ার
              </button>
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="w-full px-4 py-2.5 text-sm flex items-center gap-2.5 hover:bg-muted text-left"
              >
                <Lock className="w-4 h-4 text-primary" /> অ্যাডমিন লগইন
              </Link>
            </div>
          )}
        </div>

        <a href="#home" className="flex items-center gap-2 flex-1">
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

        <a
          href="#checkout"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-gold hover:scale-105 transition font-bn"
        >
          <ShoppingBag className="w-4 h-4" />
          অর্ডার করুন
        </a>

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
