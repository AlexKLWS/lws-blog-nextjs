import { useState, useEffect, useContext } from 'react'

import { IMaterialDataService } from 'services/materialData'
import { onEmit } from 'helpers/onEmit'
import { FormDataContext } from 'components/Forms/FormProvider'

export const useInputDataProvider = (path: string, isArray?: boolean) => {
  const serviceInstance = useContext<IMaterialDataService | null>(FormDataContext)

  const [value, setValueState] = useState(serviceInstance && serviceInstance.getValueFor(path))

  const setValue = (newValue: any) => {
    serviceInstance!.addField(path, newValue, isArray)
  }

  useEffect(() => {
    const unsibscribers = [
      onEmit<any>(serviceInstance!.getObservableFor(path), (v) => {
        setValueState(v)
      }),
    ]
    return () => {
      unsibscribers.forEach((it) => it())
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
  const serviceInstance = useContext<IMaterialDataService | null>(FormDataContext)

  const [value, setValueState] = useState(
    serviceInstance && serviceInstance.getArrayItemValueFor(pathToArray, pathToValue, index),
  )

  const setValue = (newValue: any) => {
    serviceInstance!.addFieldToArrayItem(pathToArray, pathToValue, newValue, index, isArray)
  }

  useEffect(() => {
    const unsibscribers = [
      onEmit<any>(serviceInstance!.getArrayItemValueObservableFor(pathToArray, pathToValue, index), (v) => {
        setValueState(v)
      }),
    ]
    return () => {
      unsibscribers.forEach((it) => it())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { value, setValue }
}

export const useArrayItemInputDataProvider = (pathToArray: string, index: number) => {
  const serviceInstance = useContext<IMaterialDataService | null>(FormDataContext)

  const setValue = (newValue: any) => {
    serviceInstance!.addArrayItem(pathToArray, index, newValue)
  }

  return { setValue }
}

export const useArrayInputDataProvider = (pathToArray: string) => {
  const serviceInstance = useContext<IMaterialDataService | null>(FormDataContext)

  const [array, setArray] = useState<any[]>(serviceInstance && serviceInstance.getValueFor(pathToArray))

  const addItem = (index: number, item?: any) => {
    serviceInstance!.addArrayItem(pathToArray, index, item)
  }

  const removeItem = (index: number) => {
    serviceInstance!.removeArrayItem(pathToArray, index)
  }

  useEffect(() => {
    const unsubscribers = [
      onEmit<any[]>(serviceInstance!.getObservableFor(pathToArray), (v) => {
        setArray([...v])
      }),
    ]
    return () => {
      unsubscribers.forEach((it) => it())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { array, addItem, removeItem }
}
