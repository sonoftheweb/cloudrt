<script lang="ts" setup>
const router = useRouter()

const props = defineProps<{
  projectId: number
}>()

const links = [
  {
    label: 'Project details',
    icon: 'i-heroicons-home-solid',
    to: `/${props.projectId}`,
  },
  {
    label: 'Git repository',
    icon: 'i-heroicons-rectangle-stack-solid',
    to: `/${props.projectId}/git`,
  },
]
</script>

<template>
  <div class="flex flex-col pt-5">
    <ULink v-for="(link, index) in links" :key="index" class="mb-5">
      <UTooltip :text="link.label" :popper="{ placement: 'right' }">
        <UIcon
          class="text-white w-5 h-auto"
          :name="link.icon"
          :dynamic="true"
        />
      </UTooltip>
    </ULink>
  </div>
</template>
