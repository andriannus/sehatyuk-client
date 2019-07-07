export default {
  head() {
    return {
      title: 'Puskesmas - Sehat Yuk',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Cari Puskesmas di daerah DKI Jakarta'
        },
        {
          hid: 'title',
          name: 'title',
          content: 'Puskesmas - Sehat Yuk'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Cari Puskesmas di daerah DKI Jakarta'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Puskesmas - Sehat Yuk'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: 'https://sehatyuk.netlify.com/puskesmas'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Cari Puskesmas di daerah DKI Jakarta'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Puskesmas - Sehat Yuk'
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
      newPuskesmases: [],
      nextPage: '',
      pagPuskesmases: [],
      puskesmas: {},
      puskesmases: [],
      query: '',
      visibleInfoWindow: 'none'
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    // Mengambil data seluruh puskesmas dari cURL
    getData() {
      this.$axios.$get('puskesmas')
        .then((res) => {
          this.puskesmases = res.data.data
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

      this.newPuskesmases = []
      const query = this.query.toLowerCase()

      this.puskesmases.map((puskesmas) => {
        if (puskesmas.nama_Puskesmas.toLowerCase().indexOf(query) !== -1) {
          this.newPuskesmases.push(puskesmas)
        }
      })

      this.found = this.newPuskesmases.length > 1
      this.loading = false

      if (page) {
        const res = this.paginator(this.newPuskesmases, page, 5)
        this.pagPuskesmases.data.push(...res.data)
        this.nextPage = res.nextPage
      }

      this.pagPuskesmases = this.paginator(this.newPuskesmases, 1, 5)
      this.nextPage = this.pagPuskesmases.nextPage
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
      const lat = this.puskesmases[index].location.latitude
      const lng = this.puskesmases[index].location.longitude

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
