import { NgModule } from '@angular/core'

import { DockerRoutingModule } from '@/app/modules/platform-tools/docker/docker-routing.module'
import { StartupScriptResolver } from '@/app/modules/platform-tools/docker/startup-script/startup-script.resolver'

@NgModule({
  imports: [
    DockerRoutingModule,
  ],
  providers: [
    StartupScriptResolver,
  ],
})
export class DockerModule {}
