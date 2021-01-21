import { GetServerSideProps } from 'next'
import React from 'react'
import Cookies from 'cookies'

import FileUploadView from './FileUploadView'
import { TOKEN_COOKIE_KEY } from 'consts/cookies'
import { userAccessServerSideProvider } from 'facades/sessionFacade'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res)
  const token = cookies.get(TOKEN_COOKIE_KEY)
  const { checkUserAccess } = userAccessServerSideProvider()
  const response = await checkUserAccess(token)
  if (response === undefined) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}

const FileUploadController = () => {
  return <FileUploadView />
}

export default FileUploadController
