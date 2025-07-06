import type { NetworkAdapterAvailable, NetworkAdapterSelected } from '@/app/modules/settings/settings.interfaces'

import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  templateUrl: './select-network-interfaces.component.html',
  standalone: true,
  imports: [
    FormsModule,
    TranslatePipe,
  ],
})
export class SelectNetworkInterfacesComponent implements OnInit {
  private $activeModal = inject(NgbActiveModal)

  @Input() adaptersAvailable: NetworkAdapterAvailable[] = []
  @Input() adaptersSelected: NetworkAdapterSelected[] = []

  private adaptersOriginal: string[] = []

  public isUnchanged = true

  constructor() {}

  ngOnInit() {
    // Set the `selected` property for each available adapter based on the selected adapters
    this.adaptersAvailable.forEach((adapter) => {
      adapter.selected = this.adaptersSelected.some(x => x.iface === adapter.iface)
    })

    this.adaptersOriginal = this.adaptersSelected.map(x => x.iface)
  }

  onAdapterSelectionChange() {
    this.isUnchanged = this.adaptersOriginal.length === this.adaptersAvailable.filter(x => x.selected).length
      && this.adaptersOriginal.every(original => this.adaptersAvailable.some(x => x.iface === original && x.selected))
  }

  submit() {
    this.$activeModal.close(
      this.adaptersAvailable.filter(x => x.selected).map(x => x.iface),
    )
  }

  closeAndReset() {
    // Reset the selected adapters to the original state
    this.adaptersAvailable.forEach((adapter) => {
      adapter.selected = this.adaptersOriginal.includes(adapter.iface)
    })
    this.isUnchanged = true
    this.$activeModal.dismiss('Dismiss')
  }
}
