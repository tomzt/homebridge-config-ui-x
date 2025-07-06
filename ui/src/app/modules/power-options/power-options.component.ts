import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'

import { ApiService } from '@/app/core/api.service'
import { SettingsService } from '@/app/core/settings.service'

@Component({
  templateUrl: './power-options.component.html',
  standalone: true,
  imports: [
    NgbTooltip,
    TranslatePipe,
  ],
})
export class PowerOptionsComponent {
  private $api = inject(ApiService)
  private $router = inject(Router)
  private $settings = inject(SettingsService)
  private $toastr = inject(ToastrService)
  private $translate = inject(TranslateService)

  public canShutdownRestartHost = this.$settings.env.canShutdownRestartHost
  public runningInDocker = this.$settings.env.runningInDocker

  public restartHomebridge() {
    this.$router.navigate(['/restart'])
  }

  public restartHomebridgeService() {
    this.$api.put('/platform-tools/hb-service/set-full-service-restart-flag', {}).subscribe({
      next: () => {
        this.$router.navigate(['/restart'])
      },
      error: (error) => {
        console.error(error)
        this.$toastr.error(error.message, this.$translate.instant('toast.title_error'))
      },
    })
  }

  public restartServer() {
    this.$router.navigate(['/platform-tools/linux/restart-server'])
  }

  public shutdownServer() {
    this.$router.navigate(['/platform-tools/linux/shutdown-server'])
  }

  public dockerRestartContainer() {
    this.$router.navigate(['/platform-tools/docker/restart-container'])
  }
}
