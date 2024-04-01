const express = require('express');
const router = express.Router();
const controller = require("./../Controller/childController");
const validation = require("../Middlewares/validation/childValidator");
const auth = require("../Middlewares/Authrization");

/**
 * @swagger
 * tags:
 *   name: Children
 *   description: API endpoints for managing children
 */

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of children
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Create a new child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       '201':
 *         description: Child created successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 *   put:
 *     summary: Update a child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       '200':
 *         description: Child updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal server error
 *   delete:
 *     summary: Delete a child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '204':
 *         description: Child deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal server error
 */
router.route("/child")
    .all(auth.isAuthorized)
    .get(controller.getAllChildren)
    .post(auth.isAdmin, validation.createChildValid, validation.validMSG, controller.createChild)
    .put(auth.isAdmin, validation.updateChildValid, validation.validMSG, controller.updateChild)
    .delete(auth.isAdmin, validation.deleteChildValid, validation.validMSG, controller.deleteChild);

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get a child by ID
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single child object
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal server error
 */
router.route("/child/:id")
    .all(auth.isAuthorized)
    .get(auth.isAdmin, validation.getChildByIdValid, validation.validMSG, controller.getChildById);

module.exports = router;
