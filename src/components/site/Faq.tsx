import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "কত দিনের ওয়ারেন্টি?", a: "৬ মাস গ্যারান্টি এবং ৫ বছরের সার্ভিস ওয়ারেন্টি থাকছে প্রতিটি প্রোডাক্টে।" },
  { q: "চার্জ কতক্ষণ থাকে?", a: "JBL Xtreme P192: ১০-১২ ঘণ্টা। ET 312: ১২-১৫ ঘণ্টা পর্যন্ত প্লেব্যাক।" },
  { q: "ওয়াটারপ্রুফ কি না?", a: "JBL Xtreme P192 IPX6 ওয়াটার রেজিস্ট্যান্ট। হালকা পানি ছিটায় কোনো সমস্যা হবে না।" },
  { q: "ডেলিভারি কত দিনে?", a: "ঢাকার ভেতরে ২৪ ঘণ্টা, ঢাকার বাইরে ১-৩ দিনের মধ্যে।" },
  { q: "কিভাবে অর্ডার করবো?", a: "উপরের অর্ডার ফর্ম পূরণ করুন অথবা WhatsApp এ মেসেজ দিন: 01832-860787" },
  { q: "বিকাশ/নগদ পেমেন্ট আছে কি?", a: "হ্যাঁ, বিকাশ, নগদ, রকেট, SSLCommerz এবং ক্যাশ অন ডেলিভারি সব অপশন আছে।" },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 scroll-mt-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary font-bn">প্রশ্নোত্তর</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 font-bn">
            সাধারণ <span className="text-primary">প্রশ্ন</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="glass rounded-2xl px-5 border border-border data-[state=open]:border-primary/40 transition"
            >
              <AccordionTrigger className="font-bn text-left text-base hover:no-underline hover:text-primary py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="font-bn text-muted-foreground pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
