import axios, { AxiosRequestConfig } from 'axios'

import { apiEndpoint } from 'consts/endpoints'
import { FolderData, FileMetaData, UploadMetaDataBody, FileUploadFormData } from 'types/file'
import { Observable } from 'pubsub/observable'
import { IClientSession } from 'session/clientSession'
import { getAuthHeader } from 'helpers/getAuthHeader'

export interface IFileUploader {
  getFileUploadStatus: (fileItemId: string) => Observable<number>
  getFileURL: (fileItemId: string) => Observable<string>
  getUploadError: (fileItemId: string) => Observable<boolean>
  uploadFiles: (folderData: FolderData[]) => Promise<Error | undefined>
}

export class FileUploader implements IFileUploader {
  private readonly _fileUploadStatuses: { [fileItemId: string]: Observable<number> } = {}
  private readonly _fileURLs: { [fileItemId: string]: Observable<string> } = {}
  private readonly _fileUploadErrors: { [fileItemId: string]: Observable<boolean> } = {}
  private readonly _clientSession: IClientSession

  private _metaDataWithReferenceIds: FileMetaData[] = []

  public constructor(clientSession: IClientSession) {
    this._clientSession = clientSession
  }

  public getFileUploadStatus(fileItemId: string): Observable<number> {
    if (!this._fileUploadStatuses[fileItemId]) {
      this._fileUploadStatuses[fileItemId] = new Observable<number>(0)
    }
    return this._fileUploadStatuses[fileItemId]
  }

  public getFileURL(fileItemId: string): Observable<string> {
    if (!this._fileURLs[fileItemId]) {
      this._fileURLs[fileItemId] = new Observable<string>('')
    }
    return this._fileURLs[fileItemId]
  }

  public getUploadError(fileItemId: string): Observable<boolean> {
    if (!this._fileUploadErrors[fileItemId]) {
      this._fileUploadErrors[fileItemId] = new Observable<boolean>(false)
    }
    return this._fileUploadErrors[fileItemId]
  }

  public async uploadFiles(folderData: FolderData[]) {
    const error = await this.uploadMetadataToRetrieveRefs(folderData)

    if (error) {
      return error
    }

    await this.uploadFilesIndependently(folderData)
  }

  private uploadMetadataToRetrieveRefs = async (folderData: FolderData[]) => {
    // Not very efficient, but the code is cleaner
    // TODO: Think how to refactor
    const metadata = this.createMetadata(folderData)

    const metaDataRequest: AxiosRequestConfig = {
      headers: {
        ...getAuthHeader(this._clientSession.getToken()),
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      url: `${apiEndpoint}/files/metadata`,
      withCredentials: true,
      data: metadata,
    }

    try {
      const fileMetaDataresponse = await axios(metaDataRequest)
      this._metaDataWithReferenceIds = fileMetaDataresponse.data.metaData
    } catch (e) {
      return e
    }
  }

  private uploadFilesIndependently = async (folderData: FolderData[]) => {
    const folderDataWithReferenceIds = this.addReferenceIdToFolderData(folderData, this._metaDataWithReferenceIds)
    const formData = this.createFormdata(folderDataWithReferenceIds)

    formData.forEach(async ({ fileItemId, data }) => {
      const fileDataRequest: AxiosRequestConfig = {
        headers: {
          ...getAuthHeader(this._clientSession.getToken()),
          'Content-Type': 'multipart/form-data',
        },
        method: 'PUT',
        onUploadProgress: this.onUploadProgressFactory(fileItemId),
        url: `${apiEndpoint}/files`,
        withCredentials: true,
        data,
      }
      try {
        const fileURLResponse = await axios(fileDataRequest)
        this._fileURLs[fileItemId].next(fileURLResponse.data)
        this._fileUploadErrors[fileItemId].next(false)
      } catch (_) {
        this._fileUploadErrors[fileItemId].next(true)
      }
    })
  }

  private onUploadProgressFactory(fileItemId: string) {
    return (progressEvent: any) => {
      this._fileUploadStatuses[fileItemId].next(Math.round((progressEvent.loaded * 100) / progressEvent.total))
    }
  }

  private addReferenceIdToFolderData(folderData: FolderData[], metaData: FileMetaData[]): FolderData[] {
    const result = folderData
      .map((folder) => {
        if (!folder.files) {
          return null
        }
        folder.files = folder.files.map((file) => {
          const fileMetaData = metaData.find((d) => d.id === file.id)
          file.referenceId = fileMetaData?.referenceId
          return file
        })
        return folder
      })
      .filter((value) => value !== null) as FolderData[]
    return result
  }

  private createMetadata(folderData: FolderData[]): UploadMetaDataBody {
    let folderMetadatas: FileMetaData[] = []
    for (const folder of folderData) {
      const files: FileMetaData[] = !!folder.files
        ? folder.files.map((file) => {
            return {
              folder: folder.folder,
              newName: file.newName,
              id: file.id,
            }
          })
        : []
      folderMetadatas = folderMetadatas.concat(files)
    }
    return {
      metaData: folderMetadatas,
    }
  }

  private createFormdata(folderData: FolderData[]): FileUploadFormData[] {
    const formDatas: FileUploadFormData[] = []
    for (const folder of folderData) {
      if (!folder.files) {
        continue
      }
      for (const file of folder.files) {
        const data = new FormData()
        data.append('referenceId', file.referenceId!)
        data.append('file', file.file!)
        formDatas.push({
          fileItemId: file.id,
          data,
        })
      }
    }
    return formDatas
  }
}
