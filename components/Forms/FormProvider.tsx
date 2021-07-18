import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import React from 'react'

import { IMaterialDataService } from 'services/materialData'
import { EditorError, MaterialDataObjectVerifier } from 'types/verifier'

export const FormDataContext = React.createContext<IMaterialDataService | null>(null)

type Props = {
  verifier: MaterialDataObjectVerifier
  validate?: (errors: EditorError[]) => void
  onSubmit?: (currentValue: any) => void
  defaultData?: any
}

export const FormDataProvider: React.FC<Props> = (props) => {
  const { service } = useMaterialDataServiceProvider(props.verifier, props.defaultData)

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
      return React.cloneElement(child, { onSubmit: onSubmitWrapped, validateWrapped: validateWrapped })
    }
    return child
  })

  return <FormDataContext.Provider value={service}>{childrenWithProps}</FormDataContext.Provider>
}
