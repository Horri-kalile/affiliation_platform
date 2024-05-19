// src/services/subscription.ts
import Subscription from "@/models/subscription.model"
import { SubscriptionType } from "@/types"

export const createSubscription = async (subscriptionData: SubscriptionType): Promise<Subscription> => {
  const newSubscription = await Subscription.create(subscriptionData)
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

export const deleteSubscription = async (subscriptionId: string): Promise<boolean> => {
  const deletedRowsCount = await Subscription.destroy({
    where: { id: subscriptionId }
  })
  return deletedRowsCount > 0
}
