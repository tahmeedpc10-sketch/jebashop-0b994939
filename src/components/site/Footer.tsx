import { Phone, MessageCircle, Facebook, Youtube, MapPin, Truck } from "lucide-react";
import logoImg from "@/assets/jeba-logo.jpg";

export function Footer() {
  return (
    <footer id="contact" className="pt-20 pb-28 md:pb-12 scroll-mt-20 border-t border-primary/15 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/40">
                <img src={logoImg} alt="Jeba Shop" className="w-full h-full object-cover" />
              </div>
              <span className="font-display text-2xl font-bold">
                Jeba <span className="text-primary">Shop</span>
              </span>
            </div>
            <p className="font-bn mt-4 text-muted-foreground max-w-md">
              বাংলাদেশের অন্যতম বিশ্বস্ত প্রিমিয়াম ইলেকট্রনিক্স ব্র্যান্ড। অরিজিনাল প্রোডাক্ট, ফাস্ট ডেলিভারি, আর সেরা সাপোর্ট।
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-4 font-bn">যোগাযোগ ও সোশ্যাল</h4>
            <div className="space-y-3 text-sm font-bn">
              <a href="tel:01832860787" className="flex items-center gap-2 hover:text-primary transition">
                <Phone className="w-4 h-4 text-primary" /> 01832-860787
              </a>
              <a href="https://wa.me/message/3GYE2UMXBSTKE1" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-600 transition">
                <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp — Jeba Shop
              </a>
              <a href="https://www.facebook.com/share/1Cbq2EScq8/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-600 transition">
                <Facebook className="w-4 h-4 text-blue-600" /> Facebook — Jeba Shop
              </a>
              <a href="https://youtube.com/@jeba_shop?si=UfEodkCTAoMRXbJH" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-red-600 transition">
                <Youtube className="w-4 h-4 text-red-600" /> YouTube — @jeba_shop
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-4 font-bn">ডেলিভারি</h4>
            <div className="space-y-3 text-sm text-muted-foreground font-bn">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> সারা বাংলাদেশে</div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> ১-৩ দিনে ডেলিভারি</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground font-bn">
          © {new Date().getFullYear()} Jeba Shop. সর্বস্বত্ব সংরক্ষিত। মেড ইন বাংলাদেশ 🇧🇩
        </div>
      </div>
    </footer>
  );
}
