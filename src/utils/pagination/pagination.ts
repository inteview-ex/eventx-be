import { IsDefinedNotNull } from '../isDefinedNotNull'
import { PaginationInput } from './pagination.input'

export class Pagination {
  count = 0
  offset = 0
  totalPages = 1
  page = 1 // current page
  limit = 10 // result per page
  constructor(data?: Partial<Pagination>) {
    Object.assign(this, data)
  }
}

export const getPagination = (p?: PaginationInput) => {
  if (IsDefinedNotNull(p)) {
    let _finalSkip = p.offset

    if (p.limit < 0 || p.limit === null) {
      p.limit = 0
      p.skip = _finalSkip
      p.take = undefined
      return p
    }

    if (p.page > 1) {
      _finalSkip += (p.page - 1) * p.limit
    }
    p.skip = _finalSkip
    p.take = p.limit

    return p
  }
  return new PaginationInput({ limit: 0 })
}

export const getPaginationOutput = (p: PaginationInput, count = 0) => {
  const newP = new Pagination({ ...p, count })
  // calculate total page
  if (newP.limit > 0 && count > 0) {
    newP.totalPages = Math.ceil((count - newP.offset) / newP.limit)
  } else {
    newP.totalPages = 1
  }
  return newP
}
