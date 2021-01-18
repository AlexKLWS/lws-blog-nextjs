import { inject, injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { apiEndpoint } from 'consts/endpoints'
import { FolderData, FileMetaData, UploadMetaDataBody, FileUploadFormData } from 'types/file'
import { BehaviorSubject } from 'rxjs'
import { ISessionService, SessionServiceId } from './session'

export interface IFileUploadService {
  metadataUploadError: BehaviorSubject<boolean>
  getFileUploadStatus: (fileItemId: string) => BehaviorSubject<number>
  getFileURL: (fileItemId: string) => BehaviorSubject<string>
  getUploadError: (fileItemId: string) => BehaviorSubject<boolean>
  uploadFiles: (folderData: FolderData[]) => Promise<void>
}

@injectable()
export class FileUploadService implements IFileUploadService {
  private readonly _fileUploadStatuses: { [fileItemId: string]: BehaviorSubject<number> } = {}
  private readonly _fileURLs: { [fileItemId: string]: BehaviorSubject<string> } = {}
  private readonly _fileUploadErrors: { [fileItemId: string]: BehaviorSubject<boolean> } = {}
  private readonly _metadataUploadError: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private readonly _sessionService: ISessionService

  public constructor(@inject(SessionServiceId) sessionService: ISessionService) {
    this._sessionService = sessionService
  }

  get metadataUploadError(): BehaviorSubject<boolean> {
    return this._metadataUploadError
  }

  public getFileUploadStatus(fileItemId: string): BehaviorSubject<number> {
    if (!this._fileUploadStatuses[fileItemId]) {
      this._fileUploadStatuses[fileItemId] = new BehaviorSubject<number>(0)
    }
    return this._fileUploadStatuses[fileItemId]
  }

  public getFileURL(fileItemId: string): BehaviorSubject<string> {
    if (!this._fileURLs[fileItemId]) {
      this._fileURLs[fileItemId] = new BehaviorSubject<string>('')
    }
    return this._fileURLs[fileItemId]
  }

  public getUploadError(fileItemId: string): BehaviorSubject<boolean> {
    if (!this._fileUploadErrors[fileItemId]) {
      this._fileUploadErrors[fileItemId] = new BehaviorSubject<boolean>(false)
    }
    return this._fileUploadErrors[fileItemId]
  }

  public async uploadFiles(folderData: FolderData[]) {
    // Not very efficient, but the code is cleaner
    // TODO: Think how to refactor
    const metadata = this.createMetadata(folderData)
    const authToken = `Bearer ${this._sessionService.getToken()}`

    const metaDataRequest: AxiosRequestConfig = {
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      url: `${apiEndpoint}/files/metadata`,
      withCredentials: true,
      data: metadata,
    }

    let metaDataWithReferenceIds = []
    try {
      const fileMetaDataresponse = await axios(metaDataRequest)
      metaDataWithReferenceIds = fileMetaDataresponse.data.metaData
      this._metadataUploadError.next(false)
    } catch (_) {
      this._metadataUploadError.next(true)
      return
    }

    const folderDataWithReferenceIds = this.addReferenceIdToFolderData(folderData, metaDataWithReferenceIds)
    const formData = this.createFormdata(folderDataWithReferenceIds)

    formData.forEach(async ({ fileItemId, data }) => {
      const fileDataRequest: AxiosRequestConfig = {
        headers: {
          Authorization: authToken,
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

export const FileUploadServiceId = Symbol('FileUploadService')
