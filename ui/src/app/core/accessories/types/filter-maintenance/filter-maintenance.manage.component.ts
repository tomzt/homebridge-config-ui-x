import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { NouisliderComponent } from 'ng2-nouislider'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'

@Component({
  templateUrl: './filter-maintenance.manage.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NouisliderComponent,
    TranslatePipe,
  ],
})
export class FilterMaintenanceManageComponent implements OnInit {
  $activeModal = inject(NgbActiveModal)

  @Input() public service: ServiceTypeX

  public targetMode: number

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      const sliderElements = document.querySelectorAll('.noUi-target')
      sliderElements.forEach((sliderElement: HTMLElement) => {
        sliderElement.style.background = 'linear-gradient(to right, #8B4513, #4169E1)'
      })
    }, 10)
  }

  resetFilterLife() {
    this.service.getCharacteristic('ResetFilterIndication').setValue(1)
  }
}
