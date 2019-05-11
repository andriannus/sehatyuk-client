<template>
  <div id="container">
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
            Daftar Puskesmas
          </h1>

          <p
            v-if="!loading"
            class="subtitle"
          >
            Ada {{ count }} Puskesmas di DKI Jakarta
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
                placeholder="Cari nama puskesmas disini..."
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

          <!-- Puskesmas Tidak Ditemukan -->
          <div
            v-if="!found"
            class="box has-text-centered"
          >
            <p class="title">
              <i class="fas fa-sad-tear fa-2x" />
            </p>

            <p class="subtitle">
              Puskesmas <strong>{{ query }}</strong> tidak ditemukan
            </p>
          </div>
          <!-- Akhir Puskesmas Tidak Ditemukan -->

          <!-- Collapse Data Puskesmas -->
          <template
            v-if="!loading && newPuskesmases && found"
          >
            <b-collapse
              v-for="(puskesmas, index) in pagPuskesmases.data"
              :key="puskesmas.id"
              :open="isOpen"
              class="card"
            >
              <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                  {{ puskesmas.nama_Puskesmas }}
                </p>

                <a class="card-header-icon">
                  <b-icon
                    class="has-text-success"
                    pack="fas"
                    :icon="props.open ? 'caret-down' : 'caret-up'"
                  />
                </a>
              </div>

              <div class="card-content">
                <div class="field">
                  <label class="label">Alamat</label>

                  <div class="control">
                    <span>
                      <button
                        class="button is-success"
                        @click="showMap(index)"
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
                  <label class="label">Kepala Puskesmas</label>

                  <div class="control">
                    <span>{{ puskesmas.kepala_puskesmas }}</span>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Telepon</label>

                  <div class="control">
                    <span v-if="puskesmas.telepon[0] === ''">
                      -
                    </span>

                    <div
                      v-if="puskesmas.telepon[0] != ''"
                      class="tags"
                    >
                      <span
                        v-for="(t, iTelp) in puskesmas.telepon"
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
                    <span v-if="puskesmas.faximile[0] === ''">
                      -
                    </span>

                    <div
                      v-if="puskesmas.faximile[0] != ''"
                      class="tags"
                    >
                      <span
                        v-for="(f, iFax) in puskesmas.faximile"
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
                    <span v-if="!puskesmas.email">
                      -
                    </span>

                    <span v-if="puskesmas.email">
                      {{ puskesmas.email }}
                    </span>
                  </div>
                </div>
              </div>
            </b-collapse>
          </template>
          <!-- Akhir Collapse Data Puskesmas -->

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
  </div>
</template>

<script src="./index.js"></script>
