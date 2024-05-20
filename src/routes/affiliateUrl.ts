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

/**
 * @swagger
 * tags:
 *   name: AffiliateUrls
 *   description: Affiliate URL management
 * paths:
 *   /affiliate-urls:
 *     post:
 *       summary: Create a new affiliate URL
 *       tags: [AffiliateUrls]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 affiliateId:
 *                   type: string
 *                   description: ID of the affiliate
 *                 urlId:
 *                   type: string
 *                   description: ID of the URL
 *               required:
 *                 - affiliateId
 *                 - urlId
 *       responses:
 *         '200':
 *           description: The created affiliate URL
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   affiliateId:
 *                     type: string
 *                     description: ID of the affiliate
 *                   urlId:
 *                     type: string
 *                     description: ID of the URL
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *   /affiliate-urls/{affiliate_id}/{url_id}:
 *     get:
 *       summary: Get an affiliate URL by IDs
 *       tags: [AffiliateUrls]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: affiliate_id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the affiliate
 *         - in: path
 *           name: url_id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the URL
 *       responses:
 *         '200':
 *           description: The affiliate URL
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   affiliateId:
 *                     type: string
 *                     description: ID of the affiliate
 *                   urlId:
 *                     type: string
 *                     description: ID of the URL
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Not found
 *     delete:
 *       summary: Delete an affiliate URL by IDs
 *       tags: [AffiliateUrls]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: affiliate_id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the affiliate
 *         - in: path
 *           name: url_id
 *           schema:
 *             type: string
 *           required: true
 *           description: The ID of the URL
 *       responses:
 *         '200':
 *           description: The affiliate URL was deleted
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '404':
 *           description: Not found
 */
