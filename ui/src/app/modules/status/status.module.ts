import { NgModule } from '@angular/core'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts'

import { AccessoriesCoreModule } from '@/app/core/accessories/accessories.module'
import { ManagePluginsModule } from '@/app/core/manage-plugins/manage-plugins.module'

@NgModule({
  imports: [
    AccessoriesCoreModule,
    ManagePluginsModule,
  ],
  providers: [
    provideCharts(withDefaultRegisterables()),
  ],
})
export class StatusModule {}
