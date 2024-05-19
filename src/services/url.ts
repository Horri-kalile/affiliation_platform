// src/services/url.ts
import Url from "@/models/url.model"
import { UrlType } from "@/types"

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
