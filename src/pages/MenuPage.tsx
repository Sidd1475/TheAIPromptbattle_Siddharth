import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import { categories, foodItems, searchItems } from "@/data/foodData";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    let items = searchQuery ? searchItems(searchQuery) : foodItems;
    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }
    return items;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8 section-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-body mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white">Our Menu</h1>
            <p className="text-white/70 font-body text-lg mt-3">
              Explore our complete menu and find your next favorite meal
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 relative max-w-xl"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2 mt-6 overflow-x-auto pb-4 scrollbar-hide"
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full font-body font-semibold text-sm whitespace-nowrap transition-all ${
                activeCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              All ({foodItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-body font-semibold text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <span>{cat.emoji}</span> {cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredItems.map((item, i) => (
                    <FoodCard key={item.id} item={item} index={i} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <span className="text-6xl block mb-4">🔍</span>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    Item Not Available
                  </h3>
                  <p className="text-muted-foreground font-body">
                    We couldn't find "{searchQuery}" in our menu. Try a different search!
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold hover:bg-primary/90 transition-all"
                  >
                    Clear Search
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MenuPage;
