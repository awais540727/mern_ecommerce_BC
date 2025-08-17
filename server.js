import express from "express";
import env from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Configure env
env.config();

// Database connection
connectDB();

// Create Express app
const app = express();

// Middleware
// app.use(express.json());

app.use(morgan("dev"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../ecom/build")));

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://mern-stack-ecommerce-project.vercel.app",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// 👇 THIS IS THE IMPORTANT PART
// app.options("*", cors()); // handle preflight for all routes

app.use(express.json());

// const allowedOrigins = [
//   // "http://localhost:3000",
//   "https://mern-stack-ecommerce-project.vercel.app/",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"), Error.message);
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// app.options("*", cors());
app.use(
  cors({
    origin: [
      "https://mern-stack-ecommerce-alpha.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

// // Serve static files from the build directory
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.join(__dirname, "ecom/build")));

// Define routes
// https://mern-ecommerce-bc.vercel.app/api/v1/auth/login
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello Welcome To Ecommerce</h1>");
});
// // For any other route, serve the index.html file
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../ecom/build/index.html"));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
