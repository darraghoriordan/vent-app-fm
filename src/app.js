new Vue({
  el: '#editor',
  data: {
    inputvent: 'start venting...'
  },
  watch: {
    
    inputvent: function (ventText) {
      this.ventamatic()
    }
  },
  methods: {
    ventamatic: _.debounce(function (e) {
      this.inputvent = ''
    }, 800)
  }
})