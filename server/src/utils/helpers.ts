// import { PageRequest } from "../types/types.js"

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
