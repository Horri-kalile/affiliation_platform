// src/routes/click.ts
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
