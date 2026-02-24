import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { FoodItem } from "@/data/foodData";

interface FoodCardProps {
  item: FoodItem;
  index?: number;
}

const FoodCard = ({ item, index = 0 }: FoodCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
    >
      {item.isOffer && item.discount && (
        <div className="absolute top-3 left-3 z-10 bg-offer-badge text-offer-badge-foreground text-xs font-bold px-3 py-1 rounded-full">
          {item.discount}% OFF
        </div>
      )}
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display font-semibold text-lg text-card-foreground">{item.name}</h3>
          <div className="flex items-center gap-1 text-primary">
            <Star className="w-4 h-4 fill-primary" />
            <span className="text-sm font-body font-medium">{item.rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.isOffer && item.discount ? (
              <>
                <span className="text-lg font-bold text-primary font-body">
                  ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through font-body">
                  ${item.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary font-body">${item.price.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-body">{item.prepTime}</span>
          </div>
        </div>
        <Link
          to={`/order?item=${item.id}`}
          className="mt-3 w-full block text-center bg-primary text-primary-foreground py-2.5 rounded-xl font-body font-semibold text-sm hover:bg-primary/90 transition-all hover:shadow-md"
        >
          Order Now
        </Link>
      </div>
    </motion.div>
  );
};

export default FoodCard;
