import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { SessionServiceId, ISessionService, SessionService } from 'services/session'
import { container } from 'services/container'
import { IServerSession, ServerSession } from 'session/serverSession'
import { ParsedUrlQuery } from 'node:querystring'
import { GetServerSidePropsContext } from 'next'

export const useLoginFacade = () => {
  const service = useRef(useInjection<ISessionService>(SessionServiceId))
  const login = (username: string, password: string) => {
    return service.current.login(username, password)
  }

  return { login }
}

export function userAccessServerSideProvider() {
  const service = container.get<ISessionService>(SessionServiceId)

  const checkUserAccess = (token?: string) => {
    return service.checkUserAccess(token)
  }

  return { checkUserAccess }
}

export const sessionServiceProvider = (): ISessionService => {
  const service = new SessionService()

  return service
}

export const getServerSession = (context: GetServerSidePropsContext<ParsedUrlQuery>): IServerSession => {
  const serverSession = new ServerSession(context)

  return serverSession
}
