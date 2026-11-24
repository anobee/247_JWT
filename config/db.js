const db = require("../models");

async function connectDB() {
    try {
        await db.sequelize.authenticate();
        console.log("Database connected successfully.");

        await db.sequelize.sync({ alter: true });
        console.log("Database synchronized successfully.");
    } 

    catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
}