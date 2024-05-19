import {
  createNewAffiliateUrl,
  deleteExistingAffiliateUrl,
  getAffiliateUrlByIds,
  getAllAffiliateUrls
} from "@/controllers/affiliateUrl"
import { authenticateToken, permission } from "@/middleware/authMiddleware"
import express from "express"

const router = express.Router()

// Routes for AffiliateUrls
router.post("/affiliate-urls", authenticateToken, permission(["admin", "secretary"]), createNewAffiliateUrl)
router.get("/affiliate-urls", authenticateToken, permission(["admin", "secretary"]), getAllAffiliateUrls)
router.get("/affiliate-urls/:affiliate_id/:url_id", authenticateToken, getAffiliateUrlByIds)
router.delete(
  "/affiliate-urls/:affiliate_id/:url_id",
  authenticateToken,
  permission(["admin", "secretary"]),
  deleteExistingAffiliateUrl
)

export default router
