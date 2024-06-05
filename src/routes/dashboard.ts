import express from "express"
import {
  getAffiliatesCount,
  getLatestSubscriptions,
  getLatestUsers,
  getAffiliateClicksByUrl,
  getAffiliateSubscriptionsByUrl,
  getAffilateAdvertisedUrls
} from "@/controllers/dashboard"
import { authenticateToken, permission } from "@/middleware/authMiddleware"

const router = express.Router()

router.get("/dashboard/affiliate-count", authenticateToken, permission(["admin", "secretary"]), getAffiliatesCount)
router.get("/dashboard/latest-users", authenticateToken, permission(["admin", "secretary"]), getLatestUsers)
router.get(
  "/dashboard/latest-subscriptions",
  authenticateToken,
  permission(["admin", "secretary", "affiliate"]),
  getLatestSubscriptions
)

router.get(
  "/dashboard/affiliate-clicks-by-url",
  authenticateToken,
  permission(["admin", "secretary", "affiliate"]),
  getAffiliateClicksByUrl
)
router.get(
  "/dashboard/affiliate-subscriptions-by-url",
  authenticateToken,
  permission(["admin", "secretary", "affiliate"]),
  getAffiliateSubscriptionsByUrl
)
router.get(
  "/dashboard/affiliate-advertised-urls",
  authenticateToken,
  permission(["admin", "secretary", "affiliate"]),
  getAffilateAdvertisedUrls
)

export default router
