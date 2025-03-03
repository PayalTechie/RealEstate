const express = require('express');
const cors = require('cors'); // Import CORS
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// ✅ Enable CORS for frontend (http://localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend access
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies & authorization headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 // Middleware to parse JSON

// Import routes
const userRoutes = require("./routes/userRoute");
const propertyRoutes = require("./routes/propertyRoute");
const bookingRoutes = require("./routes/bookingRoute");

// Connect to MongoDB
connectDB();

console.log("JWT_SECRET:", process.env.JWT_SECRET);
const port = process.env.PORT || 3000;

// Use routes
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});















