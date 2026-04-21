import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createPlant,
  getAllAvailablePlants,
  getPlantById,
  updatePlant,
  deletePlant,
} from "../db/plants.js";

const router = Router();


// GET all available plants
router.get("/", async (req, res) => {
  try {
    const plants = await getAllAvailablePlants();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plants" });
  }
});

// GET plant by ID
router.get("/:id", async (req, res) => {
  try {
    const plant = await getPlantById(req.params.id);
    if (!plant) return res.status(404).json({ error: "Plant not found" });
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch plant" });
  }
});

// CREATE plant
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, image, lightLevel, location } = req.body;
    const newPlant = await createPlant({
      name,
      description,
      image,
      lightLevel,
      location,
      owner: req.user.id,
    });
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ error: "Failed to create plant" });
  }
});

// UPDATE plant
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedPlant = await updatePlant(req.params.id, req.body);
    if (!updatedPlant) return res.status(404).json({ error: "Plant not found" });
    res.json(updatedPlant);
  } catch (error) {
    res.status(500).json({ error: "Failed to update plant" });
  }
});

// DELETE plant
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedPlant = await deletePlant(req.params.id);
    if (!deletedPlant) return res.status(404).json({ error: "Plant not found" });
    res.json({ message: "Plant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete plant" });
  }
});

export default router;