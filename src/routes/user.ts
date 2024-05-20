import {
  approveRegistration,
  updateUser,
  deleteUser,
  denyRegistration,
  fetchAllUsers,
  forgotPassword,
  login,
  register,
  registerUserByRole,
  resetPassword
} from "@/controllers/user"
import { authenticateToken, permission } from "@/middleware/authMiddleware"
import express from "express"
const router = express.Router()

// all users
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.put("/reset-password", resetPassword)
// super users
router.get("/users", authenticateToken, permission(["secretary", "admin"]), fetchAllUsers)
router.put("/updateUser/:id", authenticateToken, permission(["secretary", "admin"]), updateUser)
router.delete("/delete-user/:id", authenticateToken, permission(["secretary", "admin"]), deleteUser)
router.post("/register-me", registerUserByRole)
router.post("/approve-registration", authenticateToken, permission(["secretary", "admin"]), approveRegistration)
router.post("/deny-registration", authenticateToken, permission(["secretary", "admin"]), denyRegistration)
// affiliates
router.post("/affiliate/register", register)

export default router

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * paths:
 *   /login:
 *     post:
 *       summary: Log in
 *       tags: [Users]
 *       responses:
 *         '200':
 *           description: User logged in successfully
 *         '401':
 *           description: Unauthorized
 *   /forgot-password:
 *     post:
 *       summary: Request to reset password
 *       tags: [Users]
 *       responses:
 *         '200':
 *           description: Password reset request sent successfully
 *         '401':
 *           description: Unauthorized
 *   /reset-password:
 *     put:
 *       summary: Reset password
 *       tags: [Users]
 *       responses:
 *         '200':
 *           description: Password reset successfully
 *         '401':
 *           description: Unauthorized
 *   /users:
 *     get:
 *       summary: Get all users
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: List of all users
 *         '401':
 *           description: Unauthorized
 *   /updateUser/{id}:
 *     put:
 *       summary: Update a user by ID
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user
 *       responses:
 *         '200':
 *           description: The user was updated successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Not found
 *   /delete-user/{id}:
 *     delete:
 *       summary: Delete a user by ID
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the user
 *       responses:
 *         '200':
 *           description: The user was deleted successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Not found
 *   /approve-registration:
 *     post:
 *       summary: Approve user registration
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: User registration approved successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *   /deny-registration:
 *     post:
 *       summary: Deny user registration
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: User registration denied successfully
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *   /affiliate/register:
 *     post:
 *       summary: Register as an affiliate
 *       tags: [Users]
 *       responses:
 *         '200':
 *           description: User registered as an affiliate successfully
 *         '401':
 *           description: Unauthorized
 */
