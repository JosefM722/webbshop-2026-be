import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTrade,
  getUserTrades,
  getTradeById,
  updateTrade,
  deleteTrade,
} from "../db/trades.js";
import { getPlantById, updatePlant } from "../db/plants.js";

const router = Router();
router.use(authMiddleware);

// CREATE TRADE
router.post("/", async (req, res) => {
  try {
    const { plantId } = req.body;

    const plant = await getPlantById(plantId);
    if (!plant) return res.status(404).json({ error: "Plant not found" });

    if (plant.owner._id.toString() === req.user.id.toString()) {
      return res.status(400).json({ error: "You cannot trade your own plant" });
    }

    const newTrade = await createTrade({
      plant: plantId,
      requester: req.user.id,
      owner: plant.owner._id,
      status: "pending",
    });

    res.status(201).json(newTrade);
  } catch (error) {
    console.error("Error creating trade:", error);
    res.status(500).json({ error: "Failed to create trade" });
  }
});

// GET MY TRADES
router.get("/my", async (req, res) => {
  try {
    const trades = await getUserTrades(req.user.id);
    res.json(trades);
  } catch (error) {
    console.error("Error fetching trades:", error);
    res.status(500).json({ error: "Failed to fetch trades" });
  }
});

// APPROVE TRADE
router.post("/:id/approve", async (req, res) => {
  try {
    const trade = await getTradeById(req.params.id);
    if (!trade) return res.status(404).json({ error: "Trade not found" });

    if (trade.owner._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "Only the owner can approve this trade" });
    }

    if (trade.status !== "pending") {
      return res.status(400).json({ error: "Trade cannot be approved" });
    }

    const updated = await updateTrade(req.params.id, { status: "approved" });
    res.json(updated);
  } catch (error) {
    console.error("Error approving trade:", error);
    res.status(500).json({ error: "Failed to approve trade" });
  }
});

// COMPLETE TRADE
router.post("/:id/complete", async (req, res) => {
  try {
    const trade = await getTradeById(req.params.id);
    if (!trade) return res.status(404).json({ error: "Trade not found" });

    if (
      trade.owner._id.toString() !== req.user.id.toString() &&
      trade.requester._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (trade.status !== "approved") {
      return res.status(400).json({ error: "Only approved trades can be completed" });
    }

    const updatedTrade = await updateTrade(req.params.id, { status: "completed" });

    // Mark plant as unavailable
    await updatePlant(trade.plant._id, { available: false });

    res.json(updatedTrade);
  } catch (error) {
    console.error("Error completing trade:", error);
    res.status(500).json({ error: "Failed to complete trade" });
  }
});

// CANCEL TRADE
router.post("/:id/cancel", async (req, res) => {
  try {
    const trade = await getTradeById(req.params.id);
    if (!trade) return res.status(404).json({ error: "Trade not found" });

    if (
      trade.owner._id.toString() !== req.user.id.toString() &&
      trade.requester._id.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({ error: "Not authorized to cancel" });
    }

    await deleteTrade(req.params.id);
    res.json({ message: "Trade cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling trade:", error);
    res.status(500).json({ error: "Failed to cancel trade" });
  }
});

export default router;