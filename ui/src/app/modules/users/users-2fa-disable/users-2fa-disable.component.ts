import { Component, inject } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgbActiveModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'

import { ApiService } from '@/app/core/api.service'

@Component({
  templateUrl: './users-2fa-disable.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    NgbAlert,
  ],
})
export class Users2faDisableComponent {
  private $activeModal = inject(NgbActiveModal)
  private $api = inject(ApiService)
  private $toastr = inject(ToastrService)
  private $translate = inject(TranslateService)

  public invalidCredentials = false
  public formGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
  })

  public disable2fa() {
    this.invalidCredentials = false
    this.$api.post('/users/otp/deactivate', this.formGroup.value).subscribe({
      next: () => {
        this.$activeModal.close()
        this.$toastr.success(this.$translate.instant('users.setup_2fa_disable_success'), this.$translate.instant('toast.title_success'))
      },
      error: () => {
        this.formGroup.setValue({ password: '' })
        this.invalidCredentials = true
      },
    })
  }

  public dismissModal() {
    this.$activeModal.dismiss('Dismiss')
  }
}
