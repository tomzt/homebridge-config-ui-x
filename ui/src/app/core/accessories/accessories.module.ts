import { NgModule } from '@angular/core'
import { NgxMdModule } from 'ngx-md'

import { AccessoriesService } from '@/app/core/accessories/accessories.service'

@NgModule({
  imports: [
    NgxMdModule,
  ],
  providers: [
    AccessoriesService,
  ],
})
export class AccessoriesCoreModule {}
