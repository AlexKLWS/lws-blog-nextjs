import React from 'react'

import { useArrayFormInputProvider } from 'facades/FormData/formInputFacade'
import ArrayItemInputDataController from './ArrayItemInputDataController'

type Props = {
  defaultItem?: any
  pathToArray: string
  minNumberOfElements?: number
  maxNumberOfElements?: number
  renderContentContainer: (props: ContentContainerProps) => JSX.Element
  renderItem: (props: ItemProps) => JSX.Element
}

export type ContentContainerProps = {
  onItemAddButtonPress: () => void
  itemsRenderList: JSX.Element[]
  maxNumberOfElements: number
}

export type ItemProps = {
  onItemRemoveButtonPress: () => void
  index: number
  value: any
  setValue: (newValue: any) => void
  minNumberOfElements: number
}

const ArrayInputDataController: React.FC<Props> = ({
  minNumberOfElements = 0,
  maxNumberOfElements = Number.POSITIVE_INFINITY,
  ...props
}: Props) => {
  const { array, addItem, removeItem } = useArrayFormInputProvider(props.pathToArray)

  const onItemAddButtonPress = () => {
    if (array.length < maxNumberOfElements) {
      addItem(array.length, props.defaultItem)
    }
  }

  const onItemRemoveButtonPress = (index: number) => {
    if (index >= minNumberOfElements) {
      removeItem(index)
    }
  }

  const itemsRenderList = () => {
    if (!array) {
      return []
    }
    return array.map((value: any, index: number) => {
      return (
        <ArrayItemInputDataController
          key={`${index}`}
          pathToArray={props.pathToArray}
          index={index}
          render={({ setValue }) =>
            props.renderItem({
              value,
              setValue,
              index,
              minNumberOfElements,
              onItemRemoveButtonPress: () => onItemRemoveButtonPress(index),
            })
          }
        />
      )
    })
  }

  return props.renderContentContainer({
    onItemAddButtonPress,
    maxNumberOfElements,
    itemsRenderList: itemsRenderList(),
  })
}

export default ArrayInputDataController
