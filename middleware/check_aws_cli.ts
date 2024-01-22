export default defineNuxtRouteMiddleware((to, from) => {
  const { checkAwsCli } = useCliStore()

  checkAwsCli()
})
