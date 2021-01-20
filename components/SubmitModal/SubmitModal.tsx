import React from 'react'
import Modal from 'react-modal'

import styles from './SubmitModal.module.scss'
import { EditorError } from 'types/verifier'

interface Props {
  modalIsOpen: boolean
  submitErrors: EditorError[]
  onSubmit: () => void
  setModalIsOpen: (value: boolean) => void
}

const ArticleSubmitModal: React.FC<Props> = (props: Props) => {
  const onCancelButtonClick = () => {
    props.setModalIsOpen(false)
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.modalIsOpen}
      contentLabel='Example Modal'
      className={styles.ArticleSubmitModalModal}
      overlayClassName={styles.ArticleSubmitModalModalOverlay}
    >
      <div className={styles.ArticleSubmitModalContentContainer}>
        <h2 className={styles.ArticleSubmitModalTitle}>Are you ready to submit the material?</h2>
        <ul className={styles.ArticleSubmitModalErrorsList}>
          {props.submitErrors.map((item) => {
            return (
              <li key={item.id} className={styles.ArticleSubmitModalErrorItem}>
                {item.description}
              </li>
            )
          })}
        </ul>
        <div className={styles.ArticleSubmitModalButtonContainer}>
          <input
            className={props.submitErrors.length > 0 ? 'App-button inactive' : 'App-button'}
            onClick={props.onSubmit}
            type={'submit'}
            value={'Submit'}
            disabled={props.submitErrors.length > 0}
          />
          <input className='App-button' onClick={onCancelButtonClick} type={'submit'} value={'Cancel'} />
        </div>
      </div>
    </Modal>
  )
}

export default ArticleSubmitModal
