<script setup lang="ts">
import type { Project } from '~/types/project'
import ProjectIcon from './ProjectIcon.vue'

defineProps<{ project: Project }>()
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-md shadow px-6 py-5 hover:bg-white/50 dark:hover:bg-gray-900/50 transition-all ease-out duration-200"
  >
    <div class="flex justify-between">
      <h4 class="font-medium mb-3">{{ project.project_name }}</h4>
      <ProjectIcon :project="project" />
    </div>
    <p class="text-xs mt-1 truncate">{{ project.project_description }}</p>
  </div>
</template>
