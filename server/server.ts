import mongoose from "mongoose";
import app from "./app"
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});