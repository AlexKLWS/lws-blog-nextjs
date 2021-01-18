import { useEffect, useRef, useState } from 'react'

import { useInjection } from 'services/provider'
import { SessionServiceId, ISessionService } from 'services/session'

export function useLoginFacade(): [(username: string, password: string) => Promise<boolean>] {
  const service = useRef(useInjection<ISessionService>(SessionServiceId))
  const login = (username: string, password: string) => {
    return service.current.login(username, password)
  }

  return [login]
}

export function useTokenProvider(tokenUpdateCallbackKey: string) {
  const service = useRef(useInjection<ISessionService>(SessionServiceId))

  const getToken = () => {
    return service.current.getToken()
  }

  const [isLoggedIn, setIsLoggedIn] = useState(service.current.isTokenPresent)

  useEffect(() => {
    service.current.addOnManualUpdateCallback(tokenUpdateCallbackKey, () => {
      setIsLoggedIn(service.current.isTokenPresent)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    isLoggedIn,
    getToken,
  }
}
