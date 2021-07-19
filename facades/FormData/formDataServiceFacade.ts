import { useEffect, useRef } from 'react'

import { FormDataService } from 'services/formData'
import { FormDataObjectVerifier } from 'types/verifier'

export const useFormDataServiceProvider = (verifier: FormDataObjectVerifier, defaultData?: any) => {
  const service = useRef(new FormDataService(verifier, defaultData)).current

  useEffect(() => {
    service.updateData(defaultData)
  }, [defaultData])

  return { service }
}
