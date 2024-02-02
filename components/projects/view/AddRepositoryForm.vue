<script lang="ts" setup>
import { object, string, number, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type {
  BitbucketApi,
  GitProviders,
  GitSettings,
  GithubApi,
} from '~/types/git'
import type { Project } from '~/types/project'

const appStore = useAppStore()
const { database } = useDbStore()
const { updateProject, getAllProjects, selectedProject } = useProjectsStore()

const gitProviders = ref<GitProviders[]>([])

onMounted(() => {
  database?.select('SELECT * FROM Vendors').then(response => {
    gitProviders.value = response as GitProviders[]
  })
})

const formReady = computed(() => {
  return gitProviders.value.length > 0
})

const isFoundGithub = computed(() =>
  gitProviders.value.find(
    p => p.git_provider_name === state.name && state.name === 'github',
  ),
)
const isFoundBitbucket = computed(() =>
  gitProviders.value.find(
    p => p.git_provider_name === state.name && state.name === 'bitbucket',
  ),
)

const dynamicSchema = computed(() => {
  switch (true) {
    case isFoundGithub.value !== undefined:
      return object({
        name: string().required('Required'),
        owner: string().required(),
        repository_name: string().required(),
        personal_access_token: string().required(),
      })
    case isFoundBitbucket.value !== undefined:
      return object({
        name: string().required('Required'),
        owner: string().required(),
        repository_name: string().required(),
        app_password: string().required(),
      })
    default:
      return object({
        name: string().required('Required'),
        owner: string().required('Required'),
        repository_name: string().required('Required'),
      })
  }
})

type Schema = InferType<typeof dynamicSchema.value> & {
  personal_access_token?: string
  app_password?: string
}
const state = reactive({
  name: undefined,
  owner: undefined,
  repository_name: undefined,
  app_password: undefined,
  personal_access_token: undefined,
})

function onSubmit(event: FormSubmitEvent<Schema>) {
  const validated: Partial<Schema> = { ...event.data }
  let project = JSON.parse(JSON.stringify(selectedProject)) as Project

  let settings: GithubApi | BitbucketApi
  switch (true) {
    case isFoundGithub.value !== undefined:
      settings = {
        owner: validated.owner,
        repository_name: validated.repository_name,
        personal_access_token: validated.personal_access_token,
      } as GithubApi
      break
    default:
      settings = {
        owner: validated.owner,
        repository_name: validated.repository_name,
        app_password: validated.app_password,
      } as BitbucketApi
      break
  }

  project.git_settings = {
    name: validated.name,
    settings: settings,
  } as GitSettings

  updateProject(project as Project).then(_ => {
    getAllProjects()
    appStore.hideSlideOver()
  })
}

const isFormValid = computed(() => {
  try {
    dynamicSchema.value.validateSync(state, { abortEarly: false })
    return true
  } catch (error) {
    return false
  }
})
</script>

<template>
  <div>
    <h3 class="text-lg mb-2">Add Git Repo</h3>
    <p class="text-xs mb-3">
      Fill in the form to add a new git repository to the application.
    </p>
  </div>
</template>
