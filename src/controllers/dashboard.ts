// controllers/dashboard.ts
import { Request, Response } from "express"
import user from "@/models/user.model"
import Subscription from "@/models/subscription.model"
import Url from "@/models/url.model"
import User from "@/models/user.model"
import Click from "@/models/click.model"

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
      order: [["createdAt", "DESC"]],
      where: {
        status: "approved",
        role: "affiliate"
      }
    })

    res.status(200).json({ success: true, data: latestUsers })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch latest users", error })
  }
}

export const getClicksCount = async (req: Request, res: Response) => {
  try {
    const count = await Click.count()
    res.status(200).json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getLatestSubscriptions = async (req: Request, res: Response) => {
  try {
    const latestSubscriptions = await Subscription.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
      include: [
        { model: Url, as: "url" },
        { model: User, as: "affiliate" },
        { model: User, as: "newUser" }
      ]
    })
    res.status(200).json({ success: true, data: latestSubscriptions })
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch latest subscriptions", error })
  }
}
