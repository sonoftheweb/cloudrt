<script lang="ts" setup>
import { useAppStore } from '~/stores/app'
import CreateProjectForm from '~/components/projects/CreateProjectForm.vue'

const cliStore = useCliStore()
const appStore = useAppStore()
const notificationStore = useNotificationsStore()
const projectStore = useProjectsStore()

onMounted(() => {
  projectStore.getAllProjects()
})
</script>

<template>
  <div class="h-screen w-screen p-5">
    <div>
      <div class="p-3" v-if="projectStore.projects.length">
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          :ui="{ rounded: 'rounded-full' }"
        >
          Add new project
        </UButton>
      </div>
      <div class="p-3 w-full flex justify-center items-center" v-else>
        <div class="text-center">
          <h3 class="mb-3">You do not have any projects configured.</h3>
          <UButton
            class="mb-3"
            size="sm"
            :ui="{ rounded: 'rounded-full' }"
            @click="appStore.showSlideOver(CreateProjectForm)"
          >
            Create your first project
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
