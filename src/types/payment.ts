export type email = {
  firstName: string
  lastName: string
  email: string
  zipCode: number | null
  province: string
  country: string
}

export type paymentMethod = "cashOnDelivery" | "creditCard"
export type checkoutOptions = {
  paymentMethod: paymentMethod
  creditCardInformation: creditCardInformation
  billingemail: email
  shippingemail: email
  useShippingemail: boolean
}
export type creditCardInformation = {
  firstName: string
  lastName: string
  cardNumber: string
  cvv: number
}
