import React from 'react'
import Modal from 'react-modal'

import styles from './ExternalLinkModal.module.scss'

type Props = {
  modalIsOpen: boolean
  externalURL: string | null
  setModalIsOpen: (isOpen: boolean) => void
  setExternalURL: (url: string | null) => void
}

const ExternalLinkModal: React.FC<Props> = (props: Props) => {
  const closeModal = () => {
    props.setExternalURL(null)
    props.setModalIsOpen(false)
  }

  const navigateToExternalLink = () => {
    closeModal()
    window.open(props.externalURL || undefined)
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.modalIsOpen}
      contentLabel='External Link Modal'
      className={styles.SubmitModalModal}
      overlayClassName={styles.SubmitModalModalOverlay}
    >
      <div className={styles.SubmitModalContentContainer}>
        <h2 className={styles.SubmitModalTitle}>You are about to navigate to {props.externalURL}</h2>
        <div className={styles.SubmitModalButtonContainer}>
          <input className={'App-button'} onClick={closeModal} type={'submit'} value={'Cancel'} />
          <input className={'App-button'} onClick={navigateToExternalLink} type={'submit'} value={'Continue'} />
        </div>
      </div>
    </Modal>
  )
}

export default ExternalLinkModal
