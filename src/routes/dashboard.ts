// routes/dashboard.ts
import express from "express"
import { getAffiliatesCount, getSubscriptionsCount, getUrlsCount } from "@/controllers/dashboard"
import { authenticateToken, permission } from "@/middleware/authMiddleware"

const router = express.Router()

router.get("/dashboard/affiliate-count", authenticateToken, permission(["admin", "secretary"]), getAffiliatesCount)
router.get(
  "/dashboard/subscription-count",
  authenticateToken,
  permission(["admin", "secretary"]),
  getSubscriptionsCount
)
router.get("/dashboard/urls-countt", authenticateToken, permission(["admin", "secretary"]), getUrlsCount)

export default router
