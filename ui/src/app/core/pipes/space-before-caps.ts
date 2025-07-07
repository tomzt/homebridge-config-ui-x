import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'spaceBeforeCaps' })
export class SpaceBeforeCapsPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string' || !value) {
      return value
    }

    return value.replace(/(?!^)([A-Z])/g, ' $1')
  }
}
