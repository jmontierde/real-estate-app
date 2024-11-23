import express from "express";
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import post from "./routes/post.js";
import test from "./routes/test.js";
import property from "./routes/property.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Dynamically set the correct origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/property", property);
app.use("/api/post", post);
app.use("/api/test", test);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
