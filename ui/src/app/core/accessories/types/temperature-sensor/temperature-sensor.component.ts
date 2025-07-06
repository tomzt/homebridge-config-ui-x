import { DecimalPipe, UpperCasePipe } from '@angular/common'
import { Component, inject, Input } from '@angular/core'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { ConvertTempPipe } from '@/app/core/pipes/convert-temp.pipe'
import { SettingsService } from '@/app/core/settings.service'

@Component({
  selector: 'app-temperature-sensor',
  templateUrl: './temperature-sensor.component.html',
  styleUrls: ['./temperature-sensor.component.scss'],
  standalone: true,
  imports: [DecimalPipe, ConvertTempPipe, UpperCasePipe],
})
export class TemperatureSensorComponent {
  $settings = inject(SettingsService)

  @Input() public service: ServiceTypeX

  constructor() {}
}
