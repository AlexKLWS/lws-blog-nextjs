import React from 'react'
import Modal from 'react-modal'

import styles from './SubmitModal.module.scss'
import { EditorError } from 'types/verifier'

interface Props {
  modalIsOpen: boolean
  validationErrors: EditorError[]
  isLoading: boolean
  postWasSuccess: boolean
  postError: Error | null
  onSubmit: () => void
  setModalIsOpen: (value: boolean) => void
}

const SubmitModal: React.FC<Props> = (props: Props) => {
  const closeModal = () => {
    props.setModalIsOpen(false)
  }

  const renderSuccessfulPostModal = () => {
    return (
      <div className={styles.ArticleSubmitModalContentContainer}>
        <h2 className={styles.ArticleSubmitModalTitle}>Material has been submitted successfully!</h2>
        <div className={styles.ArticleSubmitModalButtonContainer}>
          <input className='App-button' onClick={closeModal} type={'submit'} value={'Ok'} />
        </div>
      </div>
    )
  }

  const renderValidationErrorsModal = () => {
    return (
      <div className={styles.ArticleSubmitModalContentContainer}>
        <h2 className={styles.ArticleSubmitModalTitle}>Can't submit this material!</h2>
        <ul className={styles.ArticleSubmitModalErrorsList}>
          {props.validationErrors
            ? props.validationErrors.map((item) => {
                return (
                  <li key={item.id} className={styles.ArticleSubmitModalErrorItem}>
                    {item.description}
                  </li>
                )
              })
            : null}
        </ul>
        <div className={styles.ArticleSubmitModalButtonContainer}>
          <input className='App-button' onClick={closeModal} type={'submit'} value={'Ok'} />
        </div>
      </div>
    )
  }

  const renderSubmitModal = () => {
    return (
      <div className={styles.ArticleSubmitModalContentContainer}>
        <h2 className={styles.ArticleSubmitModalTitle}>Are you ready to submit the material?</h2>
        {props.postError && <p className={styles.SubmitModalPostError}>An error happened while submitting the data!</p>}
        <div className={styles.ArticleSubmitModalButtonContainer}>
          {props.isLoading ? (
            <p className={styles.ArticleSubmitModalTitle}>Submitting...</p>
          ) : (
            <>
              <input
                className={
                  props.validationErrors && props.validationErrors.length > 0 ? 'App-button inactive' : 'App-button'
                }
                onClick={props.onSubmit}
                type={'submit'}
                value={'Submit'}
                disabled={props.validationErrors && props.validationErrors.length > 0}
              />
              <input className='App-button' onClick={closeModal} type={'submit'} value={'Cancel'} />
            </>
          )}
        </div>
      </div>
    )
  }

  const renderModalContents = () => {
    if (props.postWasSuccess) {
      return renderSuccessfulPostModal()
    }

    if (props.validationErrors.length > 0) {
      return renderValidationErrorsModal()
    }

    return renderSubmitModal()
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.modalIsOpen}
      contentLabel='Submit Modal'
      className={styles.ArticleSubmitModalModal}
      overlayClassName={styles.ArticleSubmitModalModalOverlay}
    >
      {renderModalContents()}
    </Modal>
  )
}

export default SubmitModal
