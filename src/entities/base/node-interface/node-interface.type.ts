import { Field, ID, InterfaceType } from '@nestjs/graphql'

@InterfaceType('Node')
export abstract class NodeGQLType {
  @Field((_) => ID)
  id: string

  @Field({ nullable: true })
  createAt: Date

  @Field({ nullable: true })
  updateAt: Date
}
