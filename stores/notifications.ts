import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/plugin-notification'
import { defineStore } from 'pinia'
import type { SystemNotification } from '~/types/notification'

export const useNotificationsStore = defineStore('notification', () => {
  const permissionGranted = ref<boolean>(false)

  async function fireSystemNotification(data: SystemNotification) {
    permissionGranted.value = await isPermissionGranted()
    if (!permissionGranted.value) {
      const permission = await requestPermission()
      permissionGranted.value = permission === 'granted'
    }
    if (permissionGranted) {
      sendNotification(data)
    }
  }

  return {
    permissionGranted,
    fireSystemNotification,
  }
})
