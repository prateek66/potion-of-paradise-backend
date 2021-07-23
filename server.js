// packages
import express, { urlencoded, json } from "express";
import morgan from "morgan";
import { config } from "dotenv";
import cors from "cors";
import expressListRoutes from "express-list-routes";
// modules
import { signup, signin, protect } from "./util/auth";
import { User } from "./resources/user/user.model";
import UserRouter from "./resources/user/user.router";
import CategoryRouter from "./resources/Category/Category_routes";
import ProductRouter from "./resources/Ecommerce/ecommerce.router";
import { connect } from "./util/db";
import { SECRETS } from "./util/config";
import { getUserById } from "./util/grabUserbyId";
import { getProducts,getProductById } from "./resources/Ecommerce/Ecommerce_controller";
import { view as viewCategories } from "./resources/Category/Category_controller";

config();
const app = express();
const PORT = process.env.PORT || 3000;

const userModel = (req, res, next) => {
  req.model = User;
  next();
};
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.post("/signup", userModel, signup);
app.post("/signin", userModel, signin);
app.get("/", (req, res) => {
  res.json("Server is Running");
});
app.use("/api/user", userModel, protect, UserRouter);
app.get("/products/:username/", getUserById, getProducts);
app.get("/products/:username/:id", getUserById, getProductById);
app.get("/categories/:username", getUserById, viewCategories);
app.use("/api/category", userModel, protect, CategoryRouter);
app.use("/api/product", userModel, protect, ProductRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      if (SECRETS.node_env === "development") {
        expressListRoutes(app);
      }
      console.log(`REST API on http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
