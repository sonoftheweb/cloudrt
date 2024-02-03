<script lang="ts" setup>
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type {
  BitbucketApi,
  GitSettings,
  GithubApi,
} from '~/types/git'
import type { Project } from '~/types/project'

const appStore = useAppStore()
const gitStore = useGitStore()
const selectedProjectStore = useSelectedProjectStore()

onMounted(() => {
  gitStore.getAllGitProviders()
})

const formReady = computed(() => {
  return gitStore.gitProviders.length > 0
})

const isFoundGithub = computed(() =>
  gitStore.gitProviders.find(
    p => p.git_provider_name === state.name && state.name === 'github',
  ),
)
const isFoundBitbucket = computed(() =>
  gitStore.gitProviders.find(
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
  let project = JSON.parse(
    JSON.stringify(selectedProjectStore.selectedProject),
  ) as Project

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

  selectedProjectStore.updateProject(project as Project).then(_ => {
    selectedProjectStore
      .getProjectById(project.project_id as number, true)
      .then(_ => appStore.hideSlideOver())
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
    <UForm
      v-if="formReady"
      :schema="dynamicSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Git provider" name="name">
        <USelectMenu
          v-model="state.name"
          :options="gitStore.gitProviders"
          placeholder="Select git provider"
          value-attribute="git_provider_name"
          option-attribute="git_provider_name"
        />
      </UFormGroup>
      <UFormGroup label="Owner" name="owner">
        <UInput v-model="state.owner" />
      </UFormGroup>
      <UFormGroup label="Repository name" name="repository_name">
        <UInput v-model="state.repository_name" />
      </UFormGroup>
      <template v-if="isFoundGithub">
        <UFormGroup label="Personal access token" name="personal_access_token">
          <UInput v-model="state.personal_access_token" />
        </UFormGroup>
      </template>
      <template v-if="isFoundBitbucket">
        <UFormGroup label="App password" name="app_password">
          <UInput v-model="state.app_password" />
        </UFormGroup>
      </template>

      <UButton type="submit" v-if="isFormValid"> Add repository </UButton>
    </UForm>
  </div>
</template>
