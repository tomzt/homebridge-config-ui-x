import { NgClass } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { NouisliderComponent } from 'ng2-nouislider'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'

@Component({
  selector: 'app-airpurifier-manage',
  templateUrl: './airpurifier.manage.component.html',
  styleUrls: ['./airpurifier.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NouisliderComponent,
    TranslatePipe,
    NgClass,
  ],
})
export class AirpurifierManageComponent implements OnInit {
  $activeModal = inject(NgbActiveModal)

  @Input() public service: ServiceTypeX

  public targetState: number
  public targetMode: number
  public targetModeValidValues: number[] = []
  public targetRotationSpeed: any
  public targetRotationSpeedChanged: Subject<string> = new Subject<string>()

  constructor() {
    this.targetRotationSpeedChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.service.getCharacteristic('RotationSpeed').setValue(this.targetRotationSpeed.value)

        // Turn the air purifier on or off when rotation speed is adjusted
        if (this.targetRotationSpeed.value && !this.service.values.Active) {
          this.targetState = 1
          this.service.getCharacteristic('Active').setValue(this.targetMode)
        } else if (!this.targetRotationSpeed.value && this.service.values.Active) {
          this.targetState = 0
          this.service.getCharacteristic('Active').setValue(this.targetMode)
        }
      })
  }

  ngOnInit() {
    this.targetState = this.service.values.Active
    this.targetMode = this.service.values.TargetAirPurifierState
    this.targetModeValidValues = this.service.getCharacteristic('TargetAirPurifierState').validValues as number[]
    this.loadRotationSpeed()
  }

  loadRotationSpeed() {
    const RotationSpeed = this.service.getCharacteristic('RotationSpeed')
    if (RotationSpeed) {
      this.targetRotationSpeed = {
        value: RotationSpeed.value,
        min: RotationSpeed.minValue,
        max: RotationSpeed.maxValue,
        step: RotationSpeed.minStep,
      }
      setTimeout(() => {
        const sliderElements = document.querySelectorAll('.noUi-target')
        sliderElements.forEach((sliderElement: HTMLElement) => {
          sliderElement.style.background = 'linear-gradient(to right, #add8e6, #416bdf)'
        })
      }, 10)
    }
  }

  setTargetState(value: number) {
    this.targetState = value
    this.service.getCharacteristic('Active').setValue(this.targetState)

    // Set the rotation speed to max if on 0% when turned on
    if (this.targetState && this.targetRotationSpeed && !this.targetRotationSpeed.value) {
      this.targetRotationSpeed.value = this.service.getCharacteristic('RotationSpeed').maxValue
    }
  }

  setTargetMode(value: number) {
    this.targetMode = value
    this.service.getCharacteristic('TargetAirPurifierState').setValue(this.targetMode)
  }

  onTargetRotationSpeedChange() {
    this.targetRotationSpeedChanged.next(this.targetRotationSpeed.value)
  }
}
