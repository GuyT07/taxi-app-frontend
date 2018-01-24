import Vue from 'vue'
export default class UserService {
  getUsers () {
    return [
      {
        firstname: 'Guy',
        lastname: ' O\'Green'
      },
      {
        firstname: 'Lydia',
        lastname: 'Live Fast'
      },
      {
        firstname: 'Willem',
        lastname: 'All under control'
      },
      {
        firstname: 'Linda',
        lastname: 'L-to-the Vue.js'
      },
      {
        firstname: 'GP',
        lastname: 'G-The-*************-P'
      },
      {
        firstname: 'Wesley',
        lastname: 'Whatevah'
      },
      {
        firstname: 'Ilonka',
        lastname: 'I-Repair'
      }
    ]
//      Vue.http.get('user').then(
//        (response) => {
//          succes(response.data)
//        },
//        (response) => {
//          error(response)
//        }
//      )
  }
}
