import React, { PropsWithChildren } from 'react'

import styles from './FileUploadWidget.module.scss'
import { FileData } from 'types/file'
import { useFileItemUploadStatus } from 'facades/fileUploadFacade'

interface Props {
  fileData: FileData
  filename?: string
  updateFilename: (fileName: string) => void
}

const FileListItem: React.FC<Props> = (props) => {
  const { uploadPercentage, fileURL, isError } = useFileItemUploadStatus(props.fileData.id)

  return (
    <li className={styles.FUWFileListItem}>
      <div className={styles.FUWFileListItemRow}>
        <span className={styles.FUWFileListItemNameLabel}>{props.fileData.file!.name}</span>
        <input
          placeholder='Rename upon upload'
          className={styles.FUWFileListItemInput}
          value={props.filename}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.updateFilename(event.target.value)
          }}
        />
      </div>
      <div className={styles.FUWFileListItemRow}>
        {fileURL ? (
          <>
            <span className={styles.FUWFileListItemNameLabel}>{`File URL: `}</span>
            <span className={styles.FUWFileListItemNameLabelBold}>{fileURL}</span>
          </>
        ) : (
          <span style={{ width: `${uploadPercentage}%`, height: '4px', backgroundColor: '#000' }} />
        )}
      </div>
      <div className={styles.FUWFileListItemRow}>
        {isError && <span className={styles.FUWFileListItemError}>{`There was an error uploading this file`}</span>}
      </div>
    </li>
  )
}

const propsComparator = (
  prevProps: Readonly<PropsWithChildren<Props>>,
  nextProps: Readonly<PropsWithChildren<Props>>,
) => prevProps.fileData.newName === nextProps.fileData.newName

export default React.memo(FileListItem, propsComparator)
