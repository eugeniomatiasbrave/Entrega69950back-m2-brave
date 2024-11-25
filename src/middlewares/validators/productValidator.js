import { check, validationResult } from "express-validator";

const validateCreateProduct = [
  check("title")
    .exists()
    .withMessage("Title is required")
    .notEmpty()
    .withMessage("Title is required"),
  check("description")
    .exists()
    .withMessage("Description is required")
    .notEmpty()
    .withMessage("Description is required"),
  check("price")
    .exists()
    .withMessage("Price is required")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  check("code")
    .exists()
    .withMessage("Code is required")
    .notEmpty()
    .withMessage("Code is required"),
  check("stock")
    .exists()
    .withMessage("Stock is required")
    .notEmpty()
    .withMessage("Stock is required")
    .isNumeric()
    .withMessage("Stock must be a number"),
  check("category")
    .exists()
    .withMessage("Category is required")
    .notEmpty()
    .withMessage("Category is required"),
	
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      return res.status(400).send({ status: "error", error: error.array() });
    }
  },
];
export default validateCreateProduct;
