<script setup lang="ts">
  const props = defineProps<{
    icon: string | undefined
  }>()
</script>

<template>
  <v-icon
    v-if="props.icon?.startsWith('mdi-')"
    :icon="props.icon"
    v-bind="$attrs"
  />
  <v-icon
    v-else
    v-bind="$attrs"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path :d="props.icon" />
    </svg>
  </v-icon>
</template>
