import { DecimalPipe, NgClass, UpperCasePipe } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { NouisliderComponent } from 'ng2-nouislider'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { ConvertTempPipe } from '@/app/core/pipes/convert-temp.pipe'
import { SettingsService } from '@/app/core/settings.service'

@Component({
  selector: 'app-thermostat-manage',
  templateUrl: './thermostat.manage.component.html',
  styleUrls: ['./thermostat.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NouisliderComponent,
    DecimalPipe,
    TranslatePipe,
    ConvertTempPipe,
    UpperCasePipe,
  ],
})
export class ThermostatManageComponent implements OnInit {
  $activeModal = inject(NgbActiveModal)
  $settings = inject(SettingsService)

  @Input() public service: ServiceTypeX
  public targetMode: number
  public targetTemperature: any
  public targetTemperatureChanged: Subject<string> = new Subject<string>()

  constructor() {
    this.targetTemperatureChanged
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.service.getCharacteristic('TargetTemperature').setValue(this.targetTemperature.value)
      })
  }

  ngOnInit() {
    this.targetMode = this.service.values.TargetHeatingCoolingState
    this.loadTargetTemperature()
    setTimeout(() => {
      const sliderElements = document.querySelectorAll('.noUi-target')
      sliderElements.forEach((sliderElement: HTMLElement) => {
        sliderElement.style.background = 'linear-gradient(to right, rgb(80, 80, 179), rgb(173, 216, 230), rgb(255, 185, 120), rgb(139, 90, 60))'
      })
    }, 10)
  }

  loadTargetTemperature() {
    const TargetTemperature = this.service.getCharacteristic('TargetTemperature')

    this.targetTemperature = {
      value: TargetTemperature.value,
      min: TargetTemperature.minValue,
      max: TargetTemperature.maxValue,
      step: TargetTemperature.minStep,
    }
  }

  setTargetMode(value: number) {
    this.targetMode = value
    this.service.getCharacteristic('TargetHeatingCoolingState').setValue(this.targetMode)
  }

  onTemperatureStateChange() {
    this.targetTemperatureChanged.next(this.targetTemperature.value)
  }
}
