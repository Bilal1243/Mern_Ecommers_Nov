import express from "express";

const productRoute = express.Router();

import { productParser } from "../config/upload.js";
import { addProduct } from "../controllers/ProductController.js";

productRoute.route("/").post(productParser.single("image"), addProduct);

export default productRoute;