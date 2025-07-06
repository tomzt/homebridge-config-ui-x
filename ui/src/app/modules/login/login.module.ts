import { NgModule } from '@angular/core'

import { LoginGuard } from '@/app/modules/login/login.guard'

@NgModule({
  providers: [
    LoginGuard,
  ],
})
export class LoginModule {}
