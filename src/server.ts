import { ThriftServerExpress } from '@creditkarma/thrift-server-express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import {
  DemoService,
  DemoServiceException,
  User,
} from './codegen/com/demo/DemoService'
import {
  findUser,
  IMockUser,
} from './data'

(async function startContentServer() {
  const app: express.Application = express()

  const serverConfig = {
    hostName: 'localhost',
    port: 8000,
    path: '/',
  }

  const serviceHandler: DemoService.IHandler<express.Request> = {
    getUserInfo(userId: number, context?: express.Request | undefined): User | Promise<User> {
      const user: IMockUser | undefined = findUser(userId)

      if (user !== undefined) {
        return new User(user)
      } else {
        throw new DemoServiceException({
          message: `Unable to find user id: ${userId}`,
        })
      }
    },
  }

  app.use (cors())
  app.use(
    serverConfig.path,
    bodyParser.raw(),
    ThriftServerExpress({
      serviceName: 'content-service',
      handler: new DemoService.Processor(serviceHandler),
    }),
  )

  app.listen(serverConfig.port, () => {
    console.log(`Thrift server listening at http://${serverConfig.hostName}:${serverConfig.port}`)
  })
}())
