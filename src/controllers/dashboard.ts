// controllers/dashboard.ts
import { Request, Response } from "express"
import user from "@/models/user.model"
import Subscription from "@/models/subscription.model"
import Url from "@/models/url.model"
import User from "@/models/user.model"

export const getAffiliatesCount = async (req: Request, res: Response) => {
  try {
    const count = await user.count()
    res.status(200).json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getSubscriptionsCount = async (req: Request, res: Response) => {
  try {
    const count = await Subscription.count()
    res.status(200).json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUrlsCount = async (req: Request, res: Response) => {
  try {
    const count = await Url.count()
    res.status(200).json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getLatestUsers = async (req: Request, res: Response) => {
  try {
    const latestUsers = await User.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]]
    })

    res.status(200).json({ success: true, data: latestUsers })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch latest users", error })
  }
}
