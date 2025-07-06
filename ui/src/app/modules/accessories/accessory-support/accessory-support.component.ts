import { Component, inject } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  templateUrl: './accessory-support.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class AccessorySupportComponent {
  private $activeModal = inject(NgbActiveModal)

  public dismissModal() {
    this.$activeModal.dismiss('Dismiss')
  }
}
