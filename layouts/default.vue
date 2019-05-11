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
  head() {
    return {
      meta: [
        {
          hid: 'og:image',
          content: 'https://sehatyuk.netlify.com/logo.png',
          property: 'og:image'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Sehat Yuk'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'site.personal'
        },
        {
          hid: 'twitter:card',
          content: 'summary_large_image',
          name: 'twitter:card'
        },
        {
          hid: 'twitter:image',
          content: 'https://sehatyuk.netlify.com/logo.png',
          name: 'twitter:image'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: 'Sehat Yuk'
        }
      ]
    }
  },
  components: {
    Navigation
  }
}
</script>
