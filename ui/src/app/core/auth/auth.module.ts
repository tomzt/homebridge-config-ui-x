import { NgModule } from '@angular/core'
import { JwtModule } from '@auth0/angular-jwt'

import { AdminGuard } from '@/app/core/auth/admin.guard'
import { AuthGuard } from '@/app/core/auth/auth.guard'
import { AuthService } from '@/app/core/auth/auth.service'
import { environment } from '@/environments/environment'

const tokenGetter = () => localStorage.getItem(environment.jwt.tokenKey)

@NgModule({
  imports: [
    JwtModule.forRoot({
      config: {
        authScheme: 'bearer ',
        tokenGetter,
        skipWhenExpired: false,
        allowedDomains: environment.jwt.allowedDomains,
        disallowedRoutes: environment.jwt.disallowedRoutes,
      },
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
  ],
  exports: [],
})
class AuthModule {}

// Token getter
export { AuthModule, tokenGetter }
