import { Component, Input } from '@angular/core'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'

@Component({
  selector: 'app-humidity-sensor',
  templateUrl: './humidity-sensor.component.html',
  styleUrls: ['./humidity-sensor.component.scss'],
  standalone: true,
})
export class HumiditySensorComponent {
  @Input() public service: ServiceTypeX
}
