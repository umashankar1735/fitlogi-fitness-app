const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in .env");
  process.exit(1);
}

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ Import Models (optional if used inside route files)
const Workout = require("./models/Workout");

// ✅ Routes
const exerciseRoutes = require("./routes/exerciseRoutes");
const workoutPlanRoutes = require("./routes/workout.routes"); // ✔ Use this one!

// Optional/safe routes
const foodRoutes = safeRequire("./routes/food.routes");
const reminderRoutes = safeRequire("./routes/reminder.routes");
const progressRoutes = safeRequire("./routes/progress.routes");
const goalRoutes = require("./routes/goals.routes");

const authRoutes = safeRequire("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

// ✅ API base routes
app.get("/", (req, res) => {
  res.send("👋 Welcome to FitLogi Backend 🚀");
});

app.use("/api/exercises", exerciseRoutes);
app.use("/api/workout-plans", workoutPlanRoutes);
app.use("/api/goals", goalRoutes); // ✅ Your workout plans route
app.use('/api', workoutPlanRoutes); // This makes /api/plans available

if (foodRoutes) app.use("/api/foods", foodRoutes);
if (reminderRoutes) app.use("/api/reminders", reminderRoutes);
if (progressRoutes) app.use("/api/progress", progressRoutes);
if (authRoutes) app.use("/api/auth", authRoutes);

// ✅ Protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: `Hello authenticated user, ID: ${req.user.id}` });
});

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "❌ Route not found!" });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
  } else {
    console.error("❌ Server error:", err.message);
  }
  process.exit(1);
});

// ✅ Helper function for optional routes
function safeRequire(modulePath) {
  try {
    return require(modulePath);
  } catch (err) {
    console.warn(`⚠️ Route file missing: ${modulePath}`);
    return null;
  }
}
