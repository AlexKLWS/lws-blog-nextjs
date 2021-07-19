import React from 'react'

import { useFormInputProvider } from 'facades/FormData/formInputFacade'

type Props = {
  path: string
  isArray?: boolean
  render: ({ value, setValue }: { value: any; setValue: (newValue: any) => void }) => JSX.Element
}

const InputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useFormInputProvider(props.path, props.isArray)

  return <>{props.render(dataUpdater)}</>
}

export default InputDataController
