import { Component, inject, OnInit } from '@angular/core'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'

import { ApiService } from '@/app/core/api.service'

@Component({
  templateUrl: './shutdown-linux.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class ShutdownLinuxComponent implements OnInit {
  private $api = inject(ApiService)
  private $toastr = inject(ToastrService)
  private $translate = inject(TranslateService)

  public error: any = false

  public ngOnInit() {
    this.$api.put('/platform-tools/linux/shutdown-host', {}).subscribe({
      error: (error) => {
        console.error(error)
        this.error = this.$translate.instant('platform.linux.server_restart_error')
        this.$toastr.error(this.$translate.instant('platform.linux.server_restart_error'), this.$translate.instant('toast.title_error'))
      },
    })
  }
}
