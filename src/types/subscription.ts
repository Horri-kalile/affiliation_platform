export type SubscriptionType = {
  id?: string
  NewAffiliateId: string
  urlId: string
  affiliateId: string
  earningType: "subscription" | "click"
  earningAmount: number
  createdAt?: Date
  updatedAt?: Date
}
