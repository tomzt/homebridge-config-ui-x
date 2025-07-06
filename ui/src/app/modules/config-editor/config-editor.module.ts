import { NgModule } from '@angular/core'

import { ConfigEditorRoutingModule } from '@/app/modules/config-editor/config-editor-routing.module'
import { ConfigEditorResolver } from '@/app/modules/config-editor/config-editor.resolver'

@NgModule({
  imports: [
    ConfigEditorRoutingModule,
  ],
  providers: [
    ConfigEditorResolver,
  ],
})
export class ConfigEditorModule {}
