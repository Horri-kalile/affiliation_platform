// src/routes/url.ts
import { createNewUrl, deleteExistingUrl, getAllUrls, getUrlById, updateExistingUrl } from "@/controllers/url"
import { authenticateToken, permission } from "@/middleware/authMiddleware"
import express from "express"

const router = express.Router()

// Routes for URLs
router.post("/urls", authenticateToken, permission(["admin", "secretary"]), createNewUrl)
router.get("/urls", authenticateToken, permission(["admin", "secretary"]), getAllUrls)
router.get("/urls/:id", authenticateToken, permission(["admin", "secretary"]), getUrlById)
router.put("/urls/:id", authenticateToken, permission(["admin", "secretary"]), updateExistingUrl)
router.delete("/urls/:id", authenticateToken, permission(["admin", "secretary"]), deleteExistingUrl)

export default router
