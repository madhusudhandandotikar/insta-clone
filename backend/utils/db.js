import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("mongodb connected successfully.");
//   } catch (error) {
//     console.log(error);
//   }
// };

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://madhusudhandandotikar:yZvzXkA6ePpxJjOL@cluster0.ywqub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongodb connected successfully.");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
