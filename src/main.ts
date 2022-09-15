import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { expressCspHeader, NONE, NONCE, SELF } from 'express-csp-header'
import * as dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
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

  // rate limit
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
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

  // Add swagger on API on non-production
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Crypto Ticker')
      .setDescription('The crypto ticker API description')
      .setVersion('1.0')
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }

  await app.listen(port)
}
bootstrap()
