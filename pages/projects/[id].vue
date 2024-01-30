<script lang="ts" setup>
import ProjectHeader from '~/components/projects/view/ProjectHeader.vue'
import type { Project } from '~/types/project'
const router = useRouter()
const projectStore = useProjectsStore()

onMounted(() => {
  projectStore.getProjectById(
    parseInt(router.currentRoute.value.params.id as string),
  )
  .then(_ => projectStore.validateSelectedProject())
})
</script>

<template>
  <div class="h-screen w-screen p-5 flex">
    <div class="w-10 bg-green-600 rounded-full">menu</div>
    <div v-if="projectStore.selectedProject" class="flex-grow px-5">
      <ProjectHeader  :project="(projectStore.selectedProject as Project)" />
    </div>
  </div>
</template>
