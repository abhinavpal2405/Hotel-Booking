import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database Connected"));

    await mongoose.connect(`${process.env.MONGODB_URI}/HOTEL-BOOKING`);

    // Optional: Create a test document to force database visibility
    const TestSchema = new mongoose.Schema({ name: String });
    const Test = mongoose.model("Test", TestSchema);

    await Test.create({ name: "Ping" });

    console.log("Test document created.");
  } catch (error) {
    console.log("Unable to connect to database");
    console.log(error.message);
  }
};

export default connectDB;
