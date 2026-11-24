require("dotenv").config();
console.log("1. Index.js dijalankan");

const express = require("express");
const connectDatabase = require("./config/db");

console.log("2. Import berhasil");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes/api"));

console.log("3. Routes berhasil dimuat");

async function startServer() {
    console.log("4. Masuk startServer");

    try {
        console.log("5. Menghubungkan database");

        await connectDatabase();

        console.log("6. Database berhasil terkoneksi");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("ERROR:", error);
    }
}

startServer();