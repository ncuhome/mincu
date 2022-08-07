import mincuCore, { MincuCoreBase } from 'mincu-core'
import dataModule, { DataModule } from 'mincu-data'
import eventModule, { EventModule } from 'mincu-event'
import networkModule, { NetWorkModule } from 'mincu-network'
import uiModule, { UIModule } from 'mincu-ui'

export { mincuCore, dataModule, eventModule, networkModule, uiModule }
export type {
  States,
  INativeFuncs,
  ShareConfig,
  NavConfig,
  AppData,
  EdgeInsets,
  ColorSchemeName,
} from 'mincu-core'

interface Mincu
  extends MincuCoreBase,
    DataModule,
    EventModule,
    NetWorkModule,
    UIModule {}

export const mincu = Object.assign(
  {},
  eventModule,
  dataModule,
  uiModule,
  networkModule,
  mincuCore
) as Mincu
