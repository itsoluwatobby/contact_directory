type ModelType<T> = Model<T, {}, {}, {}, Document<unknown, {}, T> & T & {
  _id: Types.ObjectId;
}, any>

type PageRequest<T, K> = {
  itemsLength: number, 
  Models: ModelType<T>, 
  callback: () => Promise<T[]>, 
  // callback: ({skip, limit, query}: FuncArgsType) => T[], 
  query?: string
  page: number,
  limit: number,
}

type FuncArgsType = { 
  skip: number, 
  limit: number, 
  query?: string 
}