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
      //this.ventamatic()
    }
  },
  methods: {
    testing: function () {
      return false;//window.location.hostname !== "ventapp.darraghoriordan.com";
    },
    ventamatic: function () {
      if (this.inputvent == '') {
        return;
      }

      this.placeholderMessage = this.selectNewPlaceholderMessage();
      var vm = this
      if (!this.testing()) {
        axios.post('https://language.googleapis.com/v1beta2/documents:analyzeEntitySentiment?key=AIzaSyAWKv1YUXcdBVvE0WRXfS_ArCnDJlgGzO8', {
            "encodingType": "UTF8",
            "document": {
              "type": "PLAIN_TEXT",
              "content": this.inputvent
            }
          })
          .then(function (response) {
            const entities = response.data.entities;
            let responseNode = document.createElement("div");
            responseNode.appendChild(document.createTextNode("Bot: I detected the following entities and sentiments:"));
            responseNode.appendChild(document.createElement("br"))

            entities.forEach((entity) => {
              responseNode.appendChild(document.createTextNode(`  Name: ${entity.name}`));
              responseNode.appendChild(document.createElement("br"))
              responseNode.appendChild(document.createTextNode(`  Type: ${entity.type}`));
              responseNode.appendChild(document.createElement("br"))
              responseNode.appendChild(document.createTextNode(`  Score: ${entity.sentiment.score}`));
              responseNode.appendChild(document.createElement("br"))
              responseNode.appendChild(document.createTextNode(`  Magnitude: ${entity.sentiment.magnitude}`));
              responseNode.appendChild(document.createTextNode("--------------------------------"));
              responseNode.appendChild(document.createElement("br"))
            });
            let responseContainer = document.getElementById("response")
            responseContainer.appendChild(responseNode)
          })
          .catch(function (error) {
            console.error('Error! Could not reach the API. ' + error)
          })
      }
      this.inputvent = '';
    },
    selectNewPlaceholderMessage: function () {
      const messages = ["start venting...", "keep going...", "I need to hear more...", "You'll feel better soon..."];
      let selectedIndex = Math.floor((Math.random() * messages.length));
      return messages[selectedIndex];
    }
  }
})