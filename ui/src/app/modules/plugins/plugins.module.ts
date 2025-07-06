import { NgModule } from '@angular/core'

import { ManagePluginsModule } from '@/app/core/manage-plugins/manage-plugins.module'
import { PluginsRoutingModule } from '@/app/modules/plugins/plugins-routing.module'

@NgModule({
  imports: [
    ManagePluginsModule,
    PluginsRoutingModule,
  ],
})
export class PluginsModule {}
