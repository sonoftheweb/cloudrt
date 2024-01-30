<script lang="ts" setup>
import type { Project } from '~/types/project'
import ProjectIcon from '~/components/projects/ProjectIcon.vue'

defineProps<{
  project: Project
}>()
const router = useRouter()

const back = () => {
  router.back()
}
</script>

<template>
  <div>
    <div class="flex items-center">
      <UButton
        @click="back"
        icon="i-heroicons-arrow-small-left"
        size="xs"
        class="mr-3"
        :ui="{ rounded: 'rounded-full' }"
        >back</UButton
      >
      <h3 class="text-3xl font-extrabold mr-3">{{ project.project_name }}</h3>
      <ProjectIcon class="mt-3" :project="project" />
    </div>
    <div class="w-1/3 mt-3">
      <small>{{ project.project_description }}</small>
    </div>
  </div>
</template>

<style scoped></style>
