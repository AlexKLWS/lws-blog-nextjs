import { useRef, useState, useEffect } from 'react'

import { useInjection } from 'services/provider'
import { IFileUploadService, FileUploadServiceId } from 'services/fileUpload'
import { FolderData } from 'types/file'
import { Subscription } from 'rxjs'

export function useFileUploadFacade(): [
  (folderData: FolderData[]) => void,
  (id: string) => [number, string, boolean],
  boolean,
] {
  const service = useRef(useInjection<IFileUploadService>(FileUploadServiceId))
  const uploadFiles = (folderData: FolderData[]) => {
    service.current.uploadFiles(folderData)
  }

  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const sub = service.current.metadataUploadError.subscribe((isError) => setIsError(isError))
    return () => sub.unsubscribe()
  }, [service])

  const useFileItemData = (id: string): [number, string, boolean] => {
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const [fileURL, setFileURL] = useState('')
    const [isError, setIsError] = useState(false)

    useEffect(() => {
      const subscriptions: Subscription[] = [
        service.current.getFileUploadStatus(id).subscribe((p) => setUploadPercentage(p)),
        service.current.getFileURL(id).subscribe((url) => setFileURL(url)),
        service.current.getUploadError(id).subscribe((isError) => setIsError(isError)),
      ]
      return () => {
        subscriptions.forEach((it) => it.unsubscribe())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [uploadPercentage, fileURL, isError]
  }

  return [uploadFiles, useFileItemData, isError]
}
