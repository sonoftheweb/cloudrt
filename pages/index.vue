<script lang="ts" setup>
import { useAppStore } from '~/stores/app'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import CreateProjectForm from '~/components/projects/CreateProjectForm.vue'

const appStore = useAppStore()
const projectStore = useProjectsStore()

onMounted(() => {
  projectStore.getAllProjects()
})
</script>

<template>
  <div class="h-screen w-screen p-5">
    <div>
      <div class="p-3" v-if="projectStore.projects.length">
        <h3 class="text-3xl font-extrabold">Projects</h3>
        <p class="mb-5 text-xs">
          You have {{ projectStore.projects.length }}
          {{ projectStore.projects.length === 1 ? 'project' : 'projects' }}
        </p>
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          :ui="{ rounded: 'rounded-full' }"
          @click="appStore.showSlideOver(CreateProjectForm)"
        >
          Add new project
        </UButton>
        <div class="mt-5 grid grid-cols-1 md:grid-cols-5 gap-5">
          <ProjectCard
          @click="navigateTo(`/projects/${project.project_id}`)"
            class="cursor-pointer"
            v-for="project in projectStore.projects"
            :key="project.project_id"
            :project="project"
          />
        </div>
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
