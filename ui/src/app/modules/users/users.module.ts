import { NgModule } from '@angular/core'

import { UsersRoutingModule } from '@/app/modules/users/users-routing.module'
import { UsersResolver } from '@/app/modules/users/users.resolver'

@NgModule({
  imports: [
    UsersRoutingModule,
  ],
  providers: [
    UsersResolver,
  ],
})
export class UsersModule {}
