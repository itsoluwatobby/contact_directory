// import { PageRequest } from "../types/types.js"

import { Response } from "express";
import { HTTP_CODES } from "./constants.js";

// export const pagination = async<T, K>({page, limit, Models, callback, query='nil'}: PageRequest<T, K>) => {
  
//   const count = limit
//   const currentPage = page
//   const startIndex = (currentPage * count) - count 
//   const resultLength = await Models.find().count()
//   const data  = await callback()
//   // const data = await Models.find().skip(startIndex).limit(count)
//   // {skip: startIndex, limit: count, query}

//   const total = Math.ceil(resultLength / count)
//   const pageable = {
//     pages: {
//       previous: (currentPage === 1 || currentPage > total || currentPage < 1) ? 'Non' : currentPage - 1,
//       currentPage,
//       next: (currentPage === total || currentPage > total || currentPage < 1) ? 'Non' : currentPage + 1,
//     },
//     count: data?.length,
//     pagesLeft: (currentPage > total || currentPage < 1) ? 'Non' : total - currentPage,
//     numberOfPages: total,
//   }
//   // if(currentPage > total || currentPage < 1) 
//   // return { message: currentPage < 1 ? 'Pages starts from 1' : 'Pages exceeded', pageable }
//   return { pageable, data };
// }

// export type PagedTypeResponse = Awaited<ReturnType<typeof pagination>>

export function sanitizeString(entry: string) {
  const val =  entry.trim()
  val.replace(/</g, '&lt;') // Replace less-than sign
    .replace(/>/g, '&gt;') // Replace greater-than sign
    .replace(/"/g, '&quot;') // Replace double quote
    .replace(/'/g, '&#39;'); // Replace single quote
  return val
}

/**
 * @description sanitizeEntries - sanitizes object entries
 * @param entries - object to sanitize
 * 
 * @returns the sanitized object
 */
export function sanitizeEntries<T extends object>(entries: T): T {
  const sanitizedValues = Object.entries(entries).map(([key, value]) => {
    if (typeof value === 'string') return [key, sanitizeString(value)]
    else return [key, value]
  })
  return Object.fromEntries(sanitizedValues)
}

export async function wrapperFunc(res: Response, callback: () => any) {
  try{
    await callback()
  }
  catch(err) {
    return res.sendStatus(HTTP_CODES.internal_server_error)
  }
}