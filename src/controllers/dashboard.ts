import { Request, Response } from "express"
import user from "@/models/user.model"
import Subscription from "@/models/subscription.model"
import Url from "@/models/url.model"
import User from "@/models/user.model"
import Click from "@/models/click.model"
import moment from "moment"
import { Op } from "sequelize"

export const getAffiliatesCount = async (req: Request, res: Response) => {
  try {
    const currentMonthCount = await user.count()
    const previousMonthCount = await getPreviousMonthUserCount()
    const percentageChange = calculatePercentageChange(previousMonthCount, currentMonthCount)

    res.status(200).json({ count: currentMonthCount, percentageChange })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getSubscriptionsCount = async (req: Request, res: Response) => {
  try {
    const currentMonthCount = await Subscription.count()
    const previousMonthCount = await getPreviousMonthSubscriptionCount()
    const percentageChange = calculatePercentageChange(previousMonthCount, currentMonthCount)

    res.status(200).json({ count: currentMonthCount, percentageChange })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getClicksCount = async (req: Request, res: Response) => {
  try {
    const currentMonthCount = await Click.count()
    const previousMonthCount = await getPreviousMonthClickCount()
    const percentageChange = calculatePercentageChange(previousMonthCount, currentMonthCount)

    res.status(200).json({ count: currentMonthCount, percentageChange })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUrlsCount = async (req: Request, res: Response) => {
  try {
    const currentMonthCount = await Url.count()
    const previousMonthCount = await getPreviousMonthUrlCount()
    const percentageChange = calculatePercentageChange(previousMonthCount, currentMonthCount)

    res.status(200).json({ count: currentMonthCount, percentageChange })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPreviousMonthCount = async (Model: any) => {
  const currentMonthYear = moment().startOf("month").format("YYYY-MM")
  const previousMonthYear = moment().subtract(1, "month").startOf("month").format("YYYY-MM")

  try {
    const count = await Model.count({
      where: {
        createdAt: {
          [Op.gte]: previousMonthYear,
          [Op.lt]: currentMonthYear
        }
      }
    })
    return count
  } catch (error) {
    throw new Error(`Error counting elements within date range: ${error.message}`)
  }
}

export const getPreviousMonthUserCount = async () => {
  return await getPreviousMonthCount(user)
}

export const getPreviousMonthSubscriptionCount = async () => {
  return await getPreviousMonthCount(Subscription)
}

export const getPreviousMonthClickCount = async () => {
  return await getPreviousMonthCount(Click)
}

export const getPreviousMonthUrlCount = async () => {
  return await getPreviousMonthCount(Url)
}

const calculatePercentageChange = (previousCount: number, currentCount: number) => {
  if (!previousCount) {
    return "No previous data"
  }
  const change = ((currentCount - previousCount) / previousCount) * 100
  return `+${change.toFixed(1)}% from last month`
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
