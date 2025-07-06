/* global NodeJS */
import { Directive, HostListener, Input, OnDestroy, output } from '@angular/core'

@Directive({
  selector: '[shortClick], [longClick]',
  standalone: true,
})
export class LongClickDirective implements OnDestroy {
  private downTimeout: NodeJS.Timeout
  private done = false

  @Input() public duration = 350

  public readonly longClick = output<MouseEvent | TouchEvent>()
  public readonly shortClick = output<MouseEvent | KeyboardEvent | TouchEvent>()

  @HostListener('keyup.enter', ['$event'])
  public onEnter(event: KeyboardEvent) {
    this.shortClick.emit(event)
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: MouseEvent): void {
    clearTimeout(this.downTimeout)
    if (!this.done) {
      this.done = true
      this.shortClick.emit(event)
    }
  }

  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent): void {
    clearTimeout(this.downTimeout)
    event.preventDefault()
    event.stopPropagation()
    if (!this.done) {
      this.done = true
      this.shortClick.emit(event)
    }
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent | TouchEvent): void {
    // Check for the left mouse button (button 0) in case of mouse event
    if (event instanceof MouseEvent && event.button !== 0) {
      return
    }
    this.done = false

    if (event instanceof TouchEvent) {
      event.preventDefault()
      event.stopPropagation()
    }

    this.downTimeout = setTimeout(() => {
      if (!this.done) {
        this.done = true
        this.longClick.emit(event)
      }
    }, this.duration)
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  public onMouseMove(): void {
    this.done = true
    clearTimeout(this.downTimeout)
  }

  public ngOnDestroy() {
    clearTimeout(this.downTimeout)
  }
}
