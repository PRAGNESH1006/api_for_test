import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  supabaseId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add other fields as needed
});

export const User = mongoose.model("User", userSchema);
