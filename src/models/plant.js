import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  lightLevel: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Index för geospatial queries (Leaflet)
plantSchema.index({ location: "2dsphere" });

const Plant = mongoose.model("Plant", plantSchema);
export default Plant;