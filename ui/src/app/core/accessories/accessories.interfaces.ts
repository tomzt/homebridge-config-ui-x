import type { ServiceType } from '@homebridge/hap-client'

export type ServiceTypeX = ServiceType & {
  customName?: string
  customType?: string
  hidden?: boolean
  onDashboard?: boolean
}
