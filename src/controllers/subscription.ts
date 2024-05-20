import Url from "@/models/url.model"
import User from "@/models/user.model"
import {
  createSubscription,
  deleteSubscription,
  fetchAllSubscriptions,
  fetchSubscriptionById
} from "@/services/subscription"
import { SubscriptionType } from "@/types"
import { Request, Response } from "express"

export const createNewSubscription = async (req: Request, res: Response) => {
  try {
    const { affiliateId, urlId, earnings }: SubscriptionType = req.body
    const affiliate = await User.findByPk(affiliateId)
    if (!affiliate) {
      return res.status(404).json({ success: false, message: "Affiliate not found" })
    }
    const url = await Url.findByPk(urlId)
    if (!url) {
      return res.status(404).json({ success: false, message: "URL not found" })
    }
    const newSubscription = await createSubscription({ affiliateId, urlId, earnings })
    return res.status(201).json({ success: true, data: newSubscription })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await fetchAllSubscriptions()
    return res.status(200).json({ success: true, data: subscriptions })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const subscription = await fetchSubscriptionById(id)
    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" })
    }
    return res.status(200).json({ success: true, data: subscription })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteExistingSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const success = await deleteSubscription(id)
    if (!success) {
      return res.status(404).json({ success: false, message: "Subscription not found" })
    }
    return res.status(200).json({ success: true, message: "Subscription deleted successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
