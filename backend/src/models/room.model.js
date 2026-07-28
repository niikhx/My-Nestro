import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  status: {
    type: Boolean,
    default: true
  }
},
  {
    timestamps: true
  });

const RoomModel = mongoose.model("room", roomSchema);

export default RoomModel;