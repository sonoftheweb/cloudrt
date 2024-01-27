<script lang="ts" setup>
const appStore = useAppStore()
</script>

<template>
  <USlideover v-model="appStore.slideOverConfig.show">
    <div class="p-4 flex-1">
      <component :is="appStore.slideOverConfig.component" />
    </div>
  </USlideover>
</template>
