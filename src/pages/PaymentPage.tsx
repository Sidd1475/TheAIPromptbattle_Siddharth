import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Lock, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const total = searchParams.get("total") || "0.00";
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-success flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-success-foreground" />
            </motion.div>
            <h1 className="text-4xl font-display font-bold text-foreground mb-3">Order Placed!</h1>
            <p className="text-muted-foreground font-body mb-2">
              Your delicious meal is being prepared and will be delivered soon.
            </p>
            <p className="text-2xl font-display font-bold text-primary mb-8">${total}</p>
            <Link
              to="/"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-semibold"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-8 section-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/order" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-body mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Order
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-white"
          >
            Payment
          </motion.h1>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border space-y-6"
          >
            {/* Delivery Info */}
            <div>
              <h3 className="font-display font-bold text-lg text-card-foreground mb-4">Delivery Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-body font-medium text-muted-foreground mb-1.5">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-input font-body focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-muted-foreground mb-1.5">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-input font-body focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body font-medium text-muted-foreground mb-1.5">
                    Delivery Address
                  </label>
                  <textarea
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-input font-body focus:outline-none focus:ring-2 focus:ring-primary resize-none text-foreground"
                    placeholder="123 Main Street, Apt 4B"
                  />
                </div>
              </div>
            </div>

            {/* Card Info */}
            <div>
              <h3 className="font-display font-bold text-lg text-card-foreground mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Payment Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-body font-medium text-muted-foreground mb-1.5">
                    Card Number
                  </label>
                  <input
                    required
                    value={form.card}
                    onChange={(e) => setForm({ ...form, card: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-input font-body focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-muted-foreground mb-1.5">Expiry</label>
                    <input
                      required
                      value={form.expiry}
                      onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-input font-body focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-muted-foreground mb-1.5">CVV</label>
                    <input
                      required
                      value={form.cvv}
                      onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-input font-body focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="123"
                      maxLength={4}
                      type="password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total & Submit */}
            <div className="border-t border-border pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-display font-bold text-xl text-foreground">Total</span>
                <span className="font-display font-bold text-2xl text-primary">${total}</span>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-body font-bold text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Place Order
              </button>
              <p className="text-xs text-center text-muted-foreground font-body mt-3 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Your payment info is secured and encrypted
              </p>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentPage;
