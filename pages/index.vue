<script lang="ts" setup>
const projects = ref()
const cliStore = useCliStore()
const notificationStore = useNotificationsStore()

onMounted(() => {
  cliStore.checkAwsCli().then(() => {
    notificationStore.fireSystemNotification({
      title: cliStore.awsCliInstalled ? 'AWS CLI found' : 'AWS CLI missing',
      body: cliStore.awsCliInstalled ? 'Has AWS' : 'No AWS',
    })
    console.log(cliStore.awsCliInstalled)
  })
})
</script>

<template>
  <div class="h-screen w-screen p-5">
    <div>
      <div class="p-3">
        <UButton
          icon="i-heroicons-pencil-square"
          size="sm"
          :ui="{ rounded: 'rounded-full' }"
        >
          Add new project
        </UButton>
      </div>
    </div>
  </div>
</template>
