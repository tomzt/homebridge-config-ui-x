import { Component, inject } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  templateUrl: './credits.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class CreditsComponent {
  private $activeModal = inject(NgbActiveModal)

  public dismissModal() {
    this.$activeModal.dismiss('Dismiss')
  }
}
