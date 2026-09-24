import { body, validationResult } from "express-validator";

export const validateProduct = [
  body("name")
    .trim()
    .notEmpty().withMessage("El nombre del producto es obligatorio."),
  body("price")
    .isNumeric().withMessage("El precio debe ser un número.")
    .custom((value) => value > 0).withMessage("El precio debe ser mayor a 0."),
  body("stock")
    .optional()
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0."),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array().map(err => err.msg) 
      });
    }
    next();
  },
];