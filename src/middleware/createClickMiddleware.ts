import { Request, Response, NextFunction } from "express"
import { createClick } from "@/services/click"
import { ClickType } from "@/types"
import { fetchUrlIdByBase } from "@/services/url"

export const createClickMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const affiliateId = req.query.ref as string
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl
    const urlObj = new URL(fullUrl)
    const baseUrl = urlObj.hostname

    const urlId = await fetchUrlIdByBase(baseUrl)

    if (affiliateId && urlId) {
      const clickData: ClickType = {
        urlId: urlId,
        affiliateId: affiliateId
      }
      await createClick(clickData)
    }
  } catch (error) {
    console.error("Error creating click:", error)
  }
  next()
}
