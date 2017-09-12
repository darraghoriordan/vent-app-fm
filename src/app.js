new Vue({
  el: '#editor',

  data: {
    inputvent: '',
    placeholderMessage: "start venting...",
    rawSentiment: '',
    rawIntensity: ''
  },
  watch: {
    inputvent: function (ventText) {
      this.ventamatic()
    }
  },
  methods: {
    testing: function () {
      return window.location.hostname !== "ventapp.darraghoriordan.com";
    },
    ventamatic: _.debounce(function (e) {
      if (this.inputvent == '') {
        return;
      }

      this.placeholderMessage = this.selectNewPlaceholderMessage();
      var vm = this
      if (!this.testing()) {
        console.log("calling api with: " + this.inputvent);
        axios.post('https://language.googleapis.com/v1beta2/documents:analyzeEntitySentiment?key=AIzaSyAWKv1YUXcdBVvE0WRXfS_ArCnDJlgGzO8', {
            "encodingType": "UTF8",
            "document": {
              "type": "PLAIN_TEXT",
              "content": this.inputvent
            }
          })
          .then(function (response) {
            const entities = response.data.entities;
            let chatnode = document.createElement("div");
            chatnode.appendChild(document.createTextNode("Bot: I detected the following entities and sentiments:"));
            chatnode.appendChild(document.createElement("br"))

            entities.forEach((entity) => {
              chatnode.appendChild(document.createTextNode(`  Name: ${entity.name}`));
              chatnode.appendChild(document.createElement("br"))
              chatnode.appendChild(document.createTextNode(`  Type: ${entity.type}`));
              chatnode.appendChild(document.createElement("br"))
              chatnode.appendChild(document.createTextNode(`  Score: ${entity.sentiment.score}`));
              chatnode.appendChild(document.createElement("br"))
              chatnode.appendChild(document.createTextNode(`  Magnitude: ${entity.sentiment.magnitude}`));
              chatnode.appendChild(document.createTextNode("--------------------------------"));
            });
            chatnode.className += " bot-message"
            document.getElementById("chatlog").appendChild(chatnode)
          })
          .catch(function (error) {
            console.error('Error! Could not reach the API. ' + error)
          })
      }
      this.inputvent = '';
    }, 3000),
    selectNewPlaceholderMessage: function () {
      const messages = ["start venting...", "keep going...", "I need to hear more...", "You'll feel better soon..."];
      let selectedIndex = Math.floor((Math.random() * messages.length));
      return messages[selectedIndex];
    }
  }
})