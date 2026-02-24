import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { foodItems } from "@/data/foodData";

interface CartItem {
  id: string;
  quantity: number;
}

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get("item");

  const [cart, setCart] = useState<CartItem[]>(
    preselectedId ? [{ id: preselectedId, quantity: 1 }] : []
  );

  const addItem = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c));
      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity: c.quantity - 1 } : c)).filter((c) => c.quantity > 0)
    );
  };

  const deleteItem = (id: string) => setCart((prev) => prev.filter((c) => c.id !== id));

  const cartItems = useMemo(
    () =>
      cart.map((c) => ({
        ...c,
        item: foodItems.find((f) => f.id === c.id)!,
      })).filter((c) => c.item),
    [cart]
  );

  const subtotal = cartItems.reduce((sum, c) => {
    const price = c.item.isOffer && c.item.discount ? c.item.price * (1 - c.item.discount / 100) : c.item.price;
    return sum + price * c.quantity;
  }, 0);
  const deliveryFee = subtotal > 30 ? 0 : 4.99;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-8 section-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/menu" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-body mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-white"
          >
            Your Order
          </motion.h1>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <span className="text-6xl block mb-4">🛒</span>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground font-body mb-6">Add items from the menu to get started!</p>
                  <Link
                    to="/menu"
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-semibold"
                  >
                    Browse Menu
                  </Link>
                </motion.div>
              ) : (
                cartItems.map((c, i) => {
                  const price = c.item.isOffer && c.item.discount ? c.item.price * (1 - c.item.discount / 100) : c.item.price;
                  return (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 bg-card rounded-2xl p-4 shadow-sm"
                    >
                      <img src={c.item.image} alt={c.item.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-semibold text-card-foreground">{c.item.name}</h4>
                        <p className="text-primary font-body font-bold">${price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeItem(c.id)} className="p-1.5 rounded-lg bg-muted hover:bg-muted/80">
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <span className="w-8 text-center font-body font-bold text-foreground">{c.quantity}</span>
                        <button onClick={() => addItem(c.id)} className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => deleteItem(c.id)} className="p-2 text-accent hover:text-accent/80">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  );
                })
              )}

              {/* Quick Add Section */}
              {cartItems.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">Add More Items</h3>
                  <div className="flex gap-3 overflow-x-auto pb-4">
                    {foodItems
                      .filter((f) => !cart.some((c) => c.id === f.id))
                      .slice(0, 6)
                      .map((item) => (
                        <button
                          key={item.id}
                          onClick={() => addItem(item.id)}
                          className="flex-shrink-0 flex items-center gap-3 bg-card rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow border border-border"
                        >
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="text-left">
                            <p className="font-body font-semibold text-sm text-card-foreground">{item.name}</p>
                            <p className="text-primary text-xs font-body font-bold">${item.price.toFixed(2)}</p>
                          </div>
                          <Plus className="w-4 h-4 text-primary" />
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-6 shadow-lg border border-border h-fit sticky top-24"
              >
                <h3 className="font-display font-bold text-xl text-card-foreground mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? "text-success" : "text-foreground"}`}>
                      {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground font-body">
                      Free delivery on orders over $30
                    </p>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-display font-bold text-lg text-foreground">Total</span>
                    <span className="font-display font-bold text-lg text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to={`/payment?total=${total.toFixed(2)}`}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-body font-bold hover:bg-primary/90 transition-all hover:shadow-lg"
                >
                  Proceed to Payment <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderPage;
