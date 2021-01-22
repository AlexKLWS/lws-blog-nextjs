import 'reflect-metadata'
import { Container, interfaces, ContainerModule } from 'inversify'
import { SessionService, SessionServiceId, ISessionService } from './session'
import { MaterailClientService, MaterialClientServiceId, IMaterialClientService } from './materialClient'
import { FileUploadService, IFileUploadService, FileUploadServiceId } from './fileUpload'
import {
  IMaterialPreviewFetchService,
  MaterialPreviewFetchServiceId,
  MaterailPreviewFetchService,
} from './materialPreviewsFetch'
import { IMaterialDataService, MaterialDataServiceId, MaterialDataService } from './materialData'
import { Material } from 'types/materials'

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ISessionService>(SessionServiceId).to(SessionService).inSingletonScope()
  bind<IMaterialClientService<Material>>(MaterialClientServiceId).to(MaterailClientService)
  bind<IFileUploadService>(FileUploadServiceId).to(FileUploadService)
  bind<IMaterialPreviewFetchService>(MaterialPreviewFetchServiceId).to(MaterailPreviewFetchService)
  bind<IMaterialDataService>(MaterialDataServiceId).toConstructor(MaterialDataService)
})

export const container = new Container()
