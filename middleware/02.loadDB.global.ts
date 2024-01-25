import { useDbStore } from "~/stores/db"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const dbStore = useDbStore()
  await dbStore.loadDatabase()
})
