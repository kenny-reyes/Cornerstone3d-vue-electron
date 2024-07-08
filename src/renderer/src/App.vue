<script setup lang="ts"></script>

<template>
  <v-app>
    <router-view
      v-slot="{ Component, route }"
      class="main-router"
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <component
          :is="Component"
          :id="route.path"
        />
      </transition>
    </router-view>
  </v-app>
</template>

<style>
  html {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }

  html::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .main-router {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
