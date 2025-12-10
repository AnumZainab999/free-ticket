const FreeTicket = require("../models/freeTicket");

// Generate unique OrderId
const generateOrderId = () => {
  return "FREE-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
};

// POST /api/free-ticket/create
exports.createFreeTicket = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    // Validate fields
    if (!name || !phone || !email) {
      return res.status(400).json({
        message: "Name, phone and email are required",
      });
    }

    const ticket = new FreeTicket({
      orderId: generateOrderId(),
      name,
      phone,
      email,
    });

    await ticket.save();

    return res.status(201).json({
      message: "Free ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error creating free ticket:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET All Free Tickets
exports.getAllFreeTickets = async (req, res) => {
  try {
    const tickets = await FreeTicket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET Single Ticket by OrderId
exports.getFreeTicketByOrderId = async (req, res) => {
  try {
    const ticket = await FreeTicket.findOne({ orderId: req.params.orderId });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE Ticket
exports.deleteFreeTicket = async (req, res) => {
  try {
    const deleted = await FreeTicket.findOneAndDelete({ orderId: req.params.orderId });

    if (!deleted) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};