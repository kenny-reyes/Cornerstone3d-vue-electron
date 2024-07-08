<script setup lang="ts">
  export interface Props {
    title: string
    detail: Record<string, Array<string>>
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    detail: () => {
      return {}
    }
  })
</script>

<template>
  <div>
    <b>{{ props.title }}</b>
    <p
      v-for="(items, field) in props.detail"
      :key="'toast-field-' + field"
    >
      {{ field }}:
      <br />
      <span
        v-for="(item, index) in items"
        :key="'toast-item-' + index"
      >
        - {{ item }}.
      </span>
      <br />
    </p>
  </div>
</template>
