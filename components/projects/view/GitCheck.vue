<script lang="ts" setup>
import type { GitSettings } from '~/types/git'
import type { Project } from '~/types/project'
import AddRepositoryForm from '~/components/projects/view/AddRepositoryForm.vue'

const useProjectStore = useProjectsStore()
const gitSettings = ref<GitSettings | null>(null)
const { showSlideOver } = useAppStore()

onMounted(() => {
  gitSettings.value = useProjectStore.selectedProjectGit()
})
</script>

<template>
  <div>
    <div v-if="gitSettings">Component: projects/view/GitCheck</div>
    <div v-else>
      <h3 class="mb-2">Missing repository</h3>
      <p class="text-xs mb-2">
        This project does not have a git repository. Continous deployment
        features disabled.
      </p>
      <UButton
        @click="showSlideOver(AddRepositoryForm)"
        icon="i-heroicons-plus"
        size="xs"
        class="mr-3"
        :ui="{ rounded: 'rounded-full' }"
        >Add Git Repository</UButton
      >
    </div>
  </div>
</template>

<style scoped></style>
