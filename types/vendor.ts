export interface DbVendor {
  vendor_id: number
  vendor_name: string
}

export interface VendorSettings {
  access_key: string
  secret: string
}

export interface GCPVendorSettings extends VendorSettings {}

export interface AWSVendorSettings extends VendorSettings {
  default_zone: string
  output?: 'json' | 'text' | 'table'
}

export interface AzureVendorSettings extends VendorSettings {}
