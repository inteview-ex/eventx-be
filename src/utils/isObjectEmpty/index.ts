import { IsDefinedNotNull } from '../isDefinedNotNull'

export const IsObjectEmpty = (obj: Record<string, unknown>) => {
  if (Object.keys(obj).length === 0) {
    return true
  } else {
    let isEmpty = true
    for (const key of Object.keys(obj)) {
      if (IsDefinedNotNull(obj[key])) {
        isEmpty = false
        break
      }
    }
    if (isEmpty) {
      return true
    } else {
      return false
    }
  }
}
