import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://xcafuhmhdlolsysrosaz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjYWZ1aG1oZGxvbHN5c3Jvc2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyMTkwNDEsImV4cCI6MjAyOTc5NTA0MX0.tFSmOYXpezB_e5EGWblPW-i78xI8yU-Dw0OsYL1LOV8"
);
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = data.user; // Attach the Supabase user to the request object
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
