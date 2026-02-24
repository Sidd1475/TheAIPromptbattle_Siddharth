import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { categories, getItemsByCategory } from "@/data/foodData";

const BrowsePage = () => {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const items = categoryId ? getItemsByCategory(categoryId) : [];

  if (!category) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Category Not Found</h1>
          <Link to="/" className="text-primary font-body font-semibold">← Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className={`pt-28 pb-16 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-6xl select-none"
              style={{ top: `${Math.random() * 80}%`, left: `${Math.random() * 90}%` }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
            >
              {category.emoji}
            </motion.span>
          ))}
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-body mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-7xl block mb-4">{category.emoji}</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white">{category.name}</h1>
            <p className="text-white/80 font-body text-lg mt-3">{items.length} items available</p>
          </motion.div>
        </div>
      </section>

      {/* Items */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <FoodCard key={item.id} item={item} index={i} />
            ))}
          </div>
          {items.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-12">No items found in this category.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrowsePage;
