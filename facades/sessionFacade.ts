import { useRef } from 'react'
import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'node:querystring'

import { IServerSession, ServerSession } from 'session/serverSession'
import { ClientSession } from 'session/clientSession'

export const useLoginFacade = () => {
  const service = useRef(new ClientSession())

  const login = (username: string, password: string) => {
    return service.current.login(username, password)
  }

  return { login }
}

export const getServerSession = (context: GetServerSidePropsContext<ParsedUrlQuery>): IServerSession => {
  const serverSession = new ServerSession(context)

  return serverSession
}
