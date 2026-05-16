import { Star } from "lucide-react";

const reviews = [
  { name: "রাকিব হাসান", city: "ঢাকা", text: "সাউন্ড কোয়ালিটি অসাধারণ! দাম অনুযায়ী এর থেকে ভালো কিছু পাবেন না।", rating: 5 },
  { name: "সাদিয়া রহমান", city: "চট্টগ্রাম", text: "বেস অনেক পাওয়ারফুল। পার্টিতে সবাই জিজ্ঞেস করেছে কোথা থেকে কিনেছি।", rating: 5 },
  { name: "তানভীর আহমেদ", city: "সিলেট", text: "ডেলিভারি খুব ফাস্ট ছিল, ২ দিনেই হাতে পেয়েছি।", rating: 5 },
  { name: "মেহেদী করিম", city: "রাজশাহী", text: "প্রোডাক্ট হাতে পেয়ে চেক করে নিয়েছি, একদম অরিজিনাল।", rating: 5 },
  { name: "নুসরাত জাহান", city: "খুলনা", text: "বাটন, লাইট, সব কিছু পারফেক্ট কাজ করছে। ধন্যবাদ Jeba Shop!", rating: 5 },
  { name: "হাসান মাহমুদ", city: "বরিশাল", text: "ব্যাটারি ব্যাকআপ চমৎকার। দীর্ঘসময় চলে।", rating: 5 },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary font-bn">রিভিউ</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 font-bn">
            কাস্টমার <span className="text-primary">রিভিউ</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 gold-glow-hover animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4 font-bn">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="font-bn text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
