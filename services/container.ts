import 'reflect-metadata'
import { Container, interfaces, ContainerModule } from 'inversify'
import { SessionService, SessionServiceId, ISessionService } from './session'
import { MaterailClientService, MaterialClientServiceId, IMaterialClientService } from './materialClient'
import { Material } from 'types/materials'

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ISessionService>(SessionServiceId).to(SessionService).inSingletonScope()
  bind<IMaterialClientService<Material>>(MaterialClientServiceId).to(MaterailClientService)
})

export const container = new Container()
