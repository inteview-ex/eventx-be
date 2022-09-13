import { Module, ModuleMetadata } from '@nestjs/common'
import { IsDevelopment } from 'src/utils/isDevelopment/inde'
import { SystemTestResolver } from './system-test.resolver'
import { SystemTestService } from './system-test.service'

const metaData: ModuleMetadata = {
  imports: [],
  providers: [],
  exports: [],
}
if (IsDevelopment()) {
  metaData.providers.push(SystemTestService, SystemTestResolver)
  metaData.exports.push(SystemTestService)
}
@Module(metaData)
export class SystemTestModule {}
