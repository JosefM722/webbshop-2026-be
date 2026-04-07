import Trade from "../models/trade.js";

// Skapa trade
export async function createTrade(tradeData) {
  const trade = new Trade(tradeData);
  await trade.save();
  return trade;
}

// Hämta alla trades för en användare
export async function getUserTrades(userId) {
  return await Trade.find({
    $or: [{ requester: userId }, { owner: userId }],
  })
    .populate("plant")
    .populate("requester", "name")
    .populate("owner", "name");
}

// Hämta trade efter ID
export async function getTradeById(id) {
  return await Trade.findById(id)
    .populate("plant")
    .populate("requester", "name")
    .populate("owner", "name");
}

// Uppdatera trade
export async function updateTrade(id, updateData) {
  return await Trade.findByIdAndUpdate(id, updateData, { new: true });
}

// Ta bort trade
export async function deleteTrade(id) {
  return await Trade.findByIdAndDelete(id);
}