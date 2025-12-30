const express = require("express");
const {
  createCard,
  getAllCards,
  deleteCard,
} = require("../controllers/cardController");
const router = express.Router();

router.post("/:userId/createCard", createCard); // new card created
router.get("/:userId/getAllCards", getAllCards); // all cards fetched along with the transactions
// router.put("/:userId/updateCard", (req, res) => {}); // update card balance/name/color
router.delete("/:userId/deleteCard/:cardId", deleteCard); // delete whole card along with their transactions

module.exports = router;
