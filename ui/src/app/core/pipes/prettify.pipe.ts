import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'prettify',
  standalone: true,
})
export class PrettifyPipe implements PipeTransform {
  transform(value: string): string {
    if (typeof value !== 'string') {
      return value
    }

    return value
      .replace(/_/g, ' ') // Replace underscores with spaces
      .toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase()) // Capitalize the first letter of each word
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters that follow lowercase letters
  }
}
