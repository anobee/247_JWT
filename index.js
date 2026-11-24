require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Perpustakaan Komik REST API with JWT Authentication",
        status: "OK"
    });
});

// Mount Routes (supports /komik and /api/komik for Postman compatibility)
app.use("/api", apiRoutes);
app.use("/", apiRoutes);

// 404 Route Handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    });
});

// Database connection & Server initialization
async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server due to database error:", error.message);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} (Database connection pending/failed)`);
        });
    }
}

if (process.env.NODE_ENV !== "test") {
    startServer();
}

module.exports = app;
