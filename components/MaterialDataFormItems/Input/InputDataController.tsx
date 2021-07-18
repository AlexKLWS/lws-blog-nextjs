import React from 'react'

import { useInputDataProvider } from 'facades/MaterialData/inputDataFacade'

type Props = {
  path: string
  isArray?: boolean
  render: ({ value, setValue }: { value: any; setValue: (newValue: any) => void }) => JSX.Element
}

const InputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useInputDataProvider(props.path, props.isArray)

  return <>{props.render(dataUpdater)}</>
}

export default InputDataController
