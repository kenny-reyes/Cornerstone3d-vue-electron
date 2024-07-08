<script setup lang="ts">
  import { init as csRenderInit, RenderingEngine, type Types, Enums } from '@cornerstonejs/core'
  import { init as csToolsInit } from '@cornerstonejs/tools'
  import { createImageIdsAndCacheMetaData } from '@/helpers'
  import { type Ref, ref } from 'vue'
  import initCornerstoneDICOMImageLoader from '@/helpers/initCornerstoneDICOMImageLoader'
  // import initCornerstoneWADOImageLoader from '@/helpers/initCornerstoneWADOmageLoader'

  const { ViewportType } = Enums
  const content: Ref<HTMLDivElement | undefined> = ref()

  const load = async (): Promise<void> => {
    const element = document.createElement('div')
    element.id = 'cornerstone-element'
    element.style.width = 'auto'
    element.style.height = '100%'
    // @ts-ignore
    content.value.appendChild(element)

    const imageIds = await createImageIdsAndCacheMetaData({
      StudyInstanceUID: '1.2.826.0.1.3680043.8.1055.1.20111103111148288.98361414.79379639',
      SeriesInstanceUID: '1.2.826.0.1.3680043.8.1055.1.20111103111204584.92619625.78204558',
      wadoRsRoot: 'http://localhost:8080/dicom-web' // ADD HERE YOUR SERVER
    })

    async function run(): Promise<void> {
      // TODO: This is not necessary
      //initProviders()
      // TODO: This is necessary
      initCornerstoneDICOMImageLoader()
      // initCornerstoneWADOImageLoader()
      await csRenderInit()
      csToolsInit()

      // Instantiate a rendering engine
      const renderingEngineId = 'myRenderingEngine'
      const renderingEngine = new RenderingEngine(renderingEngineId)
      // Create a stack viewport
      const viewportId = 'CT_STACK'
      const viewportInput = {
        viewportId,
        type: ViewportType.STACK,
        element,
        defaultOptions: {
          background: [1, 0.5, 1]
        }
      }
      // @ts-ignore
      renderingEngine.enableElement(viewportInput)
      // Get the stack viewport that was created
      const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)
      // Define a stack containing a single image
      const stack = [imageIds[0]]
      // Set the stack on the viewport
      await viewport.setStack(stack)
      // Set the VOI of the stack
      // Render the image
      viewport.render()
    }

    await run()
  }
</script>

<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div
      ref="content"
      style="width: 100%; height: 100%"
    >
      <!-- <div
      class="w-full h-full"
      ref="element"
      onContextMenu="() => false"
      onMouseDown="() => false"
    ></div> -->
      <!-- <div>WW/WC: {{ wwc }}</div>
    <div>Render Time: {{ renderTime }}</div> -->
    </div>
    <v-btn
      @click="load"
      variant="elevated"
      class="helloButton"
      >Load image</v-btn
    >
  </div>
</template>

<style>
  .helloButton {
    position: absolute;
    top: 50px;
    left: 50px;
  }
</style>
