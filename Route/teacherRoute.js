const express = require('express');
const controller = require("./../Controller/teacherController");
const upload = require('./../Middlewares/multerMW');
const router = express.Router();
const validation = require("../Middlewares/validation/teacherValidator");
const auth = require("../Middlewares/Authrization");

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: API endpoints for managing teachers
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Retrieve all teachers
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of teachers
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get("/teachers", auth.isAdmin, controller.getAllTeachers);

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       '200':
 *         description: Teacher successfully created
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post("/teachers", auth.isAdmin, upload.single("image"), validation.createTeacherValid, validation.validMSG, controller.createTeacher);

/**
 * @swagger
 * /teachers:
 *   put:
 *     summary: Update a teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       '200':
 *         description: Teacher successfully updated
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.put("/teachers", auth.isAdmin, upload.single("image"), validation.updateTeacherValid, validation.validMSG, controller.updateTeacher);

/**
 * @swagger
 * /teachers:
 *   delete:
 *     summary: Delete a teacher
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Teacher successfully deleted
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.delete("/teachers", validation.deleteTeacherValid, validation.validMSG, controller.deleteTeacher);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Retrieve a teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Teacher ID
 *     responses:
 *       '200':
 *         description: A teacher object
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Teacher not found
 *       '500':
 *         description: Internal server error
 */
router.get("/teachers/:id", validation.getTeacherByIdValid, validation.validMSG, controller.getTeacherById);

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Retrieve supervisors
 *     tags: [Teachers]
 *     responses:
 *       '200':
 *         description: A list of supervisors
 *       '500':
 *         description: Internal server error
 */
router.get("/teachers/supervisors", controller.getSupervisors);

module.exports = router;
