import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

plantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //TODO: Add salt and hash password
  next();
});

const Plant = mongoose.model("Plant", plantSchema);

export default Plant;