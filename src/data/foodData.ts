export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "breakfast" | "lunch" | "dinner" | "fastfood" | "dessert";
  rating: number;
  prepTime: string;
  isOffer?: boolean;
  discount?: number;
  offerExpiry?: string;
}

export const categories = [
  { id: "breakfast", name: "Breakfast", emoji: "🥞", color: "from-amber-400 to-orange-500" },
  { id: "lunch", name: "Lunch", emoji: "🥗", color: "from-green-400 to-emerald-500" },
  { id: "dinner", name: "Dinner", emoji: "🍝", color: "from-purple-400 to-indigo-500" },
  { id: "fastfood", name: "Fast Food", emoji: "🍔", color: "from-red-400 to-rose-500" },
  { id: "dessert", name: "Dessert", emoji: "🍰", color: "from-pink-400 to-fuchsia-500" },
];

export const foodItems: FoodItem[] = [
  // Breakfast
  { id: "b1", name: "Classic Pancakes", description: "Fluffy buttermilk pancakes with maple syrup and butter", price: 8.99, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop", category: "breakfast", rating: 4.8, prepTime: "15 min" },
  { id: "b2", name: "Avocado Toast", description: "Sourdough toast with smashed avocado, poached eggs, and chili flakes", price: 11.99, image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop", category: "breakfast", rating: 4.6, prepTime: "10 min" },
  { id: "b3", name: "Berry Smoothie Bowl", description: "Açaí blended with berries, topped with granola and fresh fruits", price: 9.99, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop", category: "breakfast", rating: 4.7, prepTime: "8 min" },
  { id: "b4", name: "Eggs Benedict", description: "Poached eggs on English muffin with hollandaise sauce", price: 13.99, image: "https://images.unsplash.com/photo-1608039829572-9b2f9c9c3c3e?w=400&h=300&fit=crop", category: "breakfast", rating: 4.9, prepTime: "20 min" },

  // Lunch
  { id: "l1", name: "Caesar Salad", description: "Crisp romaine lettuce, parmesan, croutons with caesar dressing", price: 12.99, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop", category: "lunch", rating: 4.5, prepTime: "12 min" },
  { id: "l2", name: "Grilled Chicken Bowl", description: "Herb-marinated chicken with quinoa, veggies and tahini sauce", price: 14.99, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", category: "lunch", rating: 4.7, prepTime: "18 min" },
  { id: "l3", name: "Poke Bowl", description: "Fresh tuna, rice, edamame, avocado with spicy mayo", price: 15.99, image: "https://images.unsplash.com/photo-1604259597308-4e3ce6b1b053?w=400&h=300&fit=crop", category: "lunch", rating: 4.8, prepTime: "15 min" },
  { id: "l4", name: "Club Sandwich", description: "Triple-decker with turkey, bacon, lettuce, tomato", price: 11.99, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop", category: "lunch", rating: 4.4, prepTime: "10 min" },

  // Dinner
  { id: "d1", name: "Grilled Salmon", description: "Atlantic salmon with lemon butter sauce and asparagus", price: 22.99, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", category: "dinner", rating: 4.9, prepTime: "25 min" },
  { id: "d2", name: "Pasta Carbonara", description: "Creamy spaghetti with pancetta, egg, and parmesan cheese", price: 16.99, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop", category: "dinner", rating: 4.7, prepTime: "20 min" },
  { id: "d3", name: "Beef Steak", description: "Prime ribeye steak with roasted potatoes and gravy", price: 28.99, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop", category: "dinner", rating: 4.9, prepTime: "30 min" },
  { id: "d4", name: "Butter Chicken", description: "Tender chicken in rich tomato-butter sauce with naan", price: 17.99, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop", category: "dinner", rating: 4.8, prepTime: "25 min" },

  // Fast Food
  { id: "f1", name: "Classic Burger", description: "Juicy beef patty with cheese, lettuce, tomato, and special sauce", price: 10.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", category: "fastfood", rating: 4.6, prepTime: "12 min", isOffer: true, discount: 20, offerExpiry: "2026-03-01" },
  { id: "f2", name: "Margherita Pizza", description: "Hand-tossed with fresh mozzarella, basil, and tomato sauce", price: 13.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop", category: "fastfood", rating: 4.8, prepTime: "18 min", isOffer: true, discount: 15, offerExpiry: "2026-02-28" },
  { id: "f3", name: "Chicken Wings", description: "Crispy buffalo wings with ranch dip", price: 9.99, image: "https://images.unsplash.com/photo-1608039829572-9b2f9c9c3c3e?w=400&h=300&fit=crop", category: "fastfood", rating: 4.5, prepTime: "15 min" },
  { id: "f4", name: "Fish & Chips", description: "Beer-battered cod with crispy fries and tartar sauce", price: 12.99, image: "https://images.unsplash.com/photo-1580217593608-61931cebd1e4?w=400&h=300&fit=crop", category: "fastfood", rating: 4.4, prepTime: "15 min", isOffer: true, discount: 10, offerExpiry: "2026-03-05" },

  // Dessert
  { id: "ds1", name: "Chocolate Lava Cake", description: "Warm chocolate cake with molten center and vanilla ice cream", price: 8.99, image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop", category: "dessert", rating: 4.9, prepTime: "12 min", isOffer: true, discount: 25, offerExpiry: "2026-02-27" },
  { id: "ds2", name: "Tiramisu", description: "Classic Italian dessert with mascarpone, espresso and cocoa", price: 7.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop", category: "dessert", rating: 4.8, prepTime: "5 min" },
  { id: "ds3", name: "Crème Brûlée", description: "Vanilla custard with caramelized sugar crust", price: 6.99, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop", category: "dessert", rating: 4.7, prepTime: "8 min" },
  { id: "ds4", name: "Mango Cheesecake", description: "Creamy cheesecake topped with fresh mango coulis", price: 8.49, image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop", category: "dessert", rating: 4.6, prepTime: "5 min", isOffer: true, discount: 30, offerExpiry: "2026-03-02" },
];

export const getOfferItems = () => foodItems.filter((item) => item.isOffer);
export const getItemsByCategory = (category: string) => foodItems.filter((item) => item.category === category);
export const searchItems = (query: string) =>
  foodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );
