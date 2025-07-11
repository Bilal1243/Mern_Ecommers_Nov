import express from "express";

const productRoute = express.Router();

import { productParser } from "../config/upload.js";
import {
  addProduct,
  createReview,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/ProductController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

productRoute
  .route("/")
  .post(productParser.single("image"), addProduct)
  .get(getProducts);

productRoute
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct);

productRoute.route("/:id/review").post(protect, createReview);

export default productRoute;
