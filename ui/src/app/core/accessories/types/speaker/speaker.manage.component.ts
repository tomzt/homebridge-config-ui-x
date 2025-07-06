import { NgClass } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { NouisliderComponent } from 'ng2-nouislider'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'

@Component({
  templateUrl: './speaker.manage.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NouisliderComponent,
    TranslatePipe,
    NgClass,
  ],
})
export class SpeakerManageComponent implements OnInit {
  $activeModal = inject(NgbActiveModal)

  @Input() public service: ServiceTypeX

  public targetMode: any
  public targetVolume: any
  public targetVolumeChanged: Subject<string> = new Subject<string>()
  public hasActive: any

  constructor() {
    this.targetVolumeChanged
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.service.getCharacteristic('Volume').setValue(this.targetVolume.value)
      })
  }

  ngOnInit() {
    this.targetMode = this.service.values.Mute
    this.loadTargetVolume()
    if (this.service.serviceCharacteristics.find(c => c.type === 'Active')) {
      this.hasActive = true
    }
  }

  loadTargetVolume() {
    const TargetVolume = this.service.getCharacteristic('Volume')
    if (TargetVolume) {
      this.targetVolume = {
        value: TargetVolume.value,
        min: TargetVolume.minValue,
        max: TargetVolume.maxValue,
        step: TargetVolume.minStep,
      }
      setTimeout(() => {
        const sliderElements = document.querySelectorAll('.noUi-target')
        sliderElements.forEach((sliderElement: HTMLElement) => {
          sliderElement.style.background = 'linear-gradient(to right, #ffffff, #ffd966, #ff0000)'
        })
      }, 10)
    }
  }

  setTargetMode(value: boolean) {
    this.targetMode = value
    this.service.getCharacteristic('Mute').setValue(this.targetMode)
  }

  setActive(value: number) {
    this.service.getCharacteristic('Active').setValue(value)
  }

  onVolumeStateChange() {
    this.targetVolumeChanged.next(this.targetVolume.value)
  }
}
