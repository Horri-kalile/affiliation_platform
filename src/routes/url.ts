import { createNewUrl, deleteExistingUrl, getAllUrls, getUrlById, updateExistingUrl } from "@/controllers/url"
import { authenticateToken, permission } from "@/middleware/authMiddleware"
import express from "express"

const router = express.Router()

router.post("/createNewurls", authenticateToken, permission(["admin", "secretary"]), createNewUrl)
router.get("/getAllurls", authenticateToken, permission(["admin", "secretary"]), getAllUrls)
router.get("/geturl/:id", authenticateToken, permission(["admin", "secretary"]), getUrlById)
router.put("/updateUrl/:id", authenticateToken, permission(["admin", "secretary"]), updateExistingUrl)
router.delete("/deleteExistingurls/:id", authenticateToken, permission(["admin", "secretary"]), deleteExistingUrl)

export default router

/**
 * @swagger
 * tags:
 *   name: URLs
 *   description: URL management
 * paths:
 *   /createNewurls:
 *     post:
 *       summary: Create a new URL
 *       tags: [URLs]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: URL created successfully
 *         '401':
 *           description: Unauthorized
 *   /getAllurls:
 *     get:
 *       summary: Get all URLs
 *       tags: [URLs]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: List of all URLs
 *         '401':
 *           description: Unauthorized
 *   /geturl/{id}:
 *     get:
 *       summary: Get a URL by ID
 *       tags: [URLs]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the URL
 *       responses:
 *         '200':
 *           description: The URL details
 *         '401':
 *           description: Unauthorized
 *         '404':
 *           description: Not found
 *   /updateUrl/{id}:
 *     put:
 *       summary: Update an existing URL by ID
 *       tags: [URLs]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the URL
 *       responses:
 *         '200':
 *           description: The URL was updated successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Not found
 *   /deleteExistingurls/{id}:
 *     delete:
 *       summary: Delete a URL by ID
 *       tags: [URLs]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the URL
 *       responses:
 *         '200':
 *           description: The URL was deleted
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Not found
 */
