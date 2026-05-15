import { Star } from "lucide-react";

const reviews = [
  { name: "Rakib H.", city: "Dhaka", text: "সাউন্ড কোয়ালিটি অসাধারণ! দাম অনুযায়ী এর থেকে ভালো কিছু পাবেন না।", rating: 5 },
  { name: "Sadia R.", city: "Chattogram", text: "বেস অনেক পাওয়ারফুল। পার্টিতে সবাই জিজ্ঞেস করেছে কোথা থেকে কিনেছি।", rating: 5 },
  { name: "Tanvir A.", city: "Sylhet", text: "ডেলিভারি খুব ফাস্ট ছিল, ২ দিনেই হাতে পেয়েছি।", rating: 5 },
  { name: "Mehedi K.", city: "Rajshahi", text: "প্রোডাক্ট হাতে পেয়ে চেক করে নিয়েছি, একদম অরিজিনাল।", rating: 5 },
  { name: "Nusrat J.", city: "Khulna", text: "বাটন, লাইট, সব কিছু পারফেক্ট কাজ করছে। ধন্যবাদ Jeba Shop!", rating: 5 },
  { name: "Hasan M.", city: "Barishal", text: "ব্যাটারি ব্যাকআপ চমৎকার। দীর্ঘসময় চলে।", rating: 5 },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">Reviews</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
            কাস্টমার <span className="gold-text">রিভিউ</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 gold-glow-hover animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full gold-bg flex items-center justify-center font-bold text-gold-foreground">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.city}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
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
