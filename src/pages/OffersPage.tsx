import { motion } from "framer-motion";
import { Clock, Tag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { getOfferItems } from "@/data/foodData";

const OffersPage = () => {
  const offers = getOfferItems();

  const getTimeRemaining = (expiry: string) => {
    const diff = new Date(expiry).getTime() - new Date().getTime();
    if (diff <= 0) return "Expired";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return days > 0 ? `${days}d ${hours}h left` : `${hours}h left`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-accent to-primary relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundImage: "url('data:image/svg+xml,...')", backgroundSize: "40px 40px" }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-body mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-8 h-8 text-white" />
              <span className="text-white/80 font-body font-semibold tracking-widest uppercase text-sm">
                Limited Time
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white">Today's Offers</h1>
            <p className="text-white/80 font-body text-lg mt-3 max-w-lg">
              Don't miss out! Grab these incredible deals before time runs out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offer Cards with time badges */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((item, i) => (
              <div key={item.id} className="relative">
                {item.offerExpiry && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute -top-3 right-3 z-20 bg-foreground text-background text-xs font-body font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                  >
                    <Clock className="w-3 h-3" />
                    {getTimeRemaining(item.offerExpiry)}
                  </motion.div>
                )}
                <FoodCard item={item} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OffersPage;
