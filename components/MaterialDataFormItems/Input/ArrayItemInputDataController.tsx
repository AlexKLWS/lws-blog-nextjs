import React from 'react'

import { useArrayItemInputDataProvider } from 'facades/MaterialData/inputDataFacade'

type Props = {
  pathToArray: string
  index: number
  render: ({ setValue }: { setValue: (newValue: any) => void }) => JSX.Element
}

const ArrayItemInputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useArrayItemInputDataProvider(props.pathToArray, props.index)

  return props.render(dataUpdater)
}

export default ArrayItemInputDataController
