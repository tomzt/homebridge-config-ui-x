import { NgOptimizedImage } from '@angular/common'
import { NgModule } from '@angular/core'

import { LoginGuard } from '@/app/modules/login/login.guard'

@NgModule({
  imports: [
    NgOptimizedImage,
  ],
  providers: [
    LoginGuard,
  ],
})
export class LoginModule {}
