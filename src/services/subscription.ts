// src/services/subscription.ts
import Earning from "@/models/earning.model"
import Subscription from "@/models/subscription.model"
import Url from "@/models/url.model"
import User from "@/models/user.model"
import { SubscriptionType } from "@/types"
import { getEarningAmount } from "./earning"

export const getSubscriptionsWithRelatedData = async () => {
  try {
    const subscriptions = await Subscription.findAll({
      include: [
        {
          model: Url,
          as: "url"
        },
        {
          model: User,
          as: "affiliate"
        },
        {
          model: User,
          as: "newAffiliate"
        },
        {
          model: Earning,
          as: "earning"
        }
      ]
    })

    return subscriptions
  } catch (error) {
    console.error("Error fetching subscriptions with related data:", error)
    throw error
  }
}

export const createSubscription = async (
  subscriptionData: Pick<SubscriptionType, "NewAffiliateId" | "urlId" | "affiliateId">
): Promise<Subscription> => {
  const earningAmout = await getEarningAmount("subscription")
  const newSubscription = await Subscription.create({
    ...subscriptionData,
    earningType: "subscription",
    earningAmount: earningAmout
  })
  return newSubscription
}

export const fetchAllSubscriptions = async (): Promise<Subscription[]> => {
  const subscriptions = await Subscription.findAll()
  return subscriptions
}

export const fetchSubscriptionById = async (subscriptionId: string): Promise<Subscription | null> => {
  const subscription = await Subscription.findByPk(subscriptionId)
  return subscription
}

export const updateSubscription = async (id: string, earningAmount: number): Promise<boolean> => {
  const [updatedRowsCount] = await Subscription.update(
    { earningAmount },
    {
      where: { id } as any
    }
  )
  return updatedRowsCount > 0
}

export const deleteSubscription = async (subscriptionId: string): Promise<boolean> => {
  const deletedRowsCount = await Subscription.destroy({
    where: { id: subscriptionId }
  })
  return deletedRowsCount > 0
}
