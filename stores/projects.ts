import { defineStore } from 'pinia'
import type { NewProject, Project } from '~/types/project'
import type { DbVendor } from '~/types/vendor'

export const useProjectsStore = defineStore('projects', () => {
  const { database } = useDbStore()
  const { fireSystemNotification } = useNotificationsStore()

  const projects = ref<Project[]>([])

  async function getAllProjects() {
    const result = await database?.select('select * from Projects')
    projects.value = result as Project[]
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

  return {
    projects,
    getAllProjects,
    saveNewProject,
  }
})
