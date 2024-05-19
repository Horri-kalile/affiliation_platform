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
router.post("/subscriptions", authenticateToken, createNewSubscription)
router.get("/subscriptions", authenticateToken, getAllSubscriptions)
router.get("/subscriptions/:id", authenticateToken, getSubscriptionById)
router.delete("/subscriptions/:id", authenticateToken, deleteExistingSubscription)

export default router
