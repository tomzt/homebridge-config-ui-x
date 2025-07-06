import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, viewChild } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { Subject } from 'rxjs'

import { TerminalService } from '@/app/core/terminal.service'

@Component({
  templateUrl: './terminal.component.html',
  standalone: true,
  imports: [TranslatePipe],
})
export class TerminalComponent implements OnInit, OnDestroy {
  private $terminal = inject(TerminalService)
  private resizeEvent = new Subject()

  readonly termTarget = viewChild<ElementRef>('terminaloutput')

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.resizeEvent.next(undefined)
  }

  public ngOnInit() {
    // Set body bg color
    window.document.querySelector('body').classList.add('bg-black')

    // Start the terminal
    this.$terminal.startTerminal(this.termTarget(), {}, this.resizeEvent)

    // Set focus to the terminal
    this.$terminal.term.focus()
  }

  public ngOnDestroy() {
    // Unset body bg color
    window.document.querySelector('body').classList.remove('bg-black')

    // Destroy the terminal
    this.$terminal.destroyTerminal()
  }
}
