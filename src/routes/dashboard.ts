import express from "express"
import {
  getAffiliatesCount,
  getLatestSubscriptions,
  getLatestUsers,
  getSubscriptionsCount,
  getUrlsCount,
  getClicksCount ,
   getAffiliateClicksByUrl,
  getAffiliateSubscriptionsByUrl,
  getAffilateAdvertisedUrls
} from "@/controllers/dashboard"
import { authenticateToken, permission } from "@/middleware/authMiddleware"

const router = express.Router()

router.get("/dashboard/affiliate-count", authenticateToken, permission(["admin", "secretary"]), getAffiliatesCount)
router.get(
  "/dashboard/subscription-count",
  authenticateToken,
  permission(["admin", "secretary", "affiliate"]),
  getSubscriptionsCount
)
router.get("/dashboard/urls-count", authenticateToken, permission(["admin", "secretary"]), getUrlsCount)
router.get("/dashboard/latest-users", authenticateToken, permission(["admin", "secretary"]), getLatestUsers)
router.get(
  "/dashboard/latest-subscriptions",
  authenticateToken,
  permission(["admin", "secretary", "affiliate"]),
  getLatestSubscriptions
)
router.get("/dashboard/clicks-count", authenticateToken, permission(["admin", "secretary"]), getClicksCount)

router.get("/dashboard/affiliate-clicks-by-url", authenticateToken, permission(["admin", "secretary", "affiliate"]), getAffiliateClicksByUrl);
router.get("/dashboard/affiliate-subscriptions-by-url", authenticateToken, permission(["admin", "secretary", "affiliate"]), getAffiliateSubscriptionsByUrl);
router.get("/dashboard/affiliate-advertised-urls", authenticateToken, permission(["admin", "secretary", "affiliate"]), getAffilateAdvertisedUrls);

export default router
