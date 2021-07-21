import React, { useState, useEffect, useContext, useMemo } from 'react'

import { FileUploader, IFileUploader } from 'services/fileUpload'
import { onEmit } from 'helpers/onEmit'
import { ClientSession } from 'session/clientSession'
import { FolderData } from 'types/file'

export const FileUploaderContext = React.createContext<IFileUploader | null>(null)

export const useFileItemUploadStatus = (id: string) => {
  const uploader = useContext<IFileUploader | null>(FileUploaderContext)

  const [uploadPercentage, setUploadPercentage] = useState(0)
  const [fileURL, setFileURL] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const subscriptions = [
      onEmit<number>(uploader!.getFileUploadStatus(id), (p) => setUploadPercentage(p)),
      onEmit<string>(uploader!.getFileURL(id), (url) => setFileURL(url)),
      onEmit<boolean>(uploader!.getUploadError(id), (isError) => setIsError(isError)),
    ]
    return () => {
      subscriptions.forEach((it) => it())
    }
  }, [uploader])

  return { uploadPercentage, fileURL, isError }
}

export type InjectedUploaderProps = {
  uploadFiles: (folderData: FolderData[]) => Promise<Error | undefined>
}

export const withFileUploader = <P extends InjectedUploaderProps>(Component: React.ComponentType<P>) => {
  const session = new ClientSession()
  const uploader = new FileUploader(session)

  const uploadFiles = async (folderData: FolderData[]) => {
    return uploader.uploadFiles(folderData)
  }

  return (props: P) => (
    <FileUploaderContext.Provider value={uploader}>
      <Component {...props} uploadFiles={uploadFiles} />
    </FileUploaderContext.Provider>
  )
}
