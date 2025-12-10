const express = require("express");
const router = express.Router();



const {
  createFreeTicket,
  getAllFreeTickets,
  getFreeTicketByOrderId,
  deleteFreeTicket
} = require("../controllers/freeTicketController");

router.post("/create", createFreeTicket);            
router.get("/all", getAllFreeTickets);               
router.get("/:orderId", getFreeTicketByOrderId);      
router.delete("/:orderId", deleteFreeTicket); 

module.exports = router;
