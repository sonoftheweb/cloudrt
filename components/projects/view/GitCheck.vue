<script lang="ts" setup>
import type { GitSettings } from '~/types/git'
import AddRepositoryForm from '~/components/projects/view/AddRepositoryForm.vue'

const selectedProjectStore = useSelectedProjectStore()
const gitStore = useGitStore()
const gitSettings = ref<GitSettings | null>(null)
const { showSlideOver } = useAppStore()

onMounted(() => {
  gitSettings.value = gitStore.selectedProjectGit()
})

watch(
  () => selectedProjectStore.selectedProject,
  () => {
    gitSettings.value = gitStore.selectedProjectGit()
  },
)
</script>

<template>
  <div>
    <div v-if="gitSettings">git settings</div>
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
      >
        Add Git Repository
      </UButton>
    </div>
  </div>
</template>

<style scoped></style>
