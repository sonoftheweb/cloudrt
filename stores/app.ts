import { appDataDir } from '@tauri-apps/api/path'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('api', () => {
  const appPath = ref<string | null>(null)
  const slideOverConfig = ref<{ show: boolean; component: Object | null }>({
    show: false,
    component: null,
  })

  async function fetchAppDirectoryPath() {
    try {
      if (!appPath.value) appPath.value = await appDataDir()
    } catch (error) {
      console.error('Failed to fetch app directory path:', error)
    }
  }

  function showSlideOver(component: Object) {
    slideOverConfig.value = {
      show: true,
      component: markRaw(component),
    }
  }

  function hideSlideOver() {
    slideOverConfig.value = {
      show: false,
      component: null,
    }
  }

  return {
    appPath,
    slideOverConfig,
    showSlideOver,
    hideSlideOver,
    fetchAppDirectoryPath,
  }
})
