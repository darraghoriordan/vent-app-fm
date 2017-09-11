new Vue({
  el: '#editor',
  data: {
    inputvent: '',
    placeholderMessage: "start venting..."
  },
  watch: {

    inputvent: function (ventText) {
      this.ventamatic()
    }
  },
  methods: {
    ventamatic: _.debounce(function (e) {
      this.inputvent = '';
      this.placeholderMessage = this.selectNewPlaceholderMessage();
    }, 3000),
    selectNewPlaceholderMessage: function () {
      const messages = ["start venting...", "keep going...", "I need to hear more...", "You'll feel better soon..."];
      let selectedIndex = Math.floor((Math.random() * messages.length));
      return messages[selectedIndex];
    }
  }
})