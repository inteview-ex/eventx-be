import { parseBoolean } from 'src/utils/parseBoolean'

export class DBConf {
  host: string
  dbName: string
  port: number
  userName: string
  password: string
  sync: boolean
  provider: string
  constructor(data: DBConf) {
    Object.assign(this, data)
  }
}
export class RedisConf {
  host: string
  port: number
  password?: string
  url?: string
  constructor(data: RedisConf) {
    Object.assign(this, data)
    this.url = `redis://${this.host}:${this.port}`
  }
}

const isMainNodeChecker = () =>{
  const instanceId = process.env.NODE_APP_INSTANCE
  if(!instanceId || instanceId === null){
    return true
  }
  if(instanceId === "0"){
    return true
  }
  return false
}
export default () => ({
  db: new DBConf({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dbName: process.env.DB_NAME,
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    sync: parseBoolean(process.env.DB_SYNC),
    provider: process.env.DB_PROVIDER,
  }),
  redis: new RedisConf({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
  }),
  instanceId:process.env.NODE_APP_INSTANCE,
  isMainNode:isMainNodeChecker()
})
