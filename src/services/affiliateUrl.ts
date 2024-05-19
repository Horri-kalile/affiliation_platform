import AffiliateUrl from "@/models/affiliateUrl.model"
import { AffiliateUrlType } from "@/types"

export const createAffiliateUrl = async (affiliateUrlData: AffiliateUrlType): Promise<AffiliateUrl> => {
  const newAffiliateUrl = await AffiliateUrl.create({
    affiliate_id: affiliateUrlData.affiliateId,
    url_id: affiliateUrlData.urlId
  })
  return newAffiliateUrl
}

export const fetchAllAffiliateUrls = async (): Promise<AffiliateUrl[]> => {
  const affiliateUrls = await AffiliateUrl.findAll()
  return affiliateUrls
}

export const fetchAffiliateUrlByIds = async (affiliate_id: string, url_id: string): Promise<AffiliateUrl | null> => {
  const affiliateUrl = await AffiliateUrl.findOne({ where: { affiliate_id, url_id } })
  return affiliateUrl
}

export const deleteAffiliateUrl = async (affiliate_id: string, url_id: string): Promise<boolean> => {
  const deletedRowsCount = await AffiliateUrl.destroy({ where: { affiliate_id, url_id } })
  return deletedRowsCount > 0
}
