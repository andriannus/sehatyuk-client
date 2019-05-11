<template>
  <div>
    <section class="hero is-success is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Selamat Datang di Website SEHAT YUK
          </h1>

          <p class="subtitle">
            Apa yang ingin Anda lihat?
          </p>

          <div class="columns is-mobile">
            <div class="column is-6 is-offset-3">
              <div class="columns">
                <div class="column">
                  <router-link
                    class="button is-success is-inverted is-fullwidth"
                    to="puskesmas"
                  >
                    Puskesmas
                  </router-link>
                </div>

                <div class="column">
                  <router-link
                    class="button is-success is-inverted is-fullwidth"
                    to="rsk"
                  >
                    RS Khusus
                  </router-link>
                </div>

                <div class="column">
                  <router-link
                    class="button is-success is-inverted is-fullwidth"
                    to="rsu"
                  >
                    RS Umum
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Temukan instansi kesehatan di DKI Jakarta - Sehat Yuk',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Cari RS Umum, RS Khusus, dan Puskesmas di daerah DKI Jakarta'
        },
        {
          hid: 'title',
          name: 'title',
          content: 'Temukan instansi kesehatan di DKI Jakarta - Sehat Yuk'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Cari RS Umum, RS Khusus, dan Puskesmas di daerah DKI Jakarta'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Temukan instansi kesehatan di DKI Jakarta - Sehat Yuk'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://sehatyuk.netlify.com/'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Cari RS Umum, RS Khusus, dan Puskesmas di daerah DKI Jakarta'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Temukan instansi kesehatan di DKI Jakarta - Sehat Yuk'
        }
      ]
    }
  }
}
</script>
