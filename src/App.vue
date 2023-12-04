<template>
  <!-- Header -->
  <AppHeader />

  <RouterView v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <!-- without route.name no data rendered on the page -->
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </RouterView>
  <!-- Player -->
  <AppPlayer />
  <!-- Auth -->
  <Auth />
</template>

<script>
import { mapWritableState } from 'pinia'
import useUserStore from './stores/user'
import { auth } from './includes/firebase'

import AppHeader from './components/AppHeader.vue'
import Auth from './components/Auth.vue'
import AppPlayer from './components/Player.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    Auth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s linear;
}
.fade-leave-to {
  transition: all 0.5 linear;
  opacity: 0;
}
</style>
