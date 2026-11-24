const db = require("../models");

async function connectDB() {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected successfully.");

        await db.sequelize.sync();
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        throw error;
    }
}

module.exports = connectDB;
