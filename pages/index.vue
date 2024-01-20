<script lang="ts" setup>
const projects = ref()
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
