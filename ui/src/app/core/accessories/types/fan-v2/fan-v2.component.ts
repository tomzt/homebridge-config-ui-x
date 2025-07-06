import { NgClass } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { FanV2ManageComponent } from '@/app/core/accessories/types/fan-v2/fan-v2.manage.component'
import { LongClickDirective } from '@/app/core/directives/long-click.directive'

@Component({
  selector: 'app-fan-v2',
  templateUrl: './fan-v2.component.html',
  standalone: true,
  imports: [
    LongClickDirective,
    NgClass,
    TranslatePipe,
  ],
})
export class FanV2Component implements OnInit {
  private $modal = inject(NgbModal)

  @Input() public service: ServiceTypeX

  public rotationSpeedUnit = ''
  public hasRotationDirection = false

  public ngOnInit() {
    // Find the unit for the rotation speed
    const RotationSpeed = this.service.serviceCharacteristics.find(c => c.type === 'RotationSpeed')
    if (RotationSpeed && RotationSpeed.unit === 'percentage') {
      this.rotationSpeedUnit = '%'
    }
    if (this.service.serviceCharacteristics.find(c => c.type === 'RotationDirection')) {
      this.hasRotationDirection = true
    }
  }

  public onClick() {
    this.service.getCharacteristic('Active').setValue(this.service.values.Active ? 0 : 1)

    // Set the rotation speed to max if on 0% when turned on
    if (!this.service.values.On && 'RotationSpeed' in this.service.values && !this.service.values.RotationSpeed) {
      const RotationSpeed = this.service.getCharacteristic('RotationSpeed')
      RotationSpeed.setValue(RotationSpeed.maxValue)
    }
  }

  public onLongClick() {
    const ref = this.$modal.open(FanV2ManageComponent, {
      size: 'md',
      backdrop: 'static',
    })
    ref.componentInstance.service = this.service
  }
}
