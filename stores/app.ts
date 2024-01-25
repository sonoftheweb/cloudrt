import { appDataDir } from '@tauri-apps/api/path'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('api', () => {
  const appPath = ref<string | null>(null)

  async function fetchAppDirectoryPath() {
    try {
      if (!appPath.value) appPath.value = await appDataDir()
    } catch (error) {
      console.error('Failed to fetch app directory path:', error)
    }
  }

  return {
    appPath,
    fetchAppDirectoryPath,
  }
})
