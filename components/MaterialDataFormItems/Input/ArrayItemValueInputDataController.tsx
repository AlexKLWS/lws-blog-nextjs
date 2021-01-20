import React from 'react'

import { IMaterialDataService } from 'services/materialData'
import { useArrayItemValueInputDataProvider } from 'facades/MaterialData/inputDataFacade'

type Props = {
  serviceInstance: IMaterialDataService
  pathToArray: string
  pathToValue: string
  index: number
  isArray?: boolean
  render: ({ value, setValue }: { value: any; setValue: (newValue: any) => void }) => JSX.Element
}

const ArrayItemValueInputDataController: React.FC<Props> = (props: Props) => {
  const dataUpdater = useArrayItemValueInputDataProvider(
    props.serviceInstance,
    props.pathToArray,
    props.pathToValue,
    props.index,
    props.isArray,
  )

  return <>{props.render(dataUpdater)}</>
}

export default ArrayItemValueInputDataController
