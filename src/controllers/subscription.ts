import {
  deleteSubscription,
  fetchSubscriptionById,
  getSubscriptionsWithRelatedData,
  updateSubscription as updateSubscriptionService
} from "@/services/subscription"
import { Request, Response } from "express"

export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await getSubscriptionsWithRelatedData()
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

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ success: false, message: "Subscription ID is required" })
    }
    const { earningAmount } = req.body
    if (!earningAmount) {
      return res.status(400).json({ success: false, message: "Earning amount is required" })
    }
    const success = await updateSubscriptionService(id, earningAmount)
    if (!success) {
      return res.status(404).json({ success: false, message: "Subscription not found" })
    }
    return res.status(200).json({ success: true, message: "Subscription updated successfully" })
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
