import Products from "../models/ProductModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, description, price, countInStock } = req.body;

  const image = req.file ? req.file.path : null;

  const product = await Products.create({
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    image,
  });

  if (product) {
    res.status(201).json(product);
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;

  const page = Number(req.query.pageNumber) || 1;

  const keywordCondition = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Products.countDocuments({ ...keywordCondition });

  const products = await Products.find({ ...keywordCondition })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

const getProductById = asyncHandler(async (req, res) => {
  let product = await Products.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  let product = await Products.findById(req.params.id);
  if (product) {
    await Products.deleteOne({ _id: product._id });
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (item) => item.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Product Already Reviewed");
    }

    const review = {
      name: req.user.name,
      rating,
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating, 0) /
      product.reviews.length;

    const updateProduct = await product.save();

    res.status(201).json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { addProduct, getProducts, getProductById , deleteProduct , createReview };
