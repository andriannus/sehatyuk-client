<template>
  <div id="rsu">
    <!-- Tampilan Loading -->
    <b-loading
      :active="loading"
      :is-full-page="isFullPage"
    />
    <!-- Akhir Tampilan Loading -->

    <!-- Header -->
    <section class="hero is-success is-bold m-t-52">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Daftar Rumah Sakit Umum
          </h1>

          <p
            v-if="!loading"
            class="subtitle"
          >
            Ada {{ count }} RS Umum di DKI Jakarta
          </p>
        </div>
      </div>
    </section>
    <!-- Akhir Header -->
    <section
      v-if="!loading"
      class="section"
    >
      <div class="columns is-mobile">
        <div class="column is-10 is-offset-1">
          <!-- Pencarian -->
          <div class="field">
            <div class="control has-icons-right">
              <input
                v-model="query"
                class="input"
                type="text"
                placeholder="Cari nama RS disini..."
                @input="fetchData()"
              >

              <span class="icon is-small is-right">
                <i class="fas fa-search" />
              </span>
            </div>
          </div>
          <!-- Akhir Pencarian -->

          <hr>

          <!-- RS Umum Tidak Ditemukan -->
          <div
            v-if="!found"
            class="box has-text-centered"
          >
            <p class="title">
              <i class="fas fa-sad-tear fa-2x" />
            </p>

            <p class="subtitle">
              RS <strong>{{ query }}</strong> tidak ditemukan
            </p>
          </div>
          <!-- Akhir RS Umum Tidak Ditemukan -->

          <template
            v-if="!loading && newRsus && found"
          >
            <!-- Collapse Data RSU -->
            <b-collapse
              v-for="(rsu, iRsu) in pagRsus.data"
              :key="iRsu"
              :open="isOpen"
              class="card"
            >
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  RS {{ rsu.nama_rsu }}
                </p>

                <a class="card-header-icon">
                  <b-icon
                    :icon="props.open ? 'caret-down' : 'caret-up'"
                    class="has-text-success"
                    pack="fas"
                  />
                </a>
              </div>

              <div class="card-content">
                <div class="field">
                  <label class="label">Jenis RS Umum</label>

                  <div class="control">
                    <span>{{ rsu.jenis_rsu }}</span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Alamat</label>

                  <div class="control">
                    <span>
                      <button
                        class="button is-success"
                        @click="showMap(iRsu)"
                      >
                        <span>Tampilkan Peta</span>

                        <span class="icon">
                          <i class="fas fa-eye" />
                        </span>
                      </button>
                    </span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Website</label>

                  <div class="control">
                    <span v-if="!rsu.website">
                      -
                    </span>

                    <a
                      v-if="rsu.website"
                      :href="`http://${rsu.website}`"
                      class="has-text-success"
                      target="_blank"
                    >
                      {{ rsu.website }}
                    </a>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Telepon</label>
                  <div class="control">
                    <span v-if="rsu.telepon[0] === ''">
                      -
                    </span>

                    <div
                      v-if="rsu.telepon[0] != ''"
                      class="tags"
                    >
                      <span
                        v-for="(t, iTelp) in rsu.telepon"
                        :key="iTelp"
                        class="tag is-medium is-success is-rounded"
                      >
                        {{ t }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Fax</label>

                  <div class="control">
                    <span v-if="rsu.faximile[0] === ''">
                      -
                    </span>

                    <div
                      v-if="rsu.faximile[0] != ''"
                      class="tags"
                    >
                      <span
                        v-for="(f, iFax) in rsu.faximile"
                        :key="iFax"
                        class="tag is-medium is-success is-rounded"
                      >
                        {{ f }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Email</label>

                  <div class="control">
                    <span v-if="!rsu.email">
                      -
                    </span>

                    <span v-if="rsu.email">
                      {{ rsu.email }}
                    </span>
                  </div>
                </div>
              </div>
            </b-collapse>
            <!-- Akhir Collapse Data RSU -->
          </template>

          <!-- Pagination -->
          <div
            v-if="nextPage"
            class="has-text-centered m-t-20"
          >
            <button
              class="button is-success"
              @click="fetchData(nextPage)"
            >
              Lebih Banyak
            </button>
          </div>
          <!-- Akhir Pagination -->
        </div>
      </div>
    </section>

    <div
      v-if="isActive"
      :class="{ 'is-active': isActive }"
      class="modal maps"
    >
      <div
        class="modal-background"
        @click="reset"
      />

      <div class="modal-card">
        <section class="modal-card-body maps-card">
          <iframe
            :src="`https://maps.google.com/maps?q=${geo.lat},${geo.lng}&hl=es;z=14&amp;output=embed`"
            width="100%"
            frameborder="0"
            style="border:0; height: 100%"
            allowfullscreen
          />
        </section>
      </div>

      <button
        class="modal-close is-large"
        aria-label="close"
        @click="reset"
      />
    </div>

    <back-to-top
      v-if="!isActive"
      visibleoffset="800"
      bottom="50px"
      right="50px"
    >
      <button class="button is-dark is-large">
        <i class="fas fa-chevron-circle-up" />
      </button>
    </back-to-top>
  </div>
</template>

<script>
export default {
  data: () => ({
    rsus: [],
    newRsus: [],
    pagRsus: [],
    rsu: {},
    placeId: '',
    nextPage: '',
    count: '',
    query: '',
    found: '',
    geo: {},
    isOpen: false,
    isActive: false,
    isFullPage: true,
    loading: true
  }),

  mounted() {
    this.getData()
  },

  methods: {
    // Mengambil data seluruh RSU dari cURL
    getData() {
      this.$axios.$get('rs-umum')
        .then((res) => {
          this.rsus = res.data.data
          this.count = res.data.data.length
          this.fetchData()
          this.loading = false
        })

        .catch(() => {
          alert('Terjadi error. Silahkan refresh halaman atau coba lagi nanti.')
        })
    },

    // Membuat array baru untuk membuat fitur 'cari'
    fetchData(page) {
      this.loading = true

      this.newRsus = []
      const query = this.query.toLowerCase()
      this.rsus.map((rsu) => {
        if (rsu.nama_rsu.toLowerCase().indexOf(query) !== -1) {
          this.newRsus.push(rsu)
        }
      })

      if (this.newRsus.length < 1) {
        this.found = false
      } else {
        this.found = true
      }

      this.loading = false

      if (page) {
        const res = this.paginator(this.newRsus, page, 5)
        this.pagRsus.data.push(...res.data)
        this.nextPage = res.nextPage
      } else {
        this.pagRsus = this.paginator(this.newRsus, 1, 5)
        this.nextPage = this.pagRsus.nextPage
      }
    },

    // Membuat Pagination
    paginator(arr, page, perPage) {
      const offset = (page - 1) * perPage
      const totalPage = Math.ceil(arr.length / perPage)
      const data = arr.slice(offset, offset + perPage)

      return {
        page: page,
        perPage: perPage,
        prevPage: page - 1 ? page - 1 : null,
        nextPage: (totalPage > page) ? page + 1 : null,
        total: arr.length,
        totalPage: totalPage,
        data: data
      }
    },

    // Menampilkan Peta
    showMap(index) {
      const lat = this.rsus[index].location.latitude
      const lng = this.rsus[index].location.longitude

      const latLng = {
        lat: lat,
        lng: lng
      }

      this.geo = latLng
      this.isActive = true

      this.$snackbar.open({
        type: 'is-danger',
        message: 'Lokasi peta mungkin tidak akurat. Silahkan cek kembali',
        duration: 5000
      })
    },

    reset() {
      this.placeId = ''
      this.isActive = false
    }
  }
}
</script>

<style>
#rsu {
  min-height: 92vh;
}

.m-t-52 {
  margin-top: 52px;
}

.m-t-20 {
  margin-top: 20px;
}

.maps {
  z-index: 1000;
}

.maps-card {
  height: 75vh;
  overflow: hidden;
}

.card-content {
  word-break: break-all;
}
</style>
