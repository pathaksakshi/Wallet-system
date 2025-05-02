import { body, param, query } from 'express-validator';

/**
 * Middleware to validate wallet creation input.
 *
 * @constant
 * @type {import("express-validator").ValidationChain[]}
 *
 * @description Validates that the wallet `name` is not empty and `balance` is a positive float.
 */
export const validateWalletSetup = [
  body("name")
    .not().isEmpty()
    .withMessage("Wallet name is required"),

  body("balance")
    .isFloat({ min: 0.0001 }) // ensure it's positive
    .withMessage("Balance must be a number > 0")
    .toFloat(),
];

/**
 * Middleware to validate a transaction creation request.
 *
 * @constant
 * @type {import("express-validator").ValidationChain[]}
 *
 * @description Validates `walletId` as a MongoDB ObjectId, `amount` as a float (0–4 decimals), and a non-empty `description`.
 */
export const validateTransaction = [
  param('walletId')
    .isMongoId()
    .withMessage('Invalid wallet id'),

  body('amount')
    .isFloat({ decimal_digits: '0,4' })
    .withMessage('Amount is required')
    .toFloat(),

  body('description')
    .not().isEmpty()
    .withMessage('Description is required'),
];

/**
 * Middleware to validate transaction retrieval query parameters.
 *
 * @constant
 * @type {import("express-validator").ValidationChain[]}
 *
 * @description Validates that `walletId` is a MongoDB ObjectId, and `skip` and `limit` are integers.
 */
export const validateGetTransactions = [
  query('walletId')
    .isMongoId()
    .withMessage('Invalid wallet id'),

  query('skip')
    .isInt()
    .withMessage('Skip is required')
    .toInt(),

  query('limit')
    .isInt()
    .withMessage('Limit is required')
    .toInt(),
];

/**
 * Middleware to validate wallet ID in route parameters.
 *
 * @constant
 * @type {import("express-validator").ValidationChain[]}
 *
 * @description Validates that the `id` parameter is a valid MongoDB ObjectId.
 */
export const validateWalletParams = [
  param('id')
    .isMongoId()
    .withMessage('Invalid wallet id format'),
];
