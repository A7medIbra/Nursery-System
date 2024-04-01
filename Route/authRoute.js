const express = require('express');
const controller = require("./../Controller/authController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       '200':
 *         description: User successfully created
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */
router.route("/signup").post(controller.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       '200':
 *         description: User successfully logged in
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.route("/login").post(controller.login);

/**
 * @swagger
 * /changePassword:
 *   put:
 *     summary: Change user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.route("/changePassword").put(controller.changePassword);

module.exports = router;
