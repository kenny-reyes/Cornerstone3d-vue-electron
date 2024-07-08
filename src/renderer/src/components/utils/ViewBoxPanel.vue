<script setup lang="ts">
  import { ref, onMounted, Ref } from 'vue'
  import 'vue3-resize/dist/vue3-resize.css'

  const bodyMapContainer: Ref<HTMLDivElement | undefined> = ref()
  const scalableContainer: Ref<HTMLDivElement | undefined> = ref()
  const scale = ref(0)

  onMounted(() => {
    doResize(bodyMapContainer.value?.offsetWidth as number, bodyMapContainer.value?.offsetHeight as number)
  })

  const handleResize = ({ width, height }: { width: number; height: number }): void => {
    doResize(width, height)
  }

  const doResize = (width: number | null, height: number | null): void => {
    if (!width || !height) return
    const innerWidth = scalableContainer?.value?.offsetWidth as number
    const innerHeight = scalableContainer.value?.offsetHeight as number

    scale.value = Math.min(width / innerWidth, height / innerHeight)
  }
</script>

<template>
  <div
    ref="bodyMapContainer"
    class="body-map-container"
  >
    <resize-observer @notify="handleResize" />
    <div
      ref="scalableContainer"
      class="scalable-container"
      :style="{ transform: 'translate(-50%, -50%) ' + 'scale(' + scale + ')' }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<style>
  .body-map-container {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    left: 0%;
  }
  .scalable-container {
    width: 1000px;
    height: 750px;
    padding: 5px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transform-origin: center center;
  }
</style>
