import { Phone, MessageCircle, Facebook, MapPin, Truck } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="pt-20 pb-28 md:pb-12 scroll-mt-20 border-t border-gold/10 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gold-bg flex items-center justify-center font-bold text-gold-foreground shadow-gold">
                J
              </div>
              <span className="font-display text-2xl font-bold">
                Jeba <span className="gold-text">Shop</span>
              </span>
            </div>
            <p className="font-bn mt-4 text-muted-foreground max-w-md">
              বাংলাদেশের অন্যতম বিশ্বস্ত প্রিমিয়াম ইলেকট্রনিক্স ব্র্যান্ড। অরিজিনাল প্রোডাক্ট, ফাস্ট ডেলিভারি, আর সেরা সাপোর্ট।
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:01832860787" className="flex items-center gap-2 hover:text-gold transition">
                <Phone className="w-4 h-4 text-gold" /> 01832-860787
              </a>
              <a href="https://wa.me/message/3GYE2UMXBSTKE1" className="flex items-center gap-2 hover:text-gold transition">
                <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-gold transition">
                <Facebook className="w-4 h-4 text-blue-400" /> Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-4">Delivery</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> All over Bangladesh</div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-gold" /> 1-3 days delivery</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jeba Shop. All rights reserved. Made in Bangladesh 🇧🇩
        </div>
      </div>
    </footer>
  );
}
