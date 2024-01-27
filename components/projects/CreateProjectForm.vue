<script lang="ts" setup>
import { object, string, number, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import type { DbVendor } from '~/types/vendor'
import type { NewProject } from '~/types/project'

const appStore = useAppStore()
const { database } = useDbStore()
const { saveNewProject, getAllProjects } = useProjectsStore()
const { zonesNameRegionArray } = useAws()
const vendors = ref<DbVendor[]>([])

onMounted(() => {
  database?.select('SELECT * FROM Vendors').then(response => {
    vendors.value = response as DbVendor[]
  })
})

const formReady = computed(() => {
  return vendors.value.length > 0
})

const isFoundAws = computed(() =>
  vendors.value.find(
    v => v.vendor_id === state.vendor_id && v.vendor_name === 'aws',
  ),
)
const isFoundGcp = computed(() =>
  vendors.value.find(
    v => v.vendor_id === state.vendor_id && v.vendor_name === 'gcp',
  ),
)
const isFoundAzure = computed(() =>
  vendors.value.find(
    v => v.vendor_id === state.vendor_id && v.vendor_name === 'azure',
  ),
)

const dynamicSchema = computed(() => {
  switch (true) {
    case isFoundAws.value !== undefined:
      return object({
        project_name: string().required('Required'),
        project_description: string(),
        vendor_id: number().required(),
        aws_access_key: string().required(),
        aws_secret: string().required(),
        aws_default_zone: string().required(),
      })
    case isFoundGcp.value !== undefined:
      return object({
        project_name: string().required('Required'),
        project_description: string(),
        vendor_id: number().required(),
        gcp_access_key: string().required(),
        gcp_secret: string().required(),
        gcp_default_zone: string().required(),
      })
    case isFoundAzure.value !== undefined:
      return object({
        project_name: string().required('Required'),
        project_description: string(),
        vendor_id: number().required(),
        azure_access_key: string().required(),
        azure_secret: string().required(),
        azure_default_zone: string().required(),
      })
    default:
      return object({
        project_name: string().required('Required'),
        project_description: string(),
        vendor_id: number(),
      })
  }
})

type Schema = InferType<typeof dynamicSchema.value>
const state = reactive({
  project_name: undefined,
  project_description: undefined,
  vendor_id: undefined,
  aws_access_key: undefined,
  aws_secret: undefined,
  aws_default_zone: undefined,
  gcp_access_key: undefined,
  gcp_secret: undefined,
  gcp_default_zone: undefined,
  azure_access_key: undefined,
  azure_secret: undefined,
  azure_default_zone: undefined,
})

function onSubmit(event: FormSubmitEvent<Schema>) {
  const validated: Partial<Schema> = { ...event.data }
  for (let key in validated) {
    if (validated[key as keyof Schema] === undefined) {
      delete validated[key as keyof Schema]
    }
  }
  saveNewProject(validated as NewProject).then(_ => {
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
    <h3 class="text-lg mb-2">New project</h3>
    <p class="text-xs mb-3">
      Fill in the form to create a new project. Depending on the project vendor,
      you'll be asked to provide certain information so make sure you have
      access to the cloud provider of your choice.
    </p>
    <UForm
      v-if="formReady"
      :schema="dynamicSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormGroup label="Name" name="project_name">
        <UInput v-model="state.project_name" />
      </UFormGroup>

      <UFormGroup label="Description" name="project_description">
        <UInput v-model="state.project_description" />
      </UFormGroup>

      <UFormGroup label="Vendor" name="vendor_id">
        <USelectMenu
          v-model="state.vendor_id"
          :options="vendors"
          placeholder="Select cloud provider"
          value-attribute="vendor_id"
          option-attribute="vendor_name"
        />
      </UFormGroup>

      <template v-if="isFoundAws">
        <UFormGroup label="AWS Access Key" name="aws_access_key">
          <UInput v-model="state.aws_access_key" />
        </UFormGroup>

        <UFormGroup label="AWS Secret" name="aws_secret">
          <UInput v-model="state.aws_secret" />
        </UFormGroup>

        <UFormGroup label="AWS Default Zone" name="aws_default_zone">
          <USelectMenu
            v-model="state.aws_default_zone"
            :options="zonesNameRegionArray"
            placeholder="Select cloud provider"
            value-attribute="region"
            option-attribute="name"
          />
        </UFormGroup>
      </template>

      <UButton type="submit" v-if="isFormValid"> Save new project </UButton>
    </UForm>
  </div>
</template>
