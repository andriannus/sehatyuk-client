<template>
  <div>
    <nav
      aria-label="main navigation"
      class="navbar is-fixed-top is-success"
      role="navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item">
          SEHAT YUK
        </a>

        <a
          :class="{ 'is-active': isActive }"
          aria-expanded="false"
          aria-label="menu"
          class="navbar-burger has-text-white"
          role="button"
          @click="switchMenu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': isActive }">
        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a
                  href="https://github.com/andriannus/sehatyuk-spa"
                  class="button is-dark"
                  target="_blank"
                >
                  <span class="icon">
                    <i class="fab fa-github" />
                  </span>

                  <span>Github</span>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <router-link class="navbar-item" to="/">
            Beranda
          </router-link>

          <router-link class="navbar-item" to="puskesmas">
            Puskesmas
          </router-link>

          <router-link class="navbar-item" to="rsk">
            Rumah Sakit Khusus
          </router-link>

          <router-link class="navbar-item" to="rsu">
            Rumah Sakit Umum
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data: () => ({
    isActive: false
  }),

  methods: {
    switchMenu() {
      this.isActive = !this.isActive
    }
  }
}
</script>
