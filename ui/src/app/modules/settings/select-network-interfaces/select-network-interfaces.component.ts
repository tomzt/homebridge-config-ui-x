import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

interface NetworkAdapterAvailable {
  carrierChanges?: number
  default?: boolean
  dhcp?: boolean
  dnsSuffix?: string
  duplex?: string
  ieee8021xAuth?: string
  ieee8021xState?: string
  iface: string
  ifaceName: string
  internal: boolean
  ip4: string
  ip4subnet: string
  ip6: string
  ip6subnet: string
  mac: string
  mtu: number
  missing?: boolean
  operstate: string
  selected?: boolean
  speed: number
  type: string
  virtual?: boolean
}

interface NetworkAdapterSelected {
  iface: string
  ip4: string
  ip6: string
  missing: boolean
  selected: boolean
}

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
