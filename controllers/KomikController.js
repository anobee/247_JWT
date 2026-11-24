const db = require("../models");
const Komik = require("../models/komik")(db.sequelize, db.Sequelize.DataTypes);

async function getAllKomik(req, res) {
    try {
        const komiks = await Komik.findAll();
        res.status(200).json(komiks);
    }
    catch (error) {
        console.error("Error fetching komiks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: "Komik not found" });
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error("Error fetching komik:", err);
        res.status(500).json({ message: "failed to fetch komik" });
    }
}

async function createKomik(req, res) {
    const { title, description, author } = req.body;    
    try {
        const newKomik = await Komik.create({ title, description, author });
        res.status(201).json(newKomik);
    } catch (err) {
        console.error("Error creating komik:", err);
        res.status(500).json({ message: "failed to create komik" });
    }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;
    try {
        const komik = await Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: "Komik not found" });
        }
        komik.title = title;
        komik.description = description;
        komik.author = author;
        await komik.save();
        res.status(200).json(komik);
    } catch (err) {
        console.error("Error updating komik:", err);
        res.status(500).json({ message: "failed to update komik" });
    }
}


module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik
};
