import { NgModule } from '@angular/core'
import { NgxMdModule } from 'ngx-md'

import { CustomPluginsModule } from '@/app/core/manage-plugins/custom-plugins/custom-plugins.module'
import { ManagePluginsService } from '@/app/core/manage-plugins/manage-plugins.service'

@NgModule({
  imports: [
    NgxMdModule,
    CustomPluginsModule,
  ],
  providers: [
    ManagePluginsService,
  ],
})
export class ManagePluginsModule {}
