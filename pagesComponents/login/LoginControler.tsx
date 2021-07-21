import React, { useState } from 'react'
import { useRouter } from 'next/router'

import LoginView from './LoginView'
import { useLoginFacade } from 'facades/sessionFacade'
import routes from 'consts/routes'
import { deleteAllCookies } from 'helpers/cookies'

const LoginController: React.FC = () => {
  const [error, setError] = useState<Error | null>(null)
  const { login } = useLoginFacade()
  const router = useRouter()

  const handleLogin = async (username: string, password: string) => {
    setError(null)
    const loginSuccessful = await login(username, password)
    if (loginSuccessful) {
      router.push(routes.secret.home)
    } else {
      setError(new Error('Could not login! Please check your username and password, and try again!'))
    }
  }

  const onClearCookiesPress = () => {
    deleteAllCookies()
  }

  return (
    <LoginView
      onLoginPress={(username: string, password: string) => {
        handleLogin(username, password)
      }}
      onClearCookiesPress={onClearCookiesPress}
      error={error}
      setError={setError}
    />
  )
}

export default LoginController
