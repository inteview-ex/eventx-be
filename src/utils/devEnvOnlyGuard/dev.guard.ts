import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { IsDevelopment } from '../isDevelopment/inde'

@Injectable()
export class DevEnvOnlyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return IsDevelopment()
  }
}
