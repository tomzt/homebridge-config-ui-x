import { NgModule } from '@angular/core'

import { AccessoriesCoreModule } from '@/app/core/accessories/accessories.module'
import { AccessoriesRoutingModule } from '@/app/modules/accessories/accessories-routing.module'

@NgModule({
  imports: [
    AccessoriesCoreModule,
    AccessoriesRoutingModule,
  ],
})
export class AccessoriesModule {}
