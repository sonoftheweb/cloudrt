export interface DbVendor {
  vendor_id: number
  vendor_name: string
}

export interface GCPVendorSettings {
  access_key: string
  secret: string
}

export interface AWSVendorSettings {
  access_key: string
  secret: string
  default_zone: string
  output?: 'json' | 'text' | 'table'
}

export interface AzureVendorSettings {
  access_key: string
  secret: string
}

export type VendorSettings =
  | AWSVendorSettings
  | GCPVendorSettings
  | AzureVendorSettings
