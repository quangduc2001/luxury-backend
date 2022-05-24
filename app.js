import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
const productRoute = require("./routes/product");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/auth");
app.use(cors({ credentials: "same-origin" }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("err", (err) =>
  console.log(`Data connected failed ${err}`)
);
mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});
app.use(express.json());
app.use("/api", productRoute);
app.use("/api", categoryRoutes);
app.use("/api", userRoutes);
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`database connected ${port}`);
});
// sakhkasfnl
// app.listen(process.env.PORT || 8000);
