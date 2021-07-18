import { useState, useEffect, useContext } from 'react'
import { Subscription } from 'rxjs'

import { IMaterialDataService } from 'services/materialData'
import { onEmit } from 'facades/helpers'

export const useInputDataProvider = (path: string, isArray?: boolean) => {
  const serviceInstance = useContext<IMaterialDataService>(FormDataContext)

  const [value, setValueState] = useState(serviceInstance && serviceInstance.getValueFor(path))

  const setValue = (newValue: any) => {
    serviceInstance.addField(path, newValue, isArray)
  }

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<any>(serviceInstance.getSubjectFor(path), (v) => {
        setValueState(v)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { value, setValue }
}

export const useArrayItemValueInputDataProvider = (
  pathToArray: string,
  pathToValue: string,
  index: number,
  isArray?: boolean,
) => {
  const serviceInstance = useContext<IMaterialDataService>(FormDataContext)

  const [value, setValueState] = useState(
    serviceInstance && serviceInstance.getArrayItemValueFor(pathToArray, pathToValue, index),
  )

  const setValue = (newValue: any) => {
    serviceInstance.addFieldToArrayItem(pathToArray, pathToValue, newValue, index, isArray)
  }

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<any>(serviceInstance.getArrayItemValueSubjectFor(pathToArray, pathToValue, index), (v) => {
        setValueState(v)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { value, setValue }
}

export const useArrayItemInputDataProvider = (pathToArray: string, index: number) => {
  const serviceInstance = useContext<IMaterialDataService>(FormDataContext)

  const setValue = (newValue: any) => {
    serviceInstance.addArrayItem(pathToArray, index, newValue)
  }

  return { setValue }
}

export const useArrayInputDataProvider = (pathToArray: string) => {
  const serviceInstance = useContext<IMaterialDataService>(FormDataContext)

  const [array, setArray] = useState<any[]>(serviceInstance && serviceInstance.getValueFor(pathToArray))

  const addItem = (index: number, item?: any) => {
    serviceInstance.addArrayItem(pathToArray, index, item)
  }

  const removeItem = (index: number) => {
    serviceInstance.removeArrayItem(pathToArray, index)
  }

  useEffect(() => {
    const subscriptions: Subscription[] = [
      onEmit<any[]>(serviceInstance.getSubjectFor(pathToArray), (v) => {
        setArray([...v])
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { array, addItem, removeItem }
}
