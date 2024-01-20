import type { GCPVendorSettings, AWSVendorSettings, AzureVendorSettings } from "./vendor"

export interface Project {
  project_name: string
  project_id: string
  project_key: string
  project_description: string
  project_vendor: 'gcp' | 'aws' | 'azure'
  project_vendor_settings: GCPVendorSettings | AWSVendorSettings | AzureVendorSettings
}
