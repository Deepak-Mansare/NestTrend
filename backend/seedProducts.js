// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const axios = require("axios");
// const productModel = require("./models/productSchema");

// dotenv.config();

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("✅ MongoDB connected");
//         return seedProducts();
//     })
//     .catch((err) => console.error("❌ MongoDB connection error:", err));

// const categories = [
//     "mens-shirts",
//     "mens-shoes",
//     "mens-watches",
//     "womens-dresses",
//     "womens-shoes",
//     "womens-watches",
//     "tops",
//     "sunglasses",
//     "womens-bags"
// ];

// function mapCategory(apiCategory) {
//     if (apiCategory.startsWith("mens-") || apiCategory === "tops") return "Men";
//     if (apiCategory.startsWith("womens-")) return "Women";
//     return "Accessories";
// }

// async function seedProducts() {
//     try {
//         let allProducts = [];

//         for (let cat of categories) {
//             const res = await axios.get(`https://dummyjson.com/products/category/${cat}`);
//             const products = res.data.products.map((p) => ({
//                 name: p.title,
//                 brand: "NestTrend",
//                 price: Math.round(p.price * 100),
//                 image: Array.isArray(p.images) ? p.images[0] : p.thumbnail,
//                 description: p.description,
//                 category: mapCategory(cat),
//             }));
//             allProducts.push(...products);
//         }

//         // Remove duplicate products (by name)
//         const uniqueProducts = [];
//         const seenNames = new Set();

//         for (let product of allProducts) {
//             if (!seenNames.has(product.name)) {
//                 uniqueProducts.push(product);
//                 seenNames.add(product.name);
//             }
//         }

//         await productModel.deleteMany();
//         await productModel.insertMany(uniqueProducts);

//         console.log(`✅ Seeded ${uniqueProducts.length} real clothing products.`);
//         process.exit();
//     } catch (error) {
//         console.error("❌ Seeding failed:", error);
//         process.exit(1);
//     }
// }




// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const axios = require("axios");
// const productModel = require("./models/productSchema");

// dotenv.config();

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log("✅ MongoDB connected");
//         return seedProducts();
//     })
//     .catch((err) => console.error("❌ MongoDB connection error:", err));

// async function seedProducts() {
//     try {
//         // Fetch products
//         const menRes = await axios.get("https://dummyjson.com/products/category/mens-shirts?limit=25");
//         const menShoes = await axios.get("https://dummyjson.com/products/category/mens-shoes?limit=25");
//         const womenDresses = await axios.get("https://dummyjson.com/products/category/womens-dresses?limit=25");
//         const womenShoes = await axios.get("https://dummyjson.com/products/category/womens-shoes?limit=25");

//         const menProductsRaw = [...menRes.data.products, ...menShoes.data.products];
//         const womenProductsRaw = [...womenDresses.data.products, ...womenShoes.data.products];

//         const menProducts = menProductsRaw.map((p) => ({
//             name: p.title,
//             brand: "NestTrend",
//             price: Math.round(p.price * 100),
//             image: Array.isArray(p.images) ? p.images[0] : p.thumbnail,
//             description: p.description,
//             category: "Men",
//         }));

//         const womenProducts = womenProductsRaw.map((p) => ({
//             name: p.title,
//             brand: "NestTrend",
//             price: Math.round(p.price * 100),
//             image: Array.isArray(p.images) ? p.images[0] : p.thumbnail,
//             description: p.description,
//             category: "Women",
//         }));

//         const finalProducts = [...menProducts, ...womenProducts];

//         await productModel.deleteMany();
//         await productModel.insertMany(finalProducts);

//         console.log(`✅ Seeded ${finalProducts.length} real Men & Women products.`);
//         process.exit();
//     } catch (error) {
//         console.error("❌ Seeding failed:", error);
//         process.exit(1);
//     }
// }


const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productModel = require("./models/productSchema");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        return seedKidsProducts();
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));

async function seedKidsProducts() {
    try {
        const kidsProducts = [
            {
                name: "Cartoon Printed T-Shirt",
                brand: "NestTrend",
                price: 699,
                image: "https://i.ibb.co/rKzhr5KX/one.webp",
                description: "Soft cotton t-shirt with fun cartoon design.",
                category: "Kids",
            },
            {
                name: "Denim Jeans for Kids",
                brand: "NestTrend",
                price: 1099,
                image: "https://i.ibb.co/9QmJrcj/two.jpg",
                description: "Durable and stylish jeans for kids.",
                category: "Kids",
            },
            {
                name: "Floral Party Dress",
                brand: "NestTrend",
                price: 999,
                image: "https://i.ibb.co/Mxqc6YSc/three.jpg",
                description: "Elegant floral dress perfect for birthdays.",
                category: "Kids",
            },
            {
                name: "Casual Cotton Frock",
                brand: "NestTrend",
                price: 899,
                image: "https://i.ibb.co/ym34Ptgf/four.jpg",
                description: "Breathable and comfy daily wear frock.",
                category: "Kids",
            },
            {
                name: "Shorts & Tee Set",
                brand: "NestTrend",
                price: 799,
                image: "https://i.ibb.co/qLqsQ95/five.webp",
                description: "Summer special tee and shorts set.",
                category: "Kids",
            },
            {
                name: "Warm Winter Jacket",
                brand: "NestTrend",
                price: 1299,
                image: "https://i.ibb.co/zWdvdSB/six.webp",
                description: "Cozy jacket to keep your kid warm.",
                category: "Kids",
            },
            {
                name: "Striped Polo Shirt",
                brand: "NestTrend",
                price: 649,
                image: "https://i.ibb.co/kkgcRws/seven.jpg",
                description: "Classic striped polo shirt for boys.",
                category: "Kids",
            },
            {
                name: "Kids Kurti Set",
                brand: "NestTrend",
                price: 899,
                image: "https://i.ibb.co/7J1ZtJK/eight.jpg",
                description: "Traditional outfit for festive occasions.",
                category: "Kids",
            },
            {
                name: "Superhero Costume",
                brand: "NestTrend",
                price: 1199,
                image: "https://i.ibb.co/tMkPZnk/nine.jpg",
                description: "Super cool costume for your little hero.",
                category: "Kids",
            },
            {
                name: "Ethnic Wear Set",
                brand: "NestTrend",
                price: 1099,
                image: "https://i.ibb.co/1tZVxLp/ten.jpg",
                description: "Stylish ethnic set with embroidery.",
                category: "Kids",
            },
            {
                name: "Kids Casual Wear",
                brand: "NestTrend",
                price: 899,
                image: "https://i.ibb.co/gFzL0Vt/eleven.jpg",
                description: "Smart and comfortable outfit combo.",
                category: "Kids",
            },
            {
                name: "Printed Hooded Sweatshirt",
                brand: "NestTrend",
                price: 999,
                image: "https://i.ibb.co/k66094W/twelve.jpg",
                description: "Cool hoodie with vibrant prints.",
                category: "Kids",
            },
        ];

        await productModel.insertMany(kidsProducts);
        console.log(`✅ Appended ${kidsProducts.length} Kids products.`);
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}
