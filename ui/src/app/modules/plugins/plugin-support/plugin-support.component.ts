import { Component, inject } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  templateUrl: './plugin-support.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class PluginSupportComponent {
  $activeModal = inject(NgbActiveModal)

  constructor() {}
}
