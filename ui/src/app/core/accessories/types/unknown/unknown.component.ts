import { Component, Input } from '@angular/core'
import { InlineSVGModule } from 'ng-inline-svg-2'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  standalone: true,
  imports: [InlineSVGModule],
})
export class UnknownComponent {
  @Input() public service: ServiceTypeX
}
