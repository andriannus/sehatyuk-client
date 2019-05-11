export default {
  head() {
    return {
      title: 'Rumah Sakit Khusus - Sehat Yuk',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Cari Rumah Sakit Khusus di daerah DKI Jakarta'
        },
        {
          hid: 'title',
          name: 'title',
          content: 'Rumah Sakit Khusus - Sehat Yuk'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Cari Rumah Sakit Khusus di daerah DKI Jakarta'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Rumah Sakit Khusus - Sehat Yuk'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://sehatyuk.netlify.com/rsk'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Cari Rumah Sakit Khusus di daerah DKI Jakarta'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Rumah Sakit Khusus - Sehat Yuk'
        }
      ]
    }
  },

  data() {
    return {
      count: '',
      found: '',
      geo: {},
      isActive: false,
      isFullPage: true,
      isOpen: false,
      loading: true,
      newRsks: [],
      nextPage: '',
      pagRsks: [],
      placeId: '',
      query: '',
      rsk: {},
      rsks: []
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    // Mengambi data seluruh RSK dari cURL
    getData() {
      this.$axios.$get('rs-khusus')
        .then((res) => {
          this.rsks = res.data.data
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

      this.newRsks = []
      const query = this.query.toLowerCase()
      this.rsks.map((rsk) => {
        if (rsk.nama_rsk.toLowerCase().indexOf(query) !== -1) {
          this.newRsks.push(rsk)
        }
      })

      if (this.newRsks.length < 1) {
        this.found = false
      } else {
        this.found = true
      }

      this.loading = false

      if (page) {
        const res = this.paginator(this.newRsks, page, 5)
        this.pagRsks.data.push(...res.data)
        this.nextPage = res.nextPage
      } else {
        this.pagRsks = this.paginator(this.newRsks, 1, 5)
        this.nextPage = this.pagRsks.nextPage
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
      const lat = this.rsks[index].location.latitude
      const lng = this.rsks[index].location.longitude

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
      this.geo = {}
      this.isActive = false
    }
  }
}
