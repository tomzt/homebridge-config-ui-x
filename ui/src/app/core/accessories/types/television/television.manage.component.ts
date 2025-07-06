import { NgClass } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'

@Component({
  templateUrl: './television.manage.component.html',
  standalone: true,
  imports: [
    FormsModule,
    TranslatePipe,
    NgClass,
  ],
})
export class TelevisionManageComponent implements OnInit {
  $activeModal = inject(NgbActiveModal)

  @Input() public service: ServiceTypeX
  @Input() public inputList: Record<number, string>

  public hasActive: boolean = false
  public sourceList: { identifier: number, name: string }[] = []

  constructor() {}

  ngOnInit() {
    if (this.service.serviceCharacteristics.find(c => c.type === 'Active')) {
      this.hasActive = true
    }

    if (Object.keys(this.inputList).length) {
      Object.entries(this.inputList).forEach(([identifier, name]) => {
        this.sourceList.push({
          identifier: Number.parseInt(identifier, 10),
          name,
        })
      })
    }
  }

  setActive(value: number) {
    this.service.getCharacteristic('Active').setValue(value)
  }

  setInput(value: number | string) {
    this.service.getCharacteristic('ActiveIdentifier').setValue(value)
  }
}
