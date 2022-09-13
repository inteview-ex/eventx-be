import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { expressCspHeader, NONE, NONCE, SELF } from 'express-csp-header'
import * as dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

async function bootstrap() {
  const serviceLogger = new Logger(`Main`)
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  //helmet to set save http header
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
      frameguard: {
        action: 'deny',
      },
    })
  )

  //csp
  const cspMiddleware = expressCspHeader({
    directives: {
      'default-src': [NONE],
      'script-src': [NONCE],
      'style-src': [NONCE],
      'img-src': [SELF],
      'font-src': [NONCE, 'fonts.gstatic.com'],
      'object-src': [NONE],
      'block-all-mixed-content': true,
      'frame-ancestors': [NONE],
      // 'worker-src': [NONE],
    },
  })
  process.env.NODE_ENV === 'production' && app.use(cspMiddleware)

  //trust proxy for rate limit
  app.set('trust proxy', 1)

  //rate limit
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 0, // limit each IP to 100 requests per windowMs
    })
  )

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  )

  const port = process.env.PORT || 3000
  serviceLogger.debug(
    `Nest Start at port ${port}, env: ${process.env.NODE_ENV}`
  )
  app.enableShutdownHooks()
  app.enableCors()
  await app.listen(port)

  // const tService = app.get(SchoolManagementService)
  // const result = await tService.test()
  // console.log("result", result)
}
bootstrap()
