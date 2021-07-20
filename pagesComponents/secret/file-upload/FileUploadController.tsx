import { GetServerSideProps } from 'next'
import React from 'react'

import FileUploadView from './FileUploadView'
import { getServerSession } from 'facades/sessionFacade'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = getServerSession(context)
  const [_, error] = await session.checkUserAccess()
  if (error) {
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
