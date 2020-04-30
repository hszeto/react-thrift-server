import { ThriftServerExpress } from '@creditkarma/thrift-server-express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import {
  SessionId,
  UserAuthenticationService,
  UserProperties,
} from './codegen/com/gimbal/UserAuthenticationService_042220'

(async function startContentServer() {
  const app: express.Application = express()

  const serverConfig = {
    hostName: 'localhost',
    port: 8095,
    path: '/',
  }

  const serviceHandler: UserAuthenticationService.IHandler<express.Request> = {
    createUserSessionFromAdminSession(
      adminSession: SessionId, userEmailAddress: string, context?: express.Request | undefined,
    ): SessionId | Promise<SessionId> {
      console.log(userEmailAddress)

      if (userEmailAddress === 'test@gimbal.com') {
        return new SessionId({lowBits: 1, highBits: 1})
      }

      return new SessionId({lowBits: 0, highBits: 0})
    },
    sendUserSessionCreationTokenToUserEmailAddress(
      userEmailAddress: string, context?: express.Request | undefined,
    ): void | Promise<void> {
      return
    },
    createUserSessionWithToken(
      token: string, context?: express.Request | undefined,
    ): SessionId | Promise<SessionId> {
      return new SessionId({lowBits: 1, highBits: 1})
    },
    createUserSessionWithEmailAddressAndPassword(
      emailAddress: string, password: string, context?: express.Request | undefined,
    ): SessionId | Promise<SessionId> {
      console.log(emailAddress)
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) {
        return new SessionId({lowBits: 1, highBits: 1})
      }

      return new SessionId({lowBits: 0, highBits: 0})
    },
    terminateUserSession(
      userSession: SessionId, context?: express.Request | undefined,
    ): void | Promise<void> {
      return
    },
    setPasswordForSessionUser(
      userSession: SessionId, password: string, context?: express.Request | undefined,
    ): void | Promise<void> {
      return
    },
    getPropertiesForSessionUser(
      userSession: SessionId, context?: express.Request | undefined,
    ): UserProperties | Promise<UserProperties> {
      return new UserProperties({emailAddress: 'user@gimbal.com'})
    },
  }

  app.use (cors())
  app.use(
    serverConfig.path,
    bodyParser.raw(),
    ThriftServerExpress({
      serviceName: 'content-service',
      handler: new UserAuthenticationService.Processor(serviceHandler),
    }),
  )

  app.listen(serverConfig.port, () => {
    console.log(`Thrift server listening at http://${serverConfig.hostName}:${serverConfig.port}`)
  })
}())
