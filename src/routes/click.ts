// src/routes/click.ts
import { createNewClick, deleteExistingClick, getAllClicks, getClickById } from "@/controllers/click"
import { authenticateToken } from "@/middleware/authMiddleware"
import express from "express"

const router = express.Router()

// Routes for Clicks
router.post("/clicks", authenticateToken, createNewClick)
router.get("/clicks", authenticateToken, getAllClicks)
router.get("/clicks/:id", authenticateToken, getClickById)
router.delete("/clicks/:id", authenticateToken, deleteExistingClick)

export default router
