<template>
  <div id="rsk">
    <!-- Tampilan Loading -->
    <b-loading
      :is-full-page="isFullPage"
      :active="loading"
    />
    <!-- Akhir Tampilan Loading -->

    <!-- Header -->
    <section class="hero is-success is-bold m-t-52">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Daftar Rumah Sakit Khusus
          </h1>

          <p
            v-if="!loading"
            class="subtitle"
          >
            Ada {{ count }} RS Khusus di DKI Jakarta
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
                placeholder="Cari nama RS disini..."
                type="text"
                @input="fetchData()"
              >

              <span class="icon is-small is-right">
                <i class="fas fa-search" />
              </span>
            </div>
          </div>
          <!-- Akhir Pencarian -->

          <hr>

          <!-- RS Khusus Tidak Ditemukan -->
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
          <!-- Akhir RS Khusus Tidak Ditemukan -->

          <!-- Collapse Data RSK -->
          <template
            v-if="!loading && newRsks && found"
          >
            <b-collapse
              v-for="(rsk, iRsk) in pagRsks.data"
              :key="iRsk"
              class="card"
              :open="isOpen"
            >
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  RS {{ rsk.nama_rsk }}
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
                  <label class="label">Jenis RS Khusus</label>

                  <div class="control">
                    <span>{{ rsk.jenis_rsk }}</span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Alamat</label>
                  <div class="control">
                    <span>
                      <button
                        class="button is-success"
                        @click="showMap(iRsk)"
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
                    <span v-if="!rsk.website">
                      -
                    </span>

                    <a
                      v-if="rsk.website"
                      :href="`http://${rsk.website}`"
                      class="has-text-success"
                      target="_blank"
                    >
                      {{ rsk.website }}
                    </a>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Telepon</label>

                  <div class="control">
                    <span v-if="rsk.telepon[0] === ''">
                      -
                    </span>

                    <div
                      v-if="rsk.telepon[0] != ''"
                      class="tags"
                    >
                      <span
                        v-for="(t, iTelp) in rsk.telepon"
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
                    <span v-if="rsk.faximile[0] === ''">
                      -
                    </span>

                    <div
                      v-if="rsk.faximile[0] != ''"
                      class="tags"
                    >
                      <span
                        v-for="(f, iFax) in rsk.faximile"
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
                    <span v-if="!rsk.email">
                      -
                    </span>

                    <span v-if="rsk.email">
                      {{ rsk.email }}
                    </span>
                  </div>
                </div>
              </div>
            </b-collapse>
          </template>
          <!-- Akhir Collapse Data RSK -->

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
        aria-label="close"
        class="modal-close is-large"
        @click="reset"
      />
    </div>

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
  </div>
</template>

<script src="./index.js"></script>

<style>
#rsk {
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
