import { useEffect, useRef } from 'react'

import { MaterialDataService } from 'services/materialData'
import { MaterialDataObjectVerifier } from 'types/verifier'

export const useMaterialDataServiceProvider = (verifier: MaterialDataObjectVerifier, defaultData?: any) => {
  const service = useRef(new MaterialDataService(verifier, defaultData)).current

  useEffect(() => {
    service.updateData(defaultData)
  }, [defaultData])

  return { service }
}
