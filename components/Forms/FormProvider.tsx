import { useFormDataServiceProvider } from 'facades/FormData/formDataServiceFacade'
import React from 'react'

import { IFormDataService } from 'services/formData'
import { EditorError, FormDataObjectVerifier } from 'types/verifier'

export const FormDataContext = React.createContext<IFormDataService | null>(null)

type Props = {
  verifier: FormDataObjectVerifier
  validate?: (errors: EditorError[]) => void
  onSubmit?: (currentValue: any) => void
  defaultData?: any
}

export const FormDataProvider: React.FC<Props> = (props) => {
  const { service } = useFormDataServiceProvider(props.verifier, props.defaultData)

  const onSubmitWrapped = () => {
    if (!props.onSubmit) {
      return
    }
    const currentData = service.currentData
    props.onSubmit(currentData)
  }

  const validateWrapped = () => {
    if (!props.validate) {
      return
    }
    const errors = service.verifyData()
    props.validate(errors)
  }

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onSubmit: onSubmitWrapped, validate: validateWrapped })
    }
    return child
  })

  return <FormDataContext.Provider value={service}>{childrenWithProps}</FormDataContext.Provider>
}
