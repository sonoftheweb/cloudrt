<script lang="ts" setup>
import type { Project } from '~/types/project'
import Aws from '../icons/aws/Aws.vue'
import Gcp from '../icons/gcp/Gcp.vue'
import AzureVue from '../icons/azure/Azure.vue'

const props = defineProps<{
  project: Project
}>()

const component = computed(() => {
  switch (props.project.vendor?.vendor_name) {
    case 'aws':
      return Aws
    case 'gcp':
      return Gcp
    default:
      return AzureVue
  }
})
</script>

<template>
  <component :is="component" />
</template>
