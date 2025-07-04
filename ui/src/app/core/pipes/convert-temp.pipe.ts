import { inject, Pipe, PipeTransform } from '@angular/core'

import { SettingsService } from '@/app/core/settings.service'

@Pipe({
  name: 'convertTemp',
  standalone: true,
})
export class ConvertTempPipe implements PipeTransform {
  private $settings = inject(SettingsService)

  constructor() {}

  transform(value: boolean | string | number, unit: 'c' | 'f' = this.$settings.env.temperatureUnits): boolean | string | number {
    if (typeof value !== 'number') {
      return value
    }

    if (unit === 'f') {
      return value * 1.8 + 32
    }
    return value
  }
}
