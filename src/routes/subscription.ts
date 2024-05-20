// src/routes/subscription.ts
import {
  createNewSubscription,
  deleteExistingSubscription,
  getAllSubscriptions,
  getSubscriptionById
} from "@/controllers/subscription"
import { authenticateToken } from "@/middleware/authMiddleware"
import express from "express"

const router = express.Router()

// Routes for Subscriptions
router.post("/createNewsubscriptions", authenticateToken, createNewSubscription)
router.get("/getAllsubscriptions", authenticateToken, getAllSubscriptions)
router.get("/getsubscriptions/:id", authenticateToken, getSubscriptionById)
router.delete("/deleteExistingsubscriptions/:id", authenticateToken, deleteExistingSubscription)

export default router
