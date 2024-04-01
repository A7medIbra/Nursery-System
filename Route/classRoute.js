const express = require('express');
const router = express.Router();
const controller = require("./../Controller/classController");
const validation = require("../Middlewares/validation/classValidator");
const auth = require("../Middlewares/Authrization");

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoints for managing classes
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Retrieve all classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of classes
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get("/class", auth.isAdmin, controller.getAllClasses);

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '200':
 *         description: Class successfully created
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post("/class", auth.isAdmin, validation.createClassValid, validation.validMSG, controller.createClass);

/**
 * @swagger
 * /class:
 *   put:
 *     summary: Update a class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       '200':
 *         description: Class successfully updated
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.put("/class", auth.isAdmin, validation.updateClassValid, validation.validMSG, controller.updateClass);

/**
 * @swagger
 * /class:
 *   delete:
 *     summary: Delete a class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Class successfully deleted
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.delete("/class", auth.isAdmin, validation.deleteClassValid, validation.validMSG, controller.deleteClass);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Retrieve a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Class ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A class object
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Class not found
 *       '500':
 *         description: Internal server error
 */
router.get("/class/:id", auth.isAdmin, validation.getClassByIdValid, validation.validMSG, controller.getClassById);

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Retrieve classes for a child
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Child ID
 *     responses:
 *       '200':
 *         description: A list of classes for the child
 *       '404':
 *         description: Child not found
 *       '500':
 *         description: Internal server error
 */
router.get("/class/child/:id", controller.getChild);

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Retrieve classes for a teacher
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     responses:
 *       '200':
 *         description: A list of classes for the teacher
 *       '404':
 *         description: Teacher not found
 *       '500':
 *         description: Internal server error
 */
router.get("/class/teacher/:id", controller.getSupervisor);

module.exports = router;
