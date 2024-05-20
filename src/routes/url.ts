// src/routes/url.ts
import { createNewUrl, deleteExistingUrl, getAllUrls, getUrlById, updateExistingUrl } from "@/controllers/url"
import { authenticateToken, permission } from "@/middleware/authMiddleware"
import express from "express"

const router = express.Router()

// Routes for URLs
router.post("/createNewurls", authenticateToken, permission(["admin", "secretary"]), createNewUrl)
router.get("/getAllurls", authenticateToken, permission(["admin", "secretary"]), getAllUrls)
router.get("/geturls/:id", authenticateToken, permission(["admin", "secretary"]), getUrlById)
router.put("/updateExistingurls/:id", authenticateToken, permission(["admin", "secretary"]), updateExistingUrl)
router.delete("/deleteExistingurls/:id", authenticateToken, permission(["admin", "secretary"]), deleteExistingUrl)

export default router
