import express from "express"
import affiliateUrlRoutes from "./affiliateUrl"
import clickRoutes from "./click"
import subscriptionRoutes from "./subscription"
import urlRoutes from "./url"
import userRoutes from "./user"
import feedbackRoutes from "./feedback"
import dashboardRoutes from "./dashboard"

const router = express.Router()

router.use("/", userRoutes)
router.use("/", urlRoutes)
router.use("/", clickRoutes)
router.use("/", feedbackRoutes)
router.use("/", subscriptionRoutes)
router.use("/", affiliateUrlRoutes)
router.use("/", dashboardRoutes)

export default router
