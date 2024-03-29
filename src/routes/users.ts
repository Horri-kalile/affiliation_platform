/**
 * @swagger
 * tags:
 *   name: User
 *   description: Operations related to user management.
 * /api/users:
 *   get:
 *     summary: Get all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns a list of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the request was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user's ID.
 *                       address:
 *                         type: string
 *                         description: The user's email address.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the user was created.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the user was last updated.
 *       500:
 *         description: Internal server error.
 * /api/login:
 *   post:
 *     summary: Logs in a user.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user object.
 *         schema:
 *           type: object
 *           required:
 *             - address
 *             - password
 *           properties:
 *             address:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: User not found.
 *       401:
 *         description: Incorrect password.
 *       500:
 *         description: Internal server error.
 * /api/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user object.
 *         schema:
 *           type: object
 *           required:
 *             - address
 *             - password
 *           properties:
 *             address:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request.
 *       409:
 *         description: Email address is already in use.
 *       500:
 *         description: Internal server error.
 * /api/protectedResource:
 *   get:
 *     summary: Get protected resource
 *     tags: [User]
 *     description: Retrieve a protected resource.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating access to protected resource
 *                   example: Access to protected resource granted
 */

import express from "express"
import { getProtectedResource, getUsers, login, register } from "../controllers/usersController"
import { authenticateToken, permission, refreshToken} from "../middleware/authMiddleware"

const router = express.Router()

router.post("/login", login)
router.get("/users", getUsers)
router.post("/register", register)
router.get("/refresh-token", refreshToken);
router.get("/protectedResource", authenticateToken, permission("secretary"), getProtectedResource);

export default router
