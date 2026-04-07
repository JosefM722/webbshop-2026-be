import Plant from "../models/plant.js";

// Skapa en växt
export async function createPlant(plantData) {
  const plant = new Plant(plantData);
  await plant.save();
  return plant;
}

// Hämta alla tillgängliga växter
export async function getAllAvailablePlants() {
  return await Plant.find({ available: true }).populate("owner", "name");
}

// Hämta växt efter ID
export async function getPlantById(id) {
  return await Plant.findById(id).populate("owner", "name");
}

// Uppdatera växt
export async function updatePlant(id, updateData) {
  return await Plant.findByIdAndUpdate(id, updateData, { new: true });
}

// Ta bort växt
export async function deletePlant(id) {
  return await Plant.findByIdAndDelete(id);
}