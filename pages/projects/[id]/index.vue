<script lang="ts" setup>
import ProjectHeader from '~/components/projects/view/ProjectHeader.vue'
import ProjectMenu from '~/components/projects/view/ProjectMenu.vue'
import GitCheck from '~/components/projects/view/GitCheck.vue'
import type { Project } from '~/types/project'

const router = useRouter()
const selectedProjectStore = useSelectedProjectStore()

const projectId = ref<number | null>(null)

onMounted(() => {
  projectId.value = parseInt(router.currentRoute.value.params.id as string)
  selectedProjectStore
    .getProjectById(projectId.value)
    .then(_ => selectedProjectStore.validateSelectedProject())
})
</script>

<template>
  <div class="h-screen w-screen p-5 flex">
    <div class="w-[50px] bg-green-600 rounded-lg">
      <ProjectMenu v-if="projectId" :project-id="projectId" />
    </div>
    <div v-if="selectedProjectStore.selectedProject" class="flex-grow px-5">
      <ProjectHeader
        :project="(selectedProjectStore.selectedProject as Project)"
      />
      <div class="flex items-center mt-5">
        <div
          class="w-[20vw] bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-md shadow px-6 py-5 hover:bg-white/50 dark:hover:bg-gray-900/50 transition-all ease-out duration-200"
        >
          <GitCheck />
        </div>
      </div>
    </div>
  </div>
</template>
