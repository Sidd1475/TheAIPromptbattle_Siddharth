import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Navbar from "@/components/Navbar";
import FoodCard from "@/components/FoodCard";
import Footer from "@/components/Footer";
import { categories, foodItems, getOfferItems } from "@/data/foodData";

const Index = () => {
  const offers = getOfferItems().slice(0, 4);
  const menuPreview = foodItems.slice(0, 8);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

        {/* Floating food emojis */}
        {["🍕", "🍔", "🌮", "🍣", "🍩"].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl md:text-5xl opacity-20 select-none"
            style={{
              top: `${15 + i * 18}%`,
              left: `${5 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            {emoji}
          </motion.span>
        ))}

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight"
          >
            Hungry? We've{" "}
            <span className="text-primary">got you</span> covered!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 font-body mb-10 max-w-2xl mx-auto"
          >
            Delicious meals from the best restaurants, delivered fresh to your doorstep in minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/menu"
              className="bg-primary text-primary-foreground px-10 py-4 rounded-full font-body font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30 animate-pulse-glow"
            >
              Order Now
            </Link>
            <Link
              to="/menu"
              className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-body font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Browse Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </section>

      {/* Browse Categories */}
      <section id="categories" className="py-20 lg:py-28 section-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-primary font-body font-semibold text-sm tracking-widest uppercase">
              Explore
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 text-foreground">
              Browse Categories
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              Choose from a wide range of cuisines and find your perfect meal
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Link
                  to={`/browse/${cat.id}`}
                  className={`block bg-gradient-to-br ${cat.color} rounded-2xl p-6 lg:p-8 text-center text-white shadow-lg hover:shadow-2xl transition-shadow`}
                >
                  <span className="text-5xl lg:text-6xl block mb-3">{cat.emoji}</span>
                  <span className="font-display font-semibold text-lg">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Offers */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
          >
            <div>
              <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">
                🔥 Hot Deals
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 text-foreground">
                Today's Offers
              </h2>
              <p className="text-muted-foreground font-body mt-3 max-w-md">
                Grab these limited-time deals before they're gone!
              </p>
            </div>
            <Link
              to="/offers"
              className="mt-4 md:mt-0 text-primary font-body font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All Offers <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((item, i) => (
              <FoodCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-20 lg:py-28 section-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-primary font-body font-semibold text-sm tracking-widest uppercase">
              Our Menu
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 text-foreground">
              Popular Dishes
            </h2>
            <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              Handpicked favorites from our kitchen to your table
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuPreview.map((item, i) => (
              <FoodCard key={item.id} item={item} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-body font-bold hover:bg-foreground/90 transition-all hover:shadow-lg"
            >
              Explore Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
