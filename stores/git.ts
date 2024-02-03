import { defineStore } from 'pinia'
import type { GitProviders, GitSettings } from '~/types/git'

export const useGitStore = defineStore('git', () => {
  const { database } = useDbStore()
  const selectedProjectStore = useSelectedProjectStore()
  const gitProviders = ref<GitProviders[]>([])

  function getAllGitProviders(): void {
    database?.select('select * from GitProvider').then(response => {
      gitProviders.value = response as GitProviders[]
    })
  }

  function selectedProjectGit(): GitSettings | null {
    if (
      typeof selectedProjectStore.selectedProject?.git_settings === 'string'
    ) {
      return JSON.parse(
        selectedProjectStore.selectedProject?.git_settings as string,
      ) as GitSettings
    }

    return selectedProjectStore.selectedProject
      ?.git_settings as GitSettings | null
  }

  return {
    gitProviders,
    getAllGitProviders,
    selectedProjectGit,
  }
})
