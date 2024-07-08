<script setup lang="ts">
  import NavigationDrawer from '@/components/application/NavigationDrawer.vue'
</script>

<template>
  <v-layout draggable="false">
    <v-footer
      app
      color="footer"
      elevation="5"
    >
      <div class="footer">
        <v-spacer />
      </div>
    </v-footer>

    <v-app-bar
      app
      color="appBar"
    >
      <v-app-bar-nav-icon />
      <v-app-bar-title>
        <v-btn height="38"> </v-btn>
      </v-app-bar-title>
      <v-spacer />
    </v-app-bar>
    <NavigationDrawer />

    <v-main class="main-content">
      <v-container
        fluid
        class="container-area"
        style="padding: 0px"
      >
        <router-view v-slot="{ Component, route }">
          <transition
            :name="(route.meta.transition as string) || 'fade'"
            mode="out-in"
          >
            <component
              :is="Component"
              :id="route.path"
            />
          </transition>
        </router-view>
      </v-container>
    </v-main>
    <v-navigation-drawer
      class="bottom-drawer"
      app
      location="bottom"
      temporary
      elevation="5"
    >
    </v-navigation-drawer>
  </v-layout>
</template>

<style scoped lang="css">
  .main-content {
    width: 100%;
    position: absolute;
    height: calc(100vh);
  }
  .container-area {
    height: 100%;
  }
  .footer {
    display: grid;
    grid-template-columns: 1fr auto;

    width: 100%;
    cursor: pointer;
  }
  .v-overlay__scrim {
    opacity: 0.8 !important;
  }
  .bottom-drawer {
    /* height: auto; */
  }

  /* router transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition:
      opacity 0.5s,
      transform 0.5s;
  }
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
    transform: translateX(-60%);
  }
  .moveUp-enter-active,
  .moveUp-leave-active {
    transition:
      opacity 0.4s,
      transform 0.4s;
  }
  .moveUp-enter-from,
  .moveUp-leave-to {
    opacity: 0;
    transform: translateY(-60%);
  }
</style>
