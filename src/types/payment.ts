export type address = {
  firstName: string
  lastName: string
  address: string
  zipCode: number | null
  province: string
  country: string
}

export type paymentMethod = 'cashOnDelivery' | 'creditCard'
export type checkoutOptions = {
  paymentMethod: paymentMethod
  creditCardInformation: creditCardInformation
  billingAddress: address
  shippingAddress: address
  useShippingAddress: boolean
}
export type creditCardInformation = {
  firstName: string
  lastName: string
  cardNumber: string
  cvv: number
}
