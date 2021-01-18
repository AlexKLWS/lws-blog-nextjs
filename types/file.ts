export type FolderData = {
  id: string
  folder?: string
  files?: FileData[]
}

export type FileData = {
  id: string
  file: File
  newName?: string
  referenceId?: string
}

export type FileMetaData = {
  id: string
  folder?: string
  newName?: string
  referenceId?: string
}

export type FileUploadFormData = {
  fileItemId: string
  data: FormData
}

export type UploadMetaDataBody = {
  metaData: FileMetaData[]
}

export type FileUploadForm = {
  referenceId: string
  file: File
}
