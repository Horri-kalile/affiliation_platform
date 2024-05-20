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
