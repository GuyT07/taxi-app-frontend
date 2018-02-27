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
  getTaxi (id) {
    return Vue.axios.get(BASE_URL + 'taxi/' + id).then(
       (response) => response.data
       ,
       (response) => response
     )
  },

  updateTaxi (taxi) {
    return Vue.axios.put(BASE_URL + 'taxi/' + taxi.taxi_id, {
      id: taxi.taxi_id,
      chauffeurNaam: taxi.name,
      emailChauffeur: taxi.mail,
      typeAuto: taxi.type
    }).then(
       (response) => response.data,
       (response) => response
     )
  },

  updateTaxiRit (taxi) {
    let start = new Date(taxi.start).getTime()
    return Vue.axios.put(BASE_URL + 'taxi/' + taxi.taxi_id, {
      id: taxi.taxi_id,
      ritten: [{
        id: taxi.id,
        plaats: taxi.plaats,
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

  deleteTaxi (taxiId) {
    return Vue.axios.delete(BASE_URL + 'taxi/' + taxiId)
    .then(
       (response) => response.data,
       (response) => response
     )
  },

  createTaxiDrive (taxi) {
    let start = new Date(taxi.start).getTime()
    return Vue.axios.post(BASE_URL + 'taxi', {
      id: taxi.taxi_id,
      ritten: [{
        plaats: taxi.plaats,
        date: start
      }]
    }).then(
       (response) => response.data,
       (response) => response
     )
  },

  createTaxi (taxi) {
    return Vue.axios.post(BASE_URL + 'taxi', {
      chauffeurNaam: taxi.name,
      emailChauffeur: taxi.mail,
      typeAuto: taxi.type
    }).then(
       (response) => response.data
       ,
       (response) => response
     )
  }
}
