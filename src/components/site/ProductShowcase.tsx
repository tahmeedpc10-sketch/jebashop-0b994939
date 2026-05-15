import { useState } from "react";
import { Check, ShoppingBag, MessageCircle, Flame, Zap, Truck } from "lucide-react";
import { ImagePlaceholder } from "./ImagePlaceholder";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  badges: { icon: "fire" | "zap" | "truck"; label: string }[];
  colors?: string[];
  price?: string;
  oldPrice?: string;
};

const badgeIcons = { fire: Flame, zap: Zap, truck: Truck };

export function ProductShowcase({ product, reverse = false }: { product: Product; reverse?: boolean }) {
  const [activeImg, setActiveImg] = useState(0);
  const [activeColor, setActiveColor] = useState(product.colors?.[0]);

  const colorMap: Record<string, string> = {
    Red: "#dc2626",
    Blue: "#2563eb",
    Black: "#0f172a",
    Green: "#16a34a",
  };

  return (
    <div
      className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}
    >
      {/* Gallery */}
      <div className="[direction:ltr] space-y-4">
        <div className="relative group">
          <ImagePlaceholder
            label={`${product.name} – Image ${activeImg + 1}`}
            ratio="aspect-square"
            className="shadow-card transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.badges.map((b) => {
              const Icon = badgeIcons[b.icon];
              return (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong text-xs font-semibold backdrop-blur-xl"
                >
                  <Icon className="w-3.5 h-3.5 text-gold" />
                  {b.label}
                </span>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                activeImg === i ? "border-gold shadow-gold" : "border-border"
              }`}
            >
              <ImagePlaceholder label={`Thumb ${i + 1}`} ratio="aspect-square" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="[direction:ltr] space-y-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">Premium Speaker</span>
          <h3 className="font-display text-3xl md:text-4xl font-bold mt-2">{product.name}</h3>
          <p className="font-bn mt-2 text-lg text-gold/90">{product.tagline}</p>
        </div>

        <p className="font-bn text-muted-foreground leading-relaxed">{product.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {product.features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm">
              <div className="mt-0.5 w-5 h-5 rounded-full gold-bg flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-gold-foreground" strokeWidth={3} />
              </div>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {product.colors && (
          <div className="space-y-2">
            <div className="text-sm font-semibold">Color: <span className="text-gold">{activeColor}</span></div>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveColor(c)}
                  aria-label={c}
                  className={`w-9 h-9 rounded-full border-2 transition ${
                    activeColor === c ? "border-gold scale-110 shadow-gold" : "border-border"
                  }`}
                  style={{ background: colorMap[c] }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={`#checkout?p=${product.id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full gold-bg text-gold-foreground font-bold shadow-gold hover:scale-105 transition flex-1"
          >
            <ShoppingBag className="w-5 h-5" />
            Order Now
          </a>
          <a
            href={`https://wa.me/8801832860787?text=${encodeURIComponent(`I want to order ${product.name}`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-strong font-semibold hover:border-gold/50 transition flex-1"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            WhatsApp Order
          </a>
        </div>
      </div>
    </div>
  );
}
