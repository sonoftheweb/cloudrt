<script lang="ts" setup>
import SlideOver from '~/components/layout/SlideOver.vue'
import mitt from 'mitt'

const emitter = mitt()
const router = useRouter()

onMounted(() => {
  emitter.on('back', _ => router.back())
})
</script>

<template>
  <div class="w-screen h-screen">
    <SlideOver />
    <slot />
  </div>
</template>
