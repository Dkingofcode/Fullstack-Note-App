import "dotenv/config";
import env from "./utils/validateEnv";
import express from "express";
import mongoose from "mongoose";
const app = express();



app.get("/", (req, res) => {
    res.send("Hello world!");
});

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
.then(() => {
   console.log("Mongoose connected");
   app.listen(port, () => {
      console.log("Server running on port: " + port);
   });
})
.catch(console.error);

// app.listen(port, () => {
//     console.log("Server running on port: " + port);
// })














