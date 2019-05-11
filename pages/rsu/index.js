export default {
  data() {
    return {
      count: '',
      found: '',
      geo: {},
      isActive: false,
      isFullPage: true,
      isOpen: false,
      loading: true,
      newRsus: [],
      nextPage: '',
      pagRsus: [],
      placeId: '',
      query: '',
      rsu: {},
      rsus: []
    }
  },

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
