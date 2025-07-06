import { Component, inject, Input } from '@angular/core'

import { ServiceTypeX } from '@/app/core/accessories/accessories.interfaces'
import { AccessoriesService } from '@/app/core/accessories/accessories.service'
import { AirPurifierComponent } from '@/app/core/accessories/types/air-purifier/air-purifier.component'
import { AirQualitySensorComponent } from '@/app/core/accessories/types/air-quality-sensor/air-quality-sensor.component'
import { BatteryComponent } from '@/app/core/accessories/types/battery/battery.component'
import { CarbonDioxideSensorComponent } from '@/app/core/accessories/types/carbon-dioxide-sensor/carbon-dioxide-sensor.component'
import { CarbonMonoxideSensorComponent } from '@/app/core/accessories/types/carbon-monoxide-sensor/carbon-monoxide-sensor.component'
import { ContactSensorComponent } from '@/app/core/accessories/types/contact-sensor/contact-sensor.component'
import { DoorComponent } from '@/app/core/accessories/types/door/door.component'
import { FanV2Component } from '@/app/core/accessories/types/fan-v2/fan-v2.component'
import { FanComponent } from '@/app/core/accessories/types/fan/fan.component'
import { FilterMaintenanceComponent } from '@/app/core/accessories/types/filter-maintenance/filter-maintenance.component'
import { GarageDoorOpenerComponent } from '@/app/core/accessories/types/garage-door-opener/garage-door-opener.component'
import { HeaterCoolerComponent } from '@/app/core/accessories/types/heater-cooler/heater-cooler.component'
import { HumidifierDehumidifierComponent } from '@/app/core/accessories/types/humidifier-dehumidifier/humidifier-dehumidifier.component'
import { HumiditySensorComponent } from '@/app/core/accessories/types/humidity-sensor/humidity-sensor.component'
import { IrrigationSystemComponent } from '@/app/core/accessories/types/irrigation-system/irrigation-system.component'
import { LeakSensorComponent } from '@/app/core/accessories/types/leak-sensor/leak-sensor.component'
import { LightBulbComponent } from '@/app/core/accessories/types/light-bulb/light-bulb.component'
import { LightSensorComponent } from '@/app/core/accessories/types/light-sensor/light-sensor.component'
import { LockMechanismComponent } from '@/app/core/accessories/types/lock-mechanism/lock-mechanism.component'
import { MotionSensorComponent } from '@/app/core/accessories/types/motion-sensor/motion-sensor.component'
import { OccupancySensorComponent } from '@/app/core/accessories/types/occupancy-sensor/occupancy-sensor.component'
import { OutletComponent } from '@/app/core/accessories/types/outlet/outlet.component'
import { SecuritySystemComponent } from '@/app/core/accessories/types/security-system/security-system.component'
import { SmokeSensorComponent } from '@/app/core/accessories/types/smoke-sensor/smoke-sensor.component'
import { SpeakerComponent } from '@/app/core/accessories/types/speaker/speaker.component'
import { StatelessProgrammableSwitchComponent } from '@/app/core/accessories/types/stateless-programmable-switch/stateless-programmable-switch.component'
import { SwitchComponent } from '@/app/core/accessories/types/switch/switch.component'
import { TelevisionComponent } from '@/app/core/accessories/types/television/television.component'
import { TemperatureSensorComponent } from '@/app/core/accessories/types/temperature-sensor/temperature-sensor.component'
import { ThermostatComponent } from '@/app/core/accessories/types/thermostat/thermostat.component'
import { UnknownComponent } from '@/app/core/accessories/types/unknown/unknown.component'
import { ValveComponent } from '@/app/core/accessories/types/valve/valve.component'
import { WindowComponent } from '@/app/core/accessories/types/window/window.component'
import { WindowCoveringComponent } from '@/app/core/accessories/types/window-covering/window-covering.component'

@Component({
  selector: 'app-accessory-tile',
  templateUrl: './accessory-tile.component.html',
  standalone: true,
  imports: [
    SwitchComponent,
    ThermostatComponent,
    OutletComponent,
    FanComponent,
    FanV2Component,
    AirPurifierComponent,
    LightBulbComponent,
    LightSensorComponent,
    LockMechanismComponent,
    TemperatureSensorComponent,
    GarageDoorOpenerComponent,
    MotionSensorComponent,
    OccupancySensorComponent,
    ContactSensorComponent,
    HumiditySensorComponent,
    AirQualitySensorComponent,
    WindowCoveringComponent,
    WindowComponent,
    DoorComponent,
    TelevisionComponent,
    BatteryComponent,
    SpeakerComponent,
    SecuritySystemComponent,
    LeakSensorComponent,
    SmokeSensorComponent,
    CarbonMonoxideSensorComponent,
    CarbonDioxideSensorComponent,
    ValveComponent,
    IrrigationSystemComponent,
    HeaterCoolerComponent,
    HumidifierDehumidifierComponent,
    StatelessProgrammableSwitchComponent,
    FilterMaintenanceComponent,
    UnknownComponent,
  ],
})
export class AccessoryTileComponent {
  $accessories = inject(AccessoriesService)

  @Input() public service: ServiceTypeX

  constructor() {}
}
