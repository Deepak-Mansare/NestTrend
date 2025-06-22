// seedProducts.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productModel = require("./models/productSchema");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        return seedProducts();
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const brands = ["Nike", "Adidas", "Puma", "Zara", "Levi's", "H&M", "UCB", "Roadster", "ONLY", "Biba"];
const categories = ["Men", "Women", "Kids", "Accessories", "Footwear", "Winterwear"];
const descriptions = [
    "Premium quality fabric with stylish design.",
    "Trendy and comfortable fit.",
    "Durable and lightweight material.",
    "Perfect for all occasions.",
    "Soft cotton fabric for everyday use.",
    "Elegant and sleek modern wear."
];

// 50 Product Entries
const sampleProducts = Array.from({ length: 50 }, (_, i) => {
    const category = categories[i % categories.length];
    const name = `${category} Item ${i + 1}`;
    return {
        name,
        brand: brands[i % brands.length],
        price: Math.floor(Math.random() * 3000) + 499,
        image: `https://dummyimage.com/300x300/ccc/000&text=${encodeURIComponent(name)}`,
        description: descriptions[i % descriptions.length],
        category,
    };
});

async function seedProducts() {
    try {
        await productModel.deleteMany();
        await productModel.insertMany(sampleProducts);
        console.log("✅ Seeded 50 products successfully.");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}
