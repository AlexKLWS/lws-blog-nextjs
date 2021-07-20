import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { SessionServiceId, ISessionService, SessionService } from 'services/session'
import { container } from 'services/container'

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
