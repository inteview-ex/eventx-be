import { FindConditions, FindOneOptions, ObjectLiteral } from 'typeorm'

// export type NewWhere<T> =
//   | string
//   | FindConditions<T>
//   | ObjectLiteral
//   | FindConditions<T>[];
export type NewWhere<T> = FindOneOptions<T>['where']
export type NewOrder<T> = FindOneOptions<T>['order']
