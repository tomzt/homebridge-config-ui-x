import { Component, inject, Input } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { InlineSVGModule } from 'ng-inline-svg-2'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { MicrophoneManageComponent } from '@/app/core/accessories/types/microphone/microphone.manage.component'
import { LongClickDirective } from '@/app/core/directives/long-click.directive'

@Component({
  selector: 'app-microphone',
  templateUrl: './microphone.component.html',
  standalone: true,
  imports: [
    LongClickDirective,
    InlineSVGModule,
    TranslatePipe,
  ],
})
export class MicrophoneComponent {
  private $modal = inject(NgbModal)

  @Input() public service: ServiceTypeX
  @Input() public readyForControl = false

  public onClick() {
    if (!this.readyForControl) {
      return
    }

    if ('Mute' in this.service.values) {
      this.service.getCharacteristic('Mute').setValue(!this.service.values.Mute)
    }
  }

  public onLongClick() {
    if (!this.readyForControl) {
      return
    }

    if ('Volume' in this.service.values || 'Mute' in this.service.values) {
      const ref = this.$modal.open(MicrophoneManageComponent, {
        size: 'md',
        backdrop: 'static',
      })
      ref.componentInstance.service = this.service
    }
  }
}
