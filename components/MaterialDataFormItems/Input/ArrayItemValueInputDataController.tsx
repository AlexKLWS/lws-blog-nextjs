import React from 'react'

import { useArrayItemValueFormInputProvider } from 'facades/FormData/formInputFacade'

type Props = {
  pathToArray: string
  pathToValue: string
  index: number
  isArray?: boolean
  render: ({ value, setValue }: { value: any; setValue: (newValue: any) => void }) => JSX.Element
}

const ArrayItemValueInputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useArrayItemValueFormInputProvider(
    props.pathToArray,
    props.pathToValue,
    props.index,
    props.isArray,
  )

  return <>{props.render(dataUpdater)}</>
}

export default ArrayItemValueInputDataController
