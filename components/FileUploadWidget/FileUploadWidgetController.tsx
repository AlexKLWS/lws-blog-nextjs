import React, { useState, useRef } from 'react'

import FileUploadWidget from './FileUploadWidget'
import { FolderData, FileData } from 'types/file'
import { InjectedUploaderProps, withFileUploader } from 'facades/fileUploadFacade'

const FileUploadWidgetController: React.FC<InjectedUploaderProps> = (props) => {
  const folderSelectorId = useRef(0)
  const [folderDatas, setFolderDatas] = useState<FolderData[]>([{ id: String(folderSelectorId.current) }])
  const [isError, setIsError] = useState(false)

  const onUploadButtonClick = async () => {
    setIsError(false)
    const error = await props.uploadFiles(folderDatas)
    setIsError(!!error)
  }

  const onFolderNameSpecify = (data: FolderData, event: React.ChangeEvent<HTMLInputElement>) => {
    const datas = [...folderDatas]
    const folderSelectorIndex = datas.findIndex((s) => s.id === data.id)

    datas[folderSelectorIndex] = {
      id: data.id,
      folder: event.target.value,
      files: data.files,
    }
    setFolderDatas(datas)
  }

  const onFilesAdd = (data: FolderData, event: React.ChangeEvent<HTMLInputElement>) => {
    const datas = [...folderDatas]
    const folderSelectorIndex = datas.findIndex((s) => s.id === data.id)

    const files: FileData[] = []
    if (event.target.files) {
      for (let index = 0; index < event.target.files.length; index++) {
        files.push({ id: data.id + String(index), file: event.target.files[index] })
      }
    }

    datas[folderSelectorIndex] = {
      id: data.id,
      folder: data.folder,
      files,
    }
    setFolderDatas(datas)
  }

  const addFolder = () => {
    folderSelectorId.current++
    setFolderDatas([...folderDatas, { id: String(folderSelectorId.current) }])
  }

  const removeFolder = (id: string) => {
    let datas = folderDatas.filter((selector) => selector.id !== id)
    if (!datas.length) {
      folderSelectorId.current++
      datas = [{ id: String(folderSelectorId.current) }]
    }
    setFolderDatas(datas)
  }

  const updateFilename = (data: FolderData, fileId: string, filename: string) => {
    const datas = [...folderDatas]
    const folderSelectorIndex = datas.findIndex((s) => s.id === data.id)

    for (const file of datas[folderSelectorIndex].files!) {
      if (file.id === fileId) {
        file.newName = filename
        break
      }
    }
    setFolderDatas(datas)
  }

  return (
    <FileUploadWidget
      folderDatas={folderDatas}
      onUploadButtonClick={onUploadButtonClick}
      onFolderNameSpecify={onFolderNameSpecify}
      onFilesAdd={onFilesAdd}
      addFolder={addFolder}
      removeFolder={removeFolder}
      updateFilename={updateFilename}
      isError={isError}
    />
  )
}

export default withFileUploader(FileUploadWidgetController)
