import Url from "@/models/url.model"
import User from "@/models/user.model"
import { UrlType } from "@/types"
import { FindOptions, Op } from "sequelize"

export const createUrl = async (urlData: UrlType): Promise<Url> => {
  const newUrl = await Url.create(urlData)
  return newUrl
}

export const fetchAllUrls = async (): Promise<Url[]> => {
  const urls = await Url.findAll()
  return urls
}

export const fetchUrlById = async (urlId: string): Promise<Url | null> => {
  const url = await Url.findByPk(urlId)
  return url
}

export const fetchUrlIdByBase = async (baseUrl: string): Promise<string | null> => {
  const options: FindOptions = {
    where: {
      url: {
        [Op.like]: `%${baseUrl}%`
      }
    }
  } as FindOptions
  const url = await Url.findOne(options)
  return url ? url.id : null
}

export const fetchAdvertisedUrls = async (affiliateId: string) => {
  try {
    const urls = await Url.findAll({
      include: [
        {
          model: User,
          as: "affiliates",
          where: { id: affiliateId },
          through: { attributes: [] }
        }
      ]
    })

    const count = await Url.count({
      include: [
        {
          model: User,
          as: "affiliates",
          where: { id: affiliateId },
          through: { attributes: [] }
        }
      ]
    })

    return { urls, count }
  } catch (error) {
    throw new Error(`Failed to fetch advertised URLs: ${error.message}`)
  }
}

export const updateUrl = async (urlId: string, urlData: unknown): Promise<boolean> => {
  const [updatedRowsCount] = await Url.update(urlData, {
    where: { id: urlId } as any
  })
  return updatedRowsCount > 0
}

export const deleteUrl = async (urlId: string): Promise<boolean> => {
  const deletedRowsCount = await Url.destroy({
    where: { id: urlId } as any
  })
  return deletedRowsCount > 0
}
