import { createClient } from "@supabase/supabase-js";
import { User } from "../models/User.js"; // Import the MongoDB user model

// Initialize Supabase client
const supabase = createClient(
  "https://xcafuhmhdlolsysrosaz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYWZ1aG1oZGxvbHN5c3Jvc2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMTkwNDEsImV4cCI6MjAyOTc5NTA0MX0.tFSmOYXpezB_e5EGWblPW-i78xI8yU-Dw0OsYL1LOV8"
);

export const signIn = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Step 1: Sign up using Supabase
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Step 2: Store user in MongoDB
    const newUser = new User({
      supabaseId: user.id, // Store the Supabase user ID
      email: user.email,
      name: name,
    });

    await newUser.save(); // Save to MongoDB

    return res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
