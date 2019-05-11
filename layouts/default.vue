<template>
  <div>
    <Navigation />

    <router-view />

    <no-ssr>
      <back-to-top
        v-if="!isActive"
        bottom="50px"
        right="50px"
        visibleoffset="800"
      >
        <button class="button is-dark is-large">
          <i class="fas fa-chevron-circle-up" />
        </button>
      </back-to-top>
    </no-ssr>
  </div>
</template>

<script>
import Navigation from '../components/Navigation.vue'

export default {
  name: 'Header',

  components: {
    Navigation
  }
}
</script>
