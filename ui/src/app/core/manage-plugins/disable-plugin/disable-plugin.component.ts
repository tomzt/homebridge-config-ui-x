import { Component, inject, Input } from '@angular/core'
import { NgbActiveModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  templateUrl: './disable-plugin.component.html',
  standalone: true,
  imports: [
    NgbAlert,
    TranslatePipe,
  ],
})
export class DisablePluginComponent {
  private $activeModal = inject(NgbActiveModal)

  @Input() pluginName: string
  @Input() isConfigured = false
  @Input() isConfiguredDynamicPlatform = false

  public dismissModal() {
    this.$activeModal.dismiss('Dismiss')
  }

  public closeModal() {
    this.$activeModal.close()
  }
}
