import React from 'react'

import styles from './FileUploadWidget.module.scss'
import { FolderData } from 'types/file'
import FileListItem from './FileListItem'

interface Props {
  folderDatas: FolderData[]
  isError: boolean
  onUploadButtonClick: () => void
  onFolderNameSpecify: (data: FolderData, event: React.ChangeEvent<HTMLInputElement>) => void
  onFilesAdd: (data: FolderData, event: React.ChangeEvent<HTMLInputElement>) => void
  addFolder: () => void
  removeFolder: (id: string) => void
  updateFilename: (data: FolderData, fileId: string, filename: string) => void
  useFileItemData: (id: string) => [number, string, boolean]
}

const FileUploadWidget: React.FC<Props> = (props: Props) => {
  const renderFolderSelectors = () => {
    return props.folderDatas.map((data) => {
      return (
        <li className={styles.FUWSelectorListItem} key={`${data.id}`}>
          <div className={styles.FUWSelectorItemContainer}>
            <input
              placeholder='Specify folder name'
              className='App-input'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.onFolderNameSpecify(data, event)
              }}
            />
            <div className={styles.FUWFileInputContainer}>
              <input
                type='file'
                className='App-file-input'
                id={`fileSelector-${data.id}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.onFilesAdd(data, event)
                }}
                accept='image/x-png,image/gif,image/jpeg,image/png'
                multiple
              />
              <label className='App-button' htmlFor={`fileSelector-${data.id}`}>
                {'Add files'}
              </label>
            </div>
            <input
              className='App-button'
              onClick={() => {
                props.removeFolder(data.id)
              }}
              type='submit'
              value='-'
            />
          </div>
          <ul className={styles.FUWFileList}>
            {data.files &&
              data.files
                .map((fileData) => {
                  return fileData.file ? (
                    <FileListItem
                      key={`${data.id}-${fileData.file.name}`}
                      fileData={fileData}
                      filename={fileData.newName}
                      useFileItemData={props.useFileItemData}
                      updateFilename={(filename: string) => {
                        props.updateFilename(data, fileData.id, filename)
                      }}
                    />
                  ) : null
                })
                .filter((element) => element !== null)}
          </ul>
        </li>
      )
    })
  }

  return (
    <div className={styles.FUWContainer}>
      <div style={{ display: 'flex' }}>
        <span className='App-label'>Folders: </span>
        <input className='App-button' onClick={props.addFolder} type='submit' value='+' />
      </div>
      <ul className={styles.FUWFolderSelectorList}>{renderFolderSelectors()}</ul>
      <div className={styles.FUWFileListItemRow}>
        {props.isError && (
          <span className={styles.FUWFileListItemError}>{`There was an error uploading metadata`}</span>
        )}
      </div>
      <div className={styles.FUWUploadButtonContainer}>
        <input className='App-button' onClick={props.onUploadButtonClick} type={'submit'} value={'Upload Files'} />
      </div>
    </div>
  )
}

export default FileUploadWidget
