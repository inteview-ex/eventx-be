import { Logger } from '@nestjs/common'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface'
import { Server as SocketIOServer, Socket as IOSocket } from 'socket.io'
import { CryptoInfo } from 'src/entities/crypto-info/crypto-info.entity'

@WebSocketGateway({
  allowEIO3:true,
  cors: {
    origin: '*',
  },
  namespace: '/cryptoTicker', //this is the namespace, which manager.socket(nsp) connect to,
  transports: ['websocket', 'polling'],
})
export class CryptoTickerGateway implements NestGateway {
  private readonly logger = new Logger(CryptoTickerGateway.name)
  afterInit(server: SocketIOServer) {
    this.logger.log(`WS ${CryptoTickerGateway.name} init`)
  }

  handleDisconnect(client: IOSocket) {
    this.logger.debug('client disconnect', client.id)
  }

  handleConnection(client: IOSocket) {
    this.logger.debug(`Connect client ${client.id}`)
  }
  @WebSocketServer()
  server: SocketIOServer

  _boardcastCryptoTicker(cryptoInfos: CryptoInfo[]) {
    this.server.emit('TICKERS', cryptoInfos)
  }
}
