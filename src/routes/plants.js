import plant from '../models/plant.js';
import { Router } from 'express';

const router = Router();

// Get all plants
router.get('/', async (req, res) => {
  try {
    const plants = await plant.find(); 
    res.json(plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Get a plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plantId = req.params.id;
    const plantData = await plant.findById(plantId);
    if (!plantData) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json(plantData);
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({ error: 'Failed to fetch plant' });
  }
}); 
// Create a new plant
router.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body; 
    const newPlant = new plant({ name, price, description });
    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ error: 'Failed to create plant' });
  }
});

// Update a plant by ID
router.put('/:id', async (req, res) => {
  try {
    const plantId = req.params.id;
    const { name, price, description } = req.body; 
    const updatedPlant = await plant.findByIdAndUpdate(plantId, { name, price, description }, { new: true });
    if (!updatedPlant) {
      return res.status(404).json({ error: 'Plant not found' });
    }  
    res.json(updatedPlant);
    } catch (error) {
    console.error('Error updating plant:', error);
    res.status(500).json({ error: 'Failed to update plant' });
  }
});

// Delete a plant by ID
router.delete('/:id', async (req, res) => {
  try {
    const plantId = req.params.id;
    const deletedPlant = await plant.findByIdAndDelete(plantId);
    if (!deletedPlant) {
      return res.status(404).json({ error: 'Plant not found' });
    }
    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({ error: 'Failed to delete plant' });
  } 
});

export default router;