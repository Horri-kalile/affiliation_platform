import { createNewClick, deleteExistingClick, getAllClicks, getClickById } from "@/controllers/click"
import { authenticateToken } from "@/middleware/authMiddleware"
import express from "express"

const router = express.Router()

// Routes for Clicks
router.post("/createNewclicks", authenticateToken, createNewClick)
router.get("/getAllclicks", authenticateToken, getAllClicks)
router.get("/getclicks/:id", authenticateToken, getClickById)
router.delete("/deleteExistingclicks/:id", authenticateToken, deleteExistingClick)

export default router

/**
 * @swagger
 * tags:
 *   name: Clicks
 *   description: Clicks management
 * paths:
 *   /createNewclicks:
 *     post:
 *       summary: Create a new click
 *       tags: [Clicks]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: Click created successfully
 *         '401':
 *           description: Unauthorized
 *   /getAllclicks:
 *     get:
 *       summary: Get all clicks
 *       tags: [Clicks]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: List of all clicks
 *         '401':
 *           description: Unauthorized
 *   /getclicks/{id}:
 *     get:
 *       summary: Get a click by ID
 *       tags: [Clicks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the click
 *       responses:
 *         '200':
 *           description: The click details
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *   /deleteExistingclicks/{id}:
 *     delete:
 *       summary: Delete a click by ID
 *       tags: [Clicks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the click
 *       responses:
 *         '200':
 *           description: The click was deleted
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 */
