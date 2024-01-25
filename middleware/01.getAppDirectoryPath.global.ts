import { useAppStore } from "~/stores/app"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const appStore = useAppStore()
  await appStore.fetchAppDirectoryPath()
})
