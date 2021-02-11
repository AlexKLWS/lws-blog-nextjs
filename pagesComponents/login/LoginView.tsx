import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'
import React, { useState } from 'react'

import styles from './Login.module.scss'

type Props = {
  onLoginPress: (username: string, password: string) => void
  onClearCookiesPress: () => void
  error: Error | null
  setError: (error: Error | null) => void
}

const LoginView: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.error) {
      props.setError(null)
    }
    setUsername(event.target.value)
  }

  const onPasswordInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.error) {
      props.setError(null)
    }
    setPassword(event.target.value)
  }

  const onKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      props.onLoginPress(username, password)
    }
  }

  return (
    <DefaultLayoutWrapper hideFooter hideHeader>
      <div className={styles.LoginContainer}>
        <input
          className={styles.LoginInput}
          placeholder='username'
          value={username}
          onChange={onUsernameInputValueChange}
        />
        <input
          className={styles.LoginInput}
          type='password'
          placeholder='password'
          value={password}
          onChange={onPasswordInputValueChange}
          onKeyDown={onKeyDown}
        />
        <input
          className='App-button'
          onClick={() => {
            props.onLoginPress(username, password)
          }}
          type='submit'
          value='Log in'
        />
        {props.error && <p className={styles.LoginError}>{props.error.message}</p>}
        <p className={styles.LoginGDPRInfo}>
          This website is using{' '}
          <a className={'App-external-link'} href='https://en.wikipedia.org/wiki/HTTP_cookie'>
            cookies
          </a>{' '}
          to store a{' '}
          <a className={'App-external-link'} href='https://jwt.io/introduction/'>
            JWT token
          </a>{' '}
          used to authenticate the user. The token is stored for 24 hours only. By logging in you consent to store this
          token on your device. If you had logged in previously and would like to remove the token cookie, press the
          button below.
        </p>
        <input className='App-button' onClick={props.onClearCookiesPress} type='submit' value='Clear Cookies' />
      </div>
    </DefaultLayoutWrapper>
  )
}

export default LoginView
