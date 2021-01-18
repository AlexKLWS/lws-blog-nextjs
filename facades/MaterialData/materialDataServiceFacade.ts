import { useRef } from 'react'
import { useInjection } from 'services/provider'
import { IMaterialDataService, MaterialDataServiceId } from 'services/materialData'
import { MaterialDataObjectVerifier } from 'types/verifier'

export const useMaterialDataServiceProvider = (verifier: MaterialDataObjectVerifier, defaultData?: any) => {
  const MaterialDataService = useInjection<IMaterialDataService>(MaterialDataServiceId) as any
  const service = useRef(new MaterialDataService(verifier, defaultData)).current

  return { service }
}
