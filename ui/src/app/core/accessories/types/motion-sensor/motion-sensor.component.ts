import { NgClass } from '@angular/common'
import { Component, Input } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { InlineSVGModule } from 'ng-inline-svg-2'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'

@Component({
  selector: 'app-motion-sensor',
  templateUrl: './motion-sensor.component.html',
  styleUrls: ['./motion-sensor.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    InlineSVGModule,
    TranslatePipe,
  ],
})
export class MotionSensorComponent {
  @Input() public service: ServiceTypeX

  constructor() {}
}
