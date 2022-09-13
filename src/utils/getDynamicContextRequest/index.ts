import { ExecutionContext } from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

export const getDynamicContextRequest = (
  context: ExecutionContext
): Request => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest()
  } else if (context.getType<GqlContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
