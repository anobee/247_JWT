const expresss = require("express");
const router = expresss.Router();

const komikController = require("../controllers/komikController");
const userController = require("../controllers/userControler");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.login);

router.get("/komik", komikController.getAllKomik);
router.get("/komik/:id", komikController.getKomikById);

router.post("/komik", authMiddleware, komikController.createKomik);
router.put("/komik/:id", authMiddleware, komikController.updateKomik);
router.delete("/komik/:id", authMiddleware, komikController.deleteKomik);   

module.exports = router;