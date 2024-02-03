import mitt from 'mitt'
import { defineStore } from 'pinia'
import type { GitSettings } from '~/types/git'
import type { NewProject, Project } from '~/types/project'
import type { DbVendor, VendorSettings } from '~/types/vendor'

export const useSelectedProjectStore = defineStore('SelectedProject', () => {
  const emitter = mitt()
  const { database } = useDbStore()
  const projectsStore = useProjectsStore()
  const { fireSystemNotification } = useNotificationsStore()

  const selectedProject = ref<Project | null>(null)
  const selectedProjectGitUrl = ref<string>('')

  async function getProjectById(
    id: number,
    refresh: boolean = false,
  ): Promise<void> {
    if (!projectsStore.projects.length || refresh) {
      await projectsStore.getAllProjects()
    }
    const findProject = projectsStore.projects.find(
      (p: Project) => p.project_id === id,
    )
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
    selectedProject,
    selectedProjectGitUrl,
    getProjectById,
    validateSelectedProject,
    saveNewProject,
    updateProject,
    projectVendor,
  }
})
