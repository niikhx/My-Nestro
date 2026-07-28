import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
  image: {
    type: String,
    default: null
  },
  status: {
    type: Boolean,
    default: true
  }
},
  {
    timestamps: true
  });

const categorymodel = mongoose.model("category", categorySchema);

export default categorymodel;