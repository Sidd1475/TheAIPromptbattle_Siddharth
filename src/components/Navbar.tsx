import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Offers", path: "/offers" },
  { name: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-display font-bold text-primary">
              Quick<span className={scrolled ? "text-foreground" : "text-primary-foreground"}>bite</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-body font-medium transition-colors duration-200 hover:text-primary ${
                  scrolled ? "text-foreground" : "text-primary-foreground"
                } ${location.pathname === link.path ? "text-primary" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/order"
              className="relative p-2 rounded-full transition-colors hover:bg-primary/10"
            >
              <ShoppingCart className={`w-5 h-5 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
            </Link>
            <Link
              to="/menu"
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-body font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            {mobileOpen ? (
              <X className={scrolled ? "text-foreground" : "text-primary-foreground"} />
            ) : (
              <Menu className={scrolled ? "text-foreground" : "text-primary-foreground"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-body font-medium py-2 text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/menu"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-body font-semibold text-center mt-2"
              >
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
