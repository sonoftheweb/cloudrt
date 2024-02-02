import { defineStore } from 'pinia'
import type { NewProject, Project } from '~/types/project'
import type { DbVendor, VendorSettings } from '~/types/vendor'
import mitt from 'mitt'
import type { GitSettings } from '~/types/git'

export const useProjectsStore = defineStore('projects', () => {
  const emitter = mitt()

  const { database } = useDbStore()
  const { fireSystemNotification } = useNotificationsStore()

  const projects = ref<Project[]>([])
  const selectedProject = ref<Project | null>(null)

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

  async function getProjectById(id: number): Promise<void> {
    if (!projects.value.length) {
      await getAllProjects()
    }
    const findProject = projects.value.find(p => p.project_id === id)
    if (findProject) {
      selectedProject.value = findProject
    } else {
      await fireSystemNotification({
        title: 'Not found',
        body: 'Unable to find project selected.',
      })
      emitter.emit('back')
    }
  }

  function validateSelectedProject(): boolean {
    if (!selectedProject.value) {
      return false
    }

    if (
      !selectedProject.value.project_name ||
      !selectedProject.value.project_key ||
      !selectedProject.value.vendor_id
    ) {
      return false
    }

    const vendorName = selectedProject.value.vendor?.vendor_name
    if (vendorName) {
      const vendorKeys = Object.keys(selectedProject.value.project_settings)
      const requiredKeys = ['aws', 'gcp', 'azure'].includes(vendorName)
        ? ['access_key', 'secret', 'default_zone']
        : []
      for (const key of requiredKeys) {
        if (!vendorKeys.includes(`${vendorName}_${key}`)) {
          return false
        }
      }
    }

    return true
  }

  function selectedProjectGit(): GitSettings | null {
    if (typeof selectedProject.value?.git_settings === 'string') {
      return JSON.parse(
        selectedProject.value?.git_settings as string,
      ) as GitSettings
    }

    return selectedProject.value?.git_settings as GitSettings | null
  }

  async function saveNewProject(data: NewProject) {
    const vendor: DbVendor[] | undefined = await database?.select(
      'select * from Vendors where vendor_id = $1',
      [data.vendor_id],
    )

    if (!vendor || !vendor.length) {
      await fireSystemNotification({
        title: 'No vendor found',
        body: `Vendor id ${data.vendor_id} was not found.`,
      })
    }

    const vendorName = vendor?.[0]?.vendor_name
    const vendorSettings: { [key: string]: any } = {}

    if (vendorName === 'aws') {
      vendorSettings['output'] = 'json'
    }

    for (const key in data) {
      if (key.startsWith(vendorName as string)) {
        const newKey = key.replace(`${vendorName}_`, '')
        vendorSettings[newKey] = data[key as keyof NewProject] || ''
      }
    }

    const insertQuery = `
      INSERT INTO Projects (
        project_name,
        project_key,
        project_description,
        vendor_id,
        project_settings
      ) VALUES ($1, $2, $3, $4, $5)
    `

    await database?.execute(insertQuery, [
      data.project_name,
      data.project_name.toLowerCase().replace(/ /g, '-'),
      data.project_description,
      data.vendor_id,
      JSON.stringify(vendorSettings),
    ])

    await fireSystemNotification({
      title: 'Project saved',
      body: `${data.project_name} has been saved.`,
    })
  }

  async function updateProject(project: Project) {
    const {
      git_settings,
      project_settings,
      vendor_id,
      project_id,
      project_name,
      project_key,
      project_description,
    } = project

    let parsedGitSettings: GitSettings | null = null
    let parsedProjectSettings: VendorSettings | null = null

    try {
      parsedGitSettings =
        typeof git_settings === 'string' && git_settings !== null
          ? JSON.parse(git_settings)
          : git_settings
      parsedProjectSettings =
        typeof project_settings === 'string'
          ? JSON.parse(project_settings)
          : project_settings
    } catch (error) {
      await fireSystemNotification({
        title: 'Invalid settings',
        body: `Failed to parse settings for project ${project.project_name}.`,
      })
      return
    }

    const updateQuery = `
      UPDATE Projects SET
        git_settings = $1,
        project_settings = $2,
        vendor_id = $3,
        project_name = $4,
        project_key = $5,
        project_description = $6
      WHERE project_id = $7
    `

    await database?.execute(updateQuery, [
      JSON.stringify(parsedGitSettings),
      JSON.stringify(parsedProjectSettings),
      vendor_id,
      project_name,
      project_key,
      project_description,
      project_id,
    ])

    await fireSystemNotification({
      title: 'Project updated',
      body: `${project.project_name} has been updated.`,
    })
  }

  async function projectVendor(project: Project): Promise<DbVendor | null> {
    const result = await database?.select(
      'select * from Vendors where vendor_id = $1',
      [project.vendor_id],
    )
    if (!result) {
      await fireSystemNotification({
        title: 'Invalid vendor',
        body: `${project.project_name} has invalid vendor. Update or delete the project.`,
      })
      return null
    }
    return (result as DbVendor[])[0]
  }

  return {
    projects,
    selectedProject,
    getAllProjects,
    getProjectById,
    saveNewProject,
    updateProject,
    projectVendor,
    validateSelectedProject,
    selectedProjectGit,
  }
})
