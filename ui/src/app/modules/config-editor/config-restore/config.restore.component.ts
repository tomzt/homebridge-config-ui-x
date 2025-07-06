import { DatePipe } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'

import { ApiService } from '@/app/core/api.service'

@Component({
  templateUrl: './config.restore.component.html',
  standalone: true,
  imports: [
    DatePipe,
    TranslatePipe,
  ],
})
export class ConfigRestoreComponent implements OnInit {
  private $activeModal = inject(NgbActiveModal)
  private $api = inject(ApiService)
  private $toastr = inject(ToastrService)
  private $translate = inject(TranslateService)

  public loading = true
  public backupList: {
    id: string
    timestamp: string
    file: string
  }[] = []

  public ngOnInit() {
    this.$api.get('/config-editor/backups').subscribe({
      next: (data: any[]) => {
        this.loading = false
        this.backupList = data
      },
      error: (error) => {
        this.loading = false
        console.error(error)
        this.$toastr.error(error.error.message || error.message, this.$translate.instant('toast.title_error'))
      },
    })
  }

  public restore(backupId: any) {
    return this.$activeModal.close(backupId)
  }

  public deleteAllBackups() {
    return this.$api.delete('/config-editor/backups').subscribe({
      next: () => {
        this.$activeModal.dismiss()
        this.$toastr.success(this.$translate.instant('config.restore.toast_backups_deleted'), this.$translate.instant('toast.title_success'))
      },
      error: (error) => {
        console.error(error)
        this.$toastr.error(error.error.message || error.message, this.$translate.instant('toast.title_error'))
      },
    })
  }

  public dismissModal() {
    this.$activeModal.dismiss('Dismiss')
  }
}
