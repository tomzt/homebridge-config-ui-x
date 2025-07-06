import type { ServiceType } from '@homebridge/hap-client'

export type AccessoryLayout = {
  name: string
  services: Array<{
    aid: number
    iid: number
    uuid: string
    uniqueId: string
    customName?: string
    customType?: string
    hidden?: boolean
    onDashboard?: boolean
  }>
}[]

export type ServiceTypeX = ServiceType & {
  customName?: string
  customType?: string
  hidden?: boolean
  onDashboard?: boolean
}
