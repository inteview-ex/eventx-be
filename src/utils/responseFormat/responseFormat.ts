import { PaginationOutputType } from '../pagination/pagination.type'

export interface ResponseFormat<T> {
  isSuccess: boolean
  code: number
  errorMessage?: string
  data: T
  pagination?: PaginationOutputType
}
export const defaultResponseFormat: ResponseFormat<any> = {
  isSuccess: false,
  code: 200,
  errorMessage: null,
  data: null,
  pagination: null,
}
export const defaultDBErrorMessage = 'DB error'
