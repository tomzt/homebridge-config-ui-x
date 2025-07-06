import { NgClass } from '@angular/common'
import { Component, inject, Input } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { HumidifierDehumidifierManageComponent } from '@/app/core/accessories/types/humidifier-dehumidifier/humidifier-dehumidifier.manage.component'
import { LongClickDirective } from '@/app/core/directives/long-click.directive'

@Component({
  selector: 'app-humidifier-dehumidifier',
  templateUrl: './humidifier-dehumidifier.component.html',
  styleUrls: ['./humidifier-dehumidifier.component.scss'],
  standalone: true,
  imports: [
    LongClickDirective,
    NgClass,
    TranslatePipe,
  ],
})
export class HumidifierDehumidifierComponent {
  private $modal = inject(NgbModal)

  @Input() public service: ServiceTypeX

  public hasHumidifier: boolean = false
  public hasDehumidifier: boolean = false

  public ngOnInit() {
    this.hasHumidifier = !!this.service.getCharacteristic('RelativeHumidityHumidifierThreshold')
    this.hasDehumidifier = !!this.service.getCharacteristic('RelativeHumidityDehumidifierThreshold')
  }

  public onClick() {
    this.service.getCharacteristic('Active').setValue(this.service.values.Active ? 0 : 1)
  }

  public onLongClick() {
    const ref = this.$modal.open(HumidifierDehumidifierManageComponent, {
      size: 'md',
      backdrop: 'static',
    })
    ref.componentInstance.service = this.service
  }
}
