import React from 'react'

import { IMaterialDataService } from 'services/materialData'
import { useArrayItemInputDataProvider } from 'facades/MaterialData/inputDataFacade'

type Props = {
  serviceInstance: IMaterialDataService
  pathToArray: string
  index: number
  render: ({ setValue }: { setValue: (newValue: any) => void }) => JSX.Element
}

const ArrayItemInputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useArrayItemInputDataProvider(props.serviceInstance, props.pathToArray, props.index)

  return props.render(dataUpdater)
}

export default ArrayItemInputDataController
