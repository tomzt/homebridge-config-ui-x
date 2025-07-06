import { NgModule } from '@angular/core'
import { Bootstrap5FrameworkModule } from '@ng-formworks/bootstrap5'
import { NgxMdModule } from 'ngx-md'

import { CustomPluginsService } from '@/app/core/manage-plugins/custom-plugins/custom-plugins.service'

@NgModule({
  imports: [
    Bootstrap5FrameworkModule,
    NgxMdModule,
  ],
  providers: [
    CustomPluginsService,
  ],
})
export class CustomPluginsModule {}
