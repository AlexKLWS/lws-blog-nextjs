import React from 'react'

import { useArrayItemFormInputProvider } from 'facades/FormData/formInputFacade'

type Props = {
  pathToArray: string
  index: number
  render: ({ setValue }: { setValue: (newValue: any) => void }) => JSX.Element
}

const ArrayItemInputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useArrayItemFormInputProvider(props.pathToArray, props.index)

  return props.render(dataUpdater)
}

export default ArrayItemInputDataController
