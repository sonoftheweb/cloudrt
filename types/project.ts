import type {
  GCPVendorSettings,
  AWSVendorSettings,
  AzureVendorSettings,
} from './vendor'

export interface Project {
  project_id?: number
  project_name: string
  project_key: string
  project_description: string
  vendor_id: number
  project_settings:
    | string
    | GCPVendorSettings
    | AWSVendorSettings
    | AzureVendorSettings
}

export interface NewProject {
  project_name: string
  project_description: string
  vendor_id: number
  aws_access_key?: string
  aws_secret?: string
  aws_default_zone?: string
  gcp_access_key?: string
  gcp_secret?: string
  gcp_default_zone?: string
  azure_access_key?: string
  azure_secret?: string
  azure_default_zone?: string
}
