import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Trust } from "@/components/site/Trust";
import { ProductShowcase } from "@/components/site/ProductShowcase";
import { Checkout } from "@/components/site/Checkout";
import { Warranty } from "@/components/site/Warranty";
import { Reviews } from "@/components/site/Reviews";
import { Delivery } from "@/components/site/Delivery";
import { Faq } from "@/components/site/Faq";
import { MobileCta } from "@/components/site/MobileCta";
import { Footer } from "@/components/site/Footer";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jeba Shop — Premium Speakers & Electronics in Bangladesh" },
      {
        name: "description",
        content:
          "অরিজিনাল প্রিমিয়াম স্পিকার ও ইলেকট্রনিক্স কিনুন Jeba Shop থেকে। Cash on Delivery, ৬ মাস গ্যারান্টি, সারা বাংলাদেশে ফাস্ট ডেলিভারি।",
      },
      { name: "keywords", content: "JBL, speaker, Bangladesh, ecommerce, bluetooth speaker, Jeba Shop, sound box" },
      { property: "og:title", content: "Jeba Shop — Premium Speakers in Bangladesh" },
      { property: "og:description", content: "প্রিমিয়াম সাউন্ড এক্সপেরিয়েন্স এখন আপনার হাতে। Cash on Delivery." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Hind+Siliguri:wght@400;500;600;700&display=swap",
      },
      { rel: "canonical", href: "/" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main>
        <Hero />
        <Trust />

        <section id="products" className="py-16 md:py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">Products</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-2">
                Featured <span className="gold-text">Speakers</span>
              </h2>
            </div>
            <div className="space-y-24">
              <ProductShowcase product={products[0]} />
              <ProductShowcase product={products[1]} reverse />
            </div>
          </div>
        </section>

        <Checkout />
        <Warranty />
        <Reviews />
        <Delivery />
        <Faq />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
