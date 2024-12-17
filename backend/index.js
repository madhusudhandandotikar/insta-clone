// import dotenv from "dotenv";
// dotenv.config(); // This should be the first line in your index.js
// console.log("MONGO_URI:", process.env.MONGO_URI);

// import express, { urlencoded } from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import postRoute from "./routes/post.route.js";
// import messageRoute from "./routes/message.route.js";
// import { app, server } from "./socket/socket.js";
// import path from "path";

// // Rest of your code...

// const PORT = process.env.PORT || 3000;

// const __dirname = path.resolve();

// //middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(urlencoded({ extended: true }));
// // app.use(cors());
// const corsOptions = {
//   origin: process.env.URL,
//   credentials: true,
// };
// app.use(cors(corsOptions));

// // yha pr apni api ayengi
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/post", postRoute);
// app.use("/api/v1/message", messageRoute);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// });

// server.listen(PORT, () => {
//   connectDB();
//   console.log(`Server listen at port ${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config(); // This should be the first line in your index.js
console.log("MONGO_URI:", process.env.MONGO_URI);

import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

// Rest of your code...

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// Define allowed origins
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// Serve frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server listening at port ${PORT}`);
});
