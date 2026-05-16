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
      { title: "Jeba Shop — প্রিমিয়াম স্পিকার ও ইলেকট্রনিক্স বাংলাদেশ" },
      {
        name: "description",
        content:
          "অরিজিনাল প্রিমিয়াম স্পিকার ও ইলেকট্রনিক্স কিনুন Jeba Shop থেকে। ক্যাশ অন ডেলিভারি, ৬ মাস গ্যারান্টি, সারা বাংলাদেশে ফাস্ট ডেলিভারি।",
      },
      { property: "og:title", content: "Jeba Shop — প্রিমিয়াম স্পিকার বাংলাদেশ" },
      { property: "og:description", content: "প্রিমিয়াম সাউন্ড এক্সপেরিয়েন্স এখন আপনার হাতে। ক্যাশ অন ডেলিভারি।" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&display=swap",
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

        <section id="products" className="py-14 md:py-20 scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary font-bn">আমাদের প্রোডাক্ট</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 font-bn">
                ফিচার্ড <span className="text-primary">স্পিকার</span>
              </h2>
              <p className="font-bn mt-3 text-muted-foreground">পছন্দের প্রোডাক্ট সিলেক্ট করে এখনই অর্ডার করুন</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {products.map((p) => (
                <ProductShowcase key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        <Checkout />
        <Delivery />
        <Warranty />
        <Reviews />
        <Faq />
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
