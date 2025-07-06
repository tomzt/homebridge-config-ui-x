import { NgClass, NgStyle } from '@angular/common'
import { Component, ElementRef, inject, Input, OnDestroy, OnInit, viewChild } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { ITerminalOptions } from 'xterm'

import { SettingsService } from '@/app/core/settings.service'
import { TerminalService } from '@/app/core/terminal.service'

@Component({
  templateUrl: './terminal-widget.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgStyle,
    TranslatePipe,
  ],
})
export class TerminalWidgetComponent implements OnInit, OnDestroy {
  private $terminal = inject(TerminalService)
  private $settings = inject(SettingsService)
  private fontSize = 15
  private fontWeight: ITerminalOptions['fontWeight'] = '400'

  readonly widgetContainerElement = viewChild<ElementRef>('widgetcontainer')
  readonly titleElement = viewChild<ElementRef>('terminaltitle')
  readonly termTarget = viewChild<ElementRef>('terminaloutput')

  @Input() widget: any
  @Input() resizeEvent: Subject<any>
  @Input() configureEvent: Subject<any>

  public terminalHeight = 200
  public theme: 'dark' | 'light' = 'dark'

  public ngOnInit() {
    this.fontSize = this.widget.fontSize || 15
    this.fontWeight = this.widget.fontWeight || 400
    if (this.$settings.actualLightingMode === 'dark') {
      this.widget.theme = 'dark'
    }
    this.theme = this.widget.theme || 'dark'

    setTimeout(() => {
      this.$terminal.startTerminal(this.termTarget(), {
        cursorBlink: false,
        theme: this.theme !== 'light'
          ? {
              background: '#2b2b2b',
            }
          : {
              background: '#00000000',
              foreground: '#2b2b2b',
              cursor: '#d2d2d2',
              selection: '#d2d2d2',
            },
        allowTransparency: this.theme === 'light',
        fontSize: this.fontSize,
        fontWeight: this.fontWeight,
      }, this.resizeEvent)
    })

    this.resizeEvent.subscribe({
      next: () => {
        this.terminalHeight = this.getTerminalHeight()
      },
    })

    this.configureEvent.subscribe({
      next: () => {
        let changed = false
        if (this.widget.fontSize !== this.fontSize) {
          this.fontSize = this.widget.fontSize
          this.$terminal.term.options.fontSize = this.widget.fontSize
          changed = true
        }
        if (this.widget.fontWeight !== this.fontWeight) {
          this.fontWeight = this.widget.fontWeight
          this.$terminal.term.options.fontWeight = this.widget.fontWeight
          changed = true
        }
        if (this.widget.theme !== this.theme) {
          this.theme = this.widget.theme
          this.$terminal.term.options.theme = this.theme !== 'light'
            ? {
                background: '#2b2b2b',
              }
            : {
                background: '#00000000',
                foreground: '#2b2b2b',
                cursor: '#d2d2d2',
                selection: '#d2d2d2',
              }
          this.$terminal.term.options.allowTransparency = this.theme === 'light'
          changed = true
        }

        if (changed) {
          this.resizeEvent.next(undefined)
          setTimeout(() => {
            this.$terminal.term.scrollToBottom()
          }, 100)
        }
      },
    })
  }

  public ngOnDestroy() {
    this.$terminal.destroyTerminal()
  }

  private getTerminalHeight(): number {
    const widgetContainerHeight = (this.widgetContainerElement().nativeElement as HTMLElement).offsetHeight
    const titleHeight = (this.titleElement().nativeElement as HTMLElement).offsetHeight
    return widgetContainerHeight - titleHeight
  }
}
