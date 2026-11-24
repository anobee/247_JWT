
require("dotenv").config();

const express = require("express");
const app = express();

const db = require("./models");
const apiRoutes = require("./routes/api");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

// Start Server
async function startServer() {
    try {
        // Test database connection
        await db.sequelize.authenticate();
        console.log("Database connected successfully.");

        // Run server
        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
}

// Execute server
startServer();