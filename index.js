import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import config from "./config.json";
import cors from "cors";
// import { matchRoutes } from "react-router-config";
// import Routes from "./src/shared/Routes";
// import createStore from "./src/shared/store/index";
// import renderer from "./src/shared/helpers/renderer";
// import Products from "./src/server/models/products";
import router from "./src/server/controllers/index";

const app = express();
const port = process.env.PORT || 3000;

const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) return false;
  return compression.filter(req, res);
};

app.use(compression({ level: 2, filter: shouldCompress }));
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.static("./build/public"));

mongoose
  .connect(process.env.MONGODB_URI || config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the Database...");
  })
  .catch((err) => console.log("ERROR: " + err));

app.get("*", router);
app.post("*", router);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
