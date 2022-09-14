import { Field, ID, ObjectType } from '@nestjs/graphql'
import { NodeGQLType } from 'src/entities/base/node-interface/node-interface.type'

@ObjectType('CryptoInfo', {
  implements: () => [NodeGQLType],
})
export class CryptoInfoGQLType {

}
