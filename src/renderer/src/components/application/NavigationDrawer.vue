<script setup lang="ts">
  import routes from '@/router/mainRoutes'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'

  const router = useRouter()
  const { t } = useI18n({ useScope: 'global' })

  const routeItems = routes()
  const sideBarItems = routeItems
</script>
<template>
  <v-navigation-drawer
    class="lateral-drawer"
    app
    absolute
  >
    <v-col
      no-gutters
      class="d-flex flex-column pa-0"
      style="height: 100%"
    >
      <v-list
        density="default"
        class="ma-2"
      >
        <v-list-item
          v-for="item in sideBarItems"
          :key="item.name"
          draggable="false"
          :to="item.path"
          rounded="5"
          color="primary"
          :title="t(`menu.${item.name as string}`)"
          :active="item.path == router.currentRoute.value.path"
          :prepend-icon="item?.meta?.icon as string"
        />
      </v-list>
    </v-col>
  </v-navigation-drawer>
</template>
<style lang="css" scoped>
  .lateral-drawer {
    user-select: none;
  }
</style>
