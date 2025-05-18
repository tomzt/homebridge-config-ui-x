import { NgClass } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { NouisliderComponent } from 'ng2-nouislider'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { DurationPipe } from '@/app/core/pipes/duration.pipe'

@Component({
  selector: 'app-lockmechanism-manage',
  templateUrl: './lockmechanism.manage.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NouisliderComponent,
    TranslatePipe,
    DurationPipe,
    NgClass,
  ],
})
export class LockmechanismManageComponent implements OnInit {
  $activeModal = inject(NgbActiveModal)

  @Input() public service: ServiceTypeX
  public serviceManagement: any
  public targetMode: any
  public targetLockManagementAutoSecurityTimeout: any
  public targetLockManagementAutoSecurityTimeoutChanged: Subject<string> = new Subject<string>()

  private lockTimeout: any

  constructor() {}

  ngOnInit() {
    this.targetMode = this.service.values.LockTargetState

    if (this.service.linkedServices) {
      this.serviceManagement = Object.values(this.service.linkedServices).find(service => service.type === 'LockManagement')
    }

    if (this.serviceManagement) {
      this.targetLockManagementAutoSecurityTimeoutChanged
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
        )
        .subscribe(() => {
          this.serviceManagement.getCharacteristic('LockManagementAutoSecurityTimeout').setValue(this.targetLockManagementAutoSecurityTimeout.value)
        })

      this.loadTargetLockManagementAutoSecurityTimeout()
    }
  }

  setTargetMode(value: number) {
    this.targetMode = value
    this.service.getCharacteristic('LockTargetState').setValue(this.targetMode)

    // Clear the existing timeout if it exists
    if (this.lockTimeout) {
      clearTimeout(this.lockTimeout)
      this.lockTimeout = null
    }

    // If the target mode is 0 (unlocked), and there is a targetLockManagementAutoSecurityTimeout.value, set a new timeout
    if (this.targetMode === 0 && this.targetLockManagementAutoSecurityTimeout?.value > 0) {
      this.lockTimeout = setTimeout(() => {
        this.targetMode = 1
      }, (this.targetLockManagementAutoSecurityTimeout.value + 0.3) * 1000)
    }
  }

  loadTargetLockManagementAutoSecurityTimeout() {
    const TargetLockManagementAutoSecurityTimeout = this.serviceManagement.getCharacteristic('LockManagementAutoSecurityTimeout')
    if (TargetLockManagementAutoSecurityTimeout) {
      this.targetLockManagementAutoSecurityTimeout = {
        value: TargetLockManagementAutoSecurityTimeout.value || 0,
        min: TargetLockManagementAutoSecurityTimeout.minValue || 0,
        max: TargetLockManagementAutoSecurityTimeout.maxValue || 3600,
        step: TargetLockManagementAutoSecurityTimeout.minStep || 10,
      }
    }
  }

  onLockManagementAutoSecurityTimeoutStateChange() {
    this.targetLockManagementAutoSecurityTimeoutChanged.next(this.targetLockManagementAutoSecurityTimeout.value)
  }
}
