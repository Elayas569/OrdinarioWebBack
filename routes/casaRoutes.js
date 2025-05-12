const express = require("express");
const router = express.Router();
const {
  createCasa,
  getCasa,
  updateCasa,
  deleteCasa,
  getMisCasas,
} = require("../controllers/casaControllers");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getCasa);
router.get("/mis-casas", protect, getMisCasas);
router.post("/", protect, createCasa);
router.put("/:id", protect, updateCasa);
router.delete("/:id", protect, deleteCasa);

module.exports = router;
