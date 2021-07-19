import { useState, useEffect, useContext } from 'react'

import { IFormDataService } from 'services/formData'
import { onEmit } from 'helpers/onEmit'
import { FormDataContext } from 'components/Forms/FormProvider'

export const useFormInputProvider = (path: string, isArray?: boolean) => {
  const serviceInstance = useContext<IFormDataService | null>(FormDataContext)

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

export const useArrayItemValueFormInputProvider = (
  pathToArray: string,
  pathToValue: string,
  index: number,
  isArray?: boolean,
) => {
  const serviceInstance = useContext<IFormDataService | null>(FormDataContext)

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

export const useArrayItemFormInputProvider = (pathToArray: string, index: number) => {
  const serviceInstance = useContext<IFormDataService | null>(FormDataContext)

  const setValue = (newValue: any) => {
    serviceInstance!.addArrayItem(pathToArray, index, newValue)
  }

  return { setValue }
}

export const useArrayFormInputProvider = (pathToArray: string) => {
  const serviceInstance = useContext<IFormDataService | null>(FormDataContext)

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
