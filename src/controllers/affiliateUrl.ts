import Url from "@/models/url.model"
import User from "@/models/user.model"
import {
  createAffiliateUrl,
  deleteAffiliateUrl,
  fetchAffiliateUrlByIds,
  fetchAllAffiliateUrls
} from "@/services/affiliateUrl"
import { AffiliateUrlType } from "@/types"
import { Request, Response } from "express"

export const createNewAffiliateUrl = async (req: Request, res: Response) => {
  try {
    const { affiliateId, urlId }: AffiliateUrlType = req.body
    const affiliate = await User.findByPk(affiliateId)
    if (!affiliate) {
      return res.status(404).json({ success: false, message: "Affiliate not found" })
    }
    const url = await Url.findByPk(urlId)
    if (!url) {
      return res.status(404).json({ success: false, message: "URL not found" })
    }
    const newAffiliateUrl = await createAffiliateUrl({
      affiliateId,
      urlId,
      status: ""
    })
    return res.status(201).json({ success: true, data: newAffiliateUrl })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const getAllAffiliateUrls = async (req: Request, res: Response) => {
  try {
    const affiliateUrls = await fetchAllAffiliateUrls()
    return res.status(200).json({ success: true, data: affiliateUrls })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const getAffiliateUrlByIds = async (req: Request, res: Response) => {
  try {
    const { affiliate_id, url_id } = req.params
    const affiliateUrl = await fetchAffiliateUrlByIds(affiliate_id, url_id)
    if (!affiliateUrl) {
      return res.status(404).json({ success: false, message: "AffiliateUrl not found" })
    }
    return res.status(200).json({ success: true, data: affiliateUrl })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteExistingAffiliateUrl = async (req: Request, res: Response) => {
  try {
    const { affiliate_id, url_id } = req.params
    const success = await deleteAffiliateUrl(affiliate_id, url_id)
    if (!success) {
      return res.status(404).json({ success: false, message: "AffiliateUrl not found" })
    }
    return res.status(200).json({ success: true, message: "AffiliateUrl deleted successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
