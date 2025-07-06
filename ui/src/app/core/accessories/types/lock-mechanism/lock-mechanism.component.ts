import { NgClass } from '@angular/common'
import { Component, inject, Input } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { InlineSVGModule } from 'ng-inline-svg-2'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { LockMechanismManageComponent } from '@/app/core/accessories/types/lock-mechanism/lock-mechanism.manage.component'
import { LongClickDirective } from '@/app/core/directives/longclick.directive'

@Component({
  selector: 'app-lock-mechanism',
  templateUrl: './lock-mechanism.component.html',
  standalone: true,
  imports: [
    LongClickDirective,
    NgClass,
    InlineSVGModule,
    TranslatePipe,
  ],
})
export class LockMechanismComponent {
  @Input() public service: ServiceTypeX

  private $modal = inject(NgbModal)

  constructor() {}

  onClick() {
    this.service.getCharacteristic('LockTargetState').setValue(this.service.values.LockTargetState ? 0 : 1)
  }

  onLongClick() {
    const ref = this.$modal.open(LockMechanismManageComponent, {
      size: 'md',
      backdrop: 'static',
    })
    ref.componentInstance.service = this.service
  }
}
