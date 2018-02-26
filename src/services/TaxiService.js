import Vue from 'vue'

var BASE_URL = 'http://localhost:8083/api/'

export default {
  getTaxis () {
    return Vue.axios.get(BASE_URL + 'taxi').then(
       (response) => response.data
       ,
       (response) => response
     )
  },
  updateRit (rit) {
    let start = new Date(rit.start).getTime()
    return Vue.axios.put(BASE_URL + 'rit/' + rit.id, {
      id: rit.id,
      plaats: rit.plaats,
      date: start
    }).then(
       (response) => response.data,
       (response) => response
     )
  },
  updateTaxi (rit) {
    let start = new Date(rit.start).getTime()
    return Vue.axios.put(BASE_URL + 'taxi/' + rit.taxi_id, {
      id: rit.taxi_id,
      chauffeurNaam: rit.chauffeurNaam,
      ritten: [{
        id: rit.id,
        plaats: rit.plaats,
        date: start
      }]
    }).then(
       (response) => response.data,
       (response) => response
     )
  },

  deleteRit (ritId) {
    return Vue.axios.delete(BASE_URL + 'rit/' + ritId)
    .then(
       (response) => response.data,
       (response) => response
     )
  },

  createTaxiDrive (rit) {
    let start = new Date(rit.start).getTime()
    return Vue.axios.post(BASE_URL + 'taxi', {
      id: rit.taxi_id,
      ritten: [{
        plaats: rit.plaats,
        date: start
      }]
    }).then(
       (response) => response.data
       ,
       (response) => response
     )
  }
}
