import { useEffect, useState, type FormEvent } from "react";
import { Check, Loader2, ShieldCheck, Truck, Wallet, BadgeCheck } from "lucide-react";
import { products } from "@/lib/products";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const paymentMethods = [
  { id: "cod", label: "Cash On Delivery", color: "from-emerald-500/20 to-emerald-500/5" },
  { id: "bkash", label: "bKash", color: "from-pink-500/20 to-pink-500/5" },
  { id: "nagad", label: "Nagad", color: "from-orange-500/20 to-orange-500/5" },
  { id: "rocket", label: "Rocket", color: "from-purple-500/20 to-purple-500/5" },
  { id: "sslcommerz", label: "SSLCommerz", color: "from-blue-500/20 to-blue-500/5" },
];

export function Checkout() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [orderId, setOrderId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const stored = sessionStorage.getItem("jeba:selected-product");
    if (stored) setSelectedProduct(stored);
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setSelectedProduct(detail);
    };
    window.addEventListener("jeba:select-product", handler);
    return () => window.removeEventListener("jeba:select-product", handler);
  }, []);

  const product = products.find((p) => p.id === selectedProduct) ?? products[0];
  const subtotal = product.price * qty;
  const delivery = 80;
  const total = subtotal + delivery;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const id = "JEBA-" + Date.now().toString().slice(-6);
    setOrderId(id);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setOpen(true);
    (e.target as HTMLFormElement).reset();
    setQty(1);
  };

  return (
    <section id="checkout" className="py-20 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">Quick Order</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">Easy Checkout</h2>
          <p className="font-bn mt-3 text-muted-foreground">
            প্রোডাক্ট হাতে পেয়ে চেক করে তারপর টাকা দিন
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-6 md:p-10 shadow-card">
          <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-5">
            <Field label="আপনার নাম *" name="name" placeholder="Full Name" required />
            <Field label="মোবাইল নাম্বার *" name="phone" type="tel" placeholder="01XXXXXXXXX" required />
            <Field label="সম্পূর্ণ ঠিকানা *" name="address" placeholder="বাসা, রোড, এরিয়া" required full />
            <Select
              label="প্রোডাক্ট *"
              name="product"
              required
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ৳{p.price}
                </option>
              ))}
            </Select>
            <Select label="কালার" name="color">
              {(product.colors ?? ["Default"]).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
            <Field
              label="পরিমাণ *"
              name="qty"
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              min={1}
              required
            />
            <div className="md:col-span-1 rounded-xl bg-muted/40 border border-border p-4 space-y-1.5 text-sm font-bn">
              <div className="flex justify-between"><span className="text-muted-foreground">প্রোডাক্ট</span><span>৳{subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">ডেলিভারি</span><span>৳{delivery}</span></div>
              <div className="flex justify-between border-t border-border pt-1.5 font-bold text-base"><span>মোট</span><span className="gold-text">৳{total}</span></div>
            </div>

            <div className="md:col-span-2">
              <div className="text-sm font-semibold mb-3 font-bn">পেমেন্ট মেথড</div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
                {paymentMethods.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPayment(m.id)}
                    className={`relative rounded-xl px-3 py-3 text-sm font-semibold border transition bg-gradient-to-br ${m.color} ${
                      payment === m.id
                        ? "border-gold shadow-gold scale-[1.02]"
                        : "border-border hover:border-gold/40"
                    }`}
                  >
                    {m.label}
                    {payment === m.id && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full gold-bg flex items-center justify-center">
                        <Check className="w-3 h-3 text-gold-foreground" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* SSLCommerz badge */}
              <div className="mt-4 flex items-center justify-center md:justify-start gap-3 rounded-xl border border-border bg-muted/40 p-3">
                <img
                  src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
                  alt="Pay with SSLCommerz — bKash, Nagad, Rocket, Visa, MasterCard"
                  className="h-10 md:h-12 w-auto"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground font-bn">
                  নিরাপদ পেমেন্ট — bKash, Nagad, Rocket, Card, Bank
                </p>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {[
                { icon: Wallet, t: "Cash on Delivery" },
                { icon: BadgeCheck, t: "Check Before Pay" },
                { icon: Truck, t: "Fast Delivery" },
                { icon: ShieldCheck, t: "Warranty" },
              ].map((b) => (
                <div key={b.t} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <b.icon className="w-4 h-4 text-gold" />
                  {b.t}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gold-bg text-gold-foreground font-bold text-lg shadow-gold hover:scale-[1.02] transition disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              <span className="font-bn">{loading ? "Processing..." : `অর্ডার কনফার্ম করুন — ৳${total}`}</span>
            </button>
          </form>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass-strong border-gold/30">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full gold-bg flex items-center justify-center mb-3 shadow-gold animate-pulse-glow">
              <Check className="w-8 h-8 text-gold-foreground" strokeWidth={3} />
            </div>
            <DialogTitle className="text-center text-2xl font-bn">
              অর্ডার সফল হয়েছে! 🎉
            </DialogTitle>
            <DialogDescription className="text-center font-bn">
              আপনার অর্ডার আইডি: <span className="text-gold font-bold">{orderId}</span>
              <br />
              আমাদের প্রতিনিধি শীঘ্রই আপনাকে কল করবেন।
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Field({
  label,
  full,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="text-sm font-medium mb-1.5 block font-bn">{label}</span>
      <input
        {...rest}
        className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
      />
    </label>
  );
}

function Select({
  label,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium mb-1.5 block font-bn">{label}</span>
      <select
        {...rest}
        className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition"
      >
        {children}
      </select>
    </label>
  );
}
