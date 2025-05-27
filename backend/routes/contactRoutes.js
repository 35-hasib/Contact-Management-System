const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/", authenticateToken, contactController.createContact);
router.get("/", authenticateToken, contactController.getContacts);
router.get("/:id", authenticateToken, contactController.getContactById);
router.put("/:id", authenticateToken, contactController.updateContact);
router.delete("/:id", authenticateToken, contactController.deleteContact);

module.exports = router;
