import { NgClass } from '@angular/common'
import { Component, inject, Input, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslatePipe } from '@ngx-translate/core'
import { NouisliderComponent } from 'ng2-nouislider'
import { BehaviorSubject, Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { ConvertMiredPipe } from '@/app/core/pipes/convert-mired.pipe'

@Component({
  templateUrl: './light-bulb.manage.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NouisliderComponent,
    TranslatePipe,
    NgClass,
    ConvertMiredPipe,
  ],
})
export class LightBulbManageComponent implements OnInit {
  $activeModal = inject(NgbActiveModal)

  @Input() public service: ServiceTypeX
  @Input() public isAdaptiveLightingEnabled$: BehaviorSubject<boolean>

  public targetMode: any
  public targetBrightness: any
  public targetBrightnessChanged: Subject<number> = new Subject<number>()
  public targetHue: any
  public targetHueChanged: Subject<number> = new Subject<number>()
  public targetSaturation: any
  public targetSaturationChanged: Subject<number> = new Subject<number>()
  public targetColorTemperature: any
  public targetColorTemperatureChanged: Subject<number> = new Subject<number>()
  public hasAdaptiveLighting: boolean = false
  public isAdaptiveLightingEnabled: boolean = false
  public sliderIndex: number = 0

  constructor() {
    this.targetBrightnessChanged
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.service.getCharacteristic('Brightness').setValue(this.targetBrightness.value)

        // Turn the bulb on or off when brightness is adjusted
        if (this.targetBrightness.value && !this.service.values.On) {
          this.targetMode = true
          this.service.getCharacteristic('On').setValue(this.targetMode)
        } else if (!this.targetBrightness.value && this.service.values.On) {
          this.targetMode = false
          this.service.getCharacteristic('On').setValue(this.targetMode)
        }
      })

    this.targetHueChanged
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.service.getCharacteristic('Hue').setValue(this.targetHue.value)
      })

    this.targetSaturationChanged
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.service.getCharacteristic('Saturation').setValue(this.targetSaturation.value)
      })

    this.targetColorTemperatureChanged
      .pipe(debounceTime(500))
      .subscribe((miredValue) => {
        this.service.getCharacteristic('ColorTemperature').setValue(miredValue)
      })
  }

  ngOnInit() {
    this.targetMode = this.service.values.On
    this.loadTargetBrightness()
    this.loadTargetHue()
    this.loadTargetSaturation()
    this.loadTargetColorTemperature()
  }

  loadTargetBrightness() {
    const TargetBrightness = this.service.getCharacteristic('Brightness')
    if (TargetBrightness) {
      this.targetBrightness = {
        value: TargetBrightness.value,
        min: TargetBrightness.minValue,
        max: TargetBrightness.maxValue,
        step: TargetBrightness.minStep,
      }
      setTimeout(() => {
        const sliderElement = document.querySelectorAll('.noUi-target')[this.sliderIndex] as HTMLElement
        if (sliderElement) {
          sliderElement.style.background = 'linear-gradient(to right, #242424, #ffd6aa)'
          this.sliderIndex += 1
        }
      }, 10)
    }
  }

  loadTargetHue() {
    const Hue = this.service.getCharacteristic('Hue')
    if (Hue) {
      this.targetHue = {
        value: this.service.getCharacteristic('Hue').value as number,
      }

      setTimeout(() => {
        const sliderElement = document.querySelectorAll('.noUi-target')[this.sliderIndex] as HTMLElement
        if (sliderElement) {
          sliderElement.style.background = `linear-gradient(to right,
            hsl(0, 100%, 50%),
            hsl(60, 100%, 50%),
            hsl(120, 100%, 50%),
            hsl(180, 100%, 50%),
            hsl(240, 100%, 50%),
            hsl(300, 100%, 50%),
            hsl(360, 100%, 50%))`
        }
        this.sliderIndex += 1
      }, 10)
    }
  }

  loadTargetSaturation() {
    const Saturation = this.service.getCharacteristic('Saturation')
    if (Saturation) {
      this.targetSaturation = {
        value: this.service.getCharacteristic('Saturation').value as number,
      }

      setTimeout(() => {
        const sliderElement = document.querySelectorAll('.noUi-target')[this.sliderIndex] as HTMLElement
        if (sliderElement) {
          const hue = this.targetHue.value || 0
          sliderElement.style.background = `linear-gradient(to right,
            hsl(${hue}, 0%, 50%),
            hsl(${hue}, 100%, 50%))`
        }
        this.sliderIndex += 1
      }, 10)
    }
  }

  loadTargetColorTemperature() {
    const TargetColorTemperature = this.service.getCharacteristic('ColorTemperature')
    if (TargetColorTemperature) {
      // Here, the min and max are switched because mired and kelvin are inversely related
      this.targetColorTemperature = {
        value: this.miredToKelvin(TargetColorTemperature.value as number),
        mired: TargetColorTemperature.value as number,
        min: this.miredToKelvin(TargetColorTemperature.maxValue),
        max: this.miredToKelvin(TargetColorTemperature.minValue),
        step: TargetColorTemperature.minStep,
      }

      setTimeout(() => {
        const sliderElement = document.querySelectorAll('.noUi-target')[this.sliderIndex] as HTMLElement
        if (sliderElement) {
          const minHsl = this.kelvinToHsl(this.targetColorTemperature.min)
          const maxHsl = this.kelvinToHsl(this.targetColorTemperature.max)
          sliderElement.style.background = `linear-gradient(to right, ${minHsl}, ${maxHsl})`
        }
      }, 10)

      if (this.isAdaptiveLightingEnabled$) {
        this.hasAdaptiveLighting = true
        this.isAdaptiveLightingEnabled$.subscribe((value) => {
          this.isAdaptiveLightingEnabled = value
        })
      }
    }
  }

  setTargetMode(value: boolean) {
    this.targetMode = value
    this.service.getCharacteristic('On').setValue(this.targetMode)

    // Set the brightness to 100% if on 0% when turned on
    if (this.targetMode && this.targetBrightness && !this.targetBrightness.value) {
      this.targetBrightness.value = this.service.getCharacteristic('Brightness').maxValue
    }
  }

  onBrightnessStateChange() {
    this.targetBrightnessChanged.next(this.targetBrightness.value)
  }

  onHueStateChange() {
    this.targetHueChanged.next(this.targetHue.value)

    const sliderElement = document.querySelectorAll('.noUi-target')[this.sliderIndex - 1] as HTMLElement
    if (sliderElement) {
      const hue = this.targetHue.value
      sliderElement.style.background = `linear-gradient(to right,
        hsl(${hue}, 0%, 50%),
        hsl(${hue}, 100%, 50%))`
    }
  }

  onSaturationStateChange() {
    this.targetSaturationChanged.next(this.targetSaturation.value)
  }

  onColorTemperatureStateChange() {
    const miredValue = this.kelvinToMired(this.targetColorTemperature.value)
    this.targetColorTemperature.mired = miredValue
    this.targetColorTemperatureChanged.next(miredValue)
  }

  miredToKelvin(kelvin: number): number {
    return Math.round(1000000 / kelvin)
  }

  kelvinToMired(kelvin: number): number {
    return Math.round(1000000 / kelvin)
  }

  kelvinToHsl(kelvin: number): string {
    const temp = kelvin / 100
    let red: number, green: number, blue: number
    if (temp <= 66) {
      red = 255
      green = Math.min(99.4708025861 * Math.log(temp) - 161.1195681661, 255)
      blue = temp <= 19 ? 0 : Math.min(138.5177312231 * Math.log(temp - 10) - 305.0447927307, 255)
    } else {
      red = Math.min(329.698727446 * (temp - 60) ** -0.1332047592, 255)
      green = Math.min(288.1221695283 * (temp - 60) ** -0.0755148492, 255)
      blue = 255
    }
    red /= 255
    green /= 255
    blue /= 255
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const delta = max - min
    let hue = 0
    if (delta !== 0) {
      if (max === red) {
        hue = ((green - blue) / delta) % 6
      } else if (max === green) {
        hue = (blue - red) / delta + 2
      } else {
        hue = (red - green) / delta + 4
      }
      hue = Math.round(hue * 60)
      if (hue < 0) {
        hue += 360
      }
    }
    const lightness = (max + min) / 2
    const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
    return `hsl(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(lightness * 100)}%)`
  }
}
