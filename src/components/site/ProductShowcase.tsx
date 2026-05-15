import { useState } from "react";
import { Check, ShoppingBag, MessageCircle, Flame, Zap, Truck } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  badges: { icon: "fire" | "zap" | "truck"; label: string }[];
  colors?: string[];
  price: number;
  oldPrice?: number;
  images: string[];
};

const badgeIcons = { fire: Flame, zap: Zap, truck: Truck };
const WA_URL = "https://wa.me/message/3GYE2UMXBSTKE1";

function selectInCheckout(productId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("jeba:selected-product", productId);
  window.dispatchEvent(new CustomEvent("jeba:select-product", { detail: productId }));
  const el = document.getElementById("checkout");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ProductShowcase({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors?.[0]);

  const colorMap: Record<string, string> = {
    Red: "#dc2626",
    Blue: "#2563eb",
    Black: "#0f172a",
    Green: "#16a34a",
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="glass-strong rounded-3xl p-5 md:p-6 shadow-card hover:shadow-glow transition-all duration-500 flex flex-col">
      {/* Gallery */}
      <div className="space-y-3">
        <div className="relative group aspect-square rounded-2xl overflow-hidden bg-muted">
          <img
            src={product.images[activeImg]}
            alt={`${product.name} – ${activeImg + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badges.map((b) => {
              const Icon = badgeIcons[b.icon];
              return (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-strong text-[10px] md:text-xs font-semibold backdrop-blur-xl"
                >
                  <Icon className="w-3 h-3 text-gold" />
                  {b.label}
                </span>
              );
            })}
          </div>
          {discount > 0 && (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg">
              -{discount}% OFF
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(0, 4).map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                activeImg === i ? "border-gold shadow-gold" : "border-border"
              }`}
            >
              <img src={src} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4 mt-5 flex-1 flex flex-col">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">Premium Speaker</span>
          <h3 className="font-display text-2xl md:text-3xl font-bold mt-1">{product.name}</h3>
          <p className="font-bn mt-1.5 text-base text-gold/90">{product.tagline}</p>
        </div>

        {/* Price */}
        <div className="flex items-end gap-3 flex-wrap">
          <span className="font-display text-3xl md:text-4xl font-extrabold gold-text">
            ৳{product.price.toLocaleString("en-BD")}
          </span>
          {product.oldPrice && (
            <span className="text-lg text-muted-foreground line-through decoration-red-500 decoration-2">
              ৳{product.oldPrice.toLocaleString("en-BD")}
            </span>
          )}
          {discount > 0 && (
            <span className="font-bn text-xs px-2 py-1 rounded-md bg-emerald-500/15 text-emerald-600 font-semibold">
              {discount}% ছাড়
            </span>
          )}
        </div>

        <p className="font-bn text-sm text-muted-foreground leading-relaxed">{product.description}</p>

        <div className="grid grid-cols-2 gap-2">
          {product.features.map((f) => (
            <div key={f} className="flex items-start gap-1.5 text-xs md:text-sm">
              <div className="mt-0.5 w-4 h-4 rounded-full gold-bg flex items-center justify-center flex-shrink-0">
                <Check className="w-2.5 h-2.5 text-gold-foreground" strokeWidth={3} />
              </div>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {product.colors && (
          <div className="space-y-1.5">
            <div className="text-xs font-semibold">Color: <span className="text-gold">{activeColor}</span></div>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveColor(c)}
                  aria-label={c}
                  className={`w-7 h-7 rounded-full border-2 transition ${
                    activeColor === c ? "border-gold scale-110 shadow-gold" : "border-border"
                  }`}
                  style={{ background: colorMap[c] }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-2 mt-auto">
          <button
            onClick={() => selectInCheckout(product.id)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full gold-bg text-gold-foreground font-bold shadow-gold hover:scale-105 transition flex-1 text-sm font-bn"
          >
            <ShoppingBag className="w-4 h-4" />
            এখনই কিনুন
          </button>
          <a
            href={`${WA_URL}?text=${encodeURIComponent(`I want to order ${product.name} (৳${product.price})`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full glass font-semibold hover:border-gold/50 transition flex-1 text-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-500" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
