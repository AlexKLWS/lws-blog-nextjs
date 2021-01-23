import React from 'react'

import FileUploadWidget from 'components/FileUploadWidget'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'

const FileUploadView = () => {
  return (
    <DefaultLayoutWrapper>
      <div>
        <h1 className='App-title'>Upload Files</h1>
        <FileUploadWidget />
      </div>
    </DefaultLayoutWrapper>
  )
}

export default FileUploadView
