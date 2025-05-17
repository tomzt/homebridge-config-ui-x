import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return ''
    }
    const minutes = Math.floor(value / 60)
    const seconds = value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
}
