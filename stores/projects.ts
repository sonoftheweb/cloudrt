import { defineStore } from 'pinia'
import type { Project } from '~/types/project'
import type { VendorSettings } from '~/types/vendor'
import type { GitSettings } from '~/types/git'

export const useProjectsStore = defineStore('projects', () => {
  const { database } = useDbStore()
  const projects = ref<Project[]>([])

  async function getAllProjects(): Promise<void> {
    const result = await database?.select(
      'SELECT Projects.*, Vendors.* FROM Projects JOIN Vendors ON Projects.vendor_id = Vendors.vendor_id',
    )

    if (result) {
      const formattedResult = (result as Project[]).map((row: any) => {
        const project = {
          project_id: row.project_id,
          project_name: row.project_name,
          project_key: row.project_key,
          project_description: row.project_description,
          project_settings: row.project_settings,
          git_settings: row.git_settings,
          vendor_id: row.vendor_id,
        }
        const vendor = {
          vendor_id: row.vendor_id,
          vendor_name: row.vendor_name,
        }
        return { ...project, vendor } as Project
      })

      projects.value = (formattedResult as Project[]).map(
        (project: Project) => {
          const parseSettings = (
            settings: string | GitSettings | VendorSettings,
          ) => {
            if (typeof settings === 'string') {
              return JSON.parse(settings)
            }
            return settings
          }
          project.project_settings = parseSettings(
            project.project_settings,
          ) as VendorSettings
          project.git_settings = parseSettings(
            project.git_settings,
          ) as GitSettings
          return project as Project
        },
      )
    }
  }

  return {
    projects,
    getAllProjects,
  }
})
