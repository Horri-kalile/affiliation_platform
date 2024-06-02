export type EarningType = {
  type: "subscription" | "click"
  amount: number
  createdAt?: Date
  updatedAt?: Date
}
