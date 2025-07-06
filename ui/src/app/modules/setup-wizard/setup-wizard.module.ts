import { NgModule } from '@angular/core'

import { SetupWizardRoutingModule } from '@/app/modules/setup-wizard/setup-wizard-routing.module'
import { SetupWizardGuard } from '@/app/modules/setup-wizard/setup-wizard.guard'

@NgModule({
  imports: [
    SetupWizardRoutingModule,
  ],
  providers: [
    SetupWizardGuard,
  ],
})
export class SetupWizardModule {}
