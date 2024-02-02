import type { GitSettings } from './git'
import type { DbVendor, VendorSettings } from './vendor'

export interface Project {
  project_id?: number
  project_name: string
  project_key: string
  project_description: string
  vendor_id: number
  project_settings: string | VendorSettings
  git_settings: string | GitSettings
  vendor?: DbVendor
}

export interface AwsPlatformCredentials {
  aws_access_key: string
  aws_secret: string
  aws_default_zone: string
}

export interface GcpPlatformCredentials {
  gcp_access_key: string
  gcp_secret: string
  gcp_default_zone: string
}

export interface AzurePlatformCredentials {
  azure_access_key: string
  azure_secret: string
}

export interface NewProject {
  project_name: string
  project_description: string
  vendor_id: number
  credentials: PlatformCredentials
}

export type PlatformCredentials =
  | AwsPlatformCredentials
  | GcpPlatformCredentials
  | AzurePlatformCredentials
