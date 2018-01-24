<template>

    <ul>
      <li v-for="user in users">
        <a class="button" href="#">
          {{ user.firstname }}
          {{ user.lastname }}
        </a>
      </li>
    </ul>

</template>

<script>
export default {
  name: 'List',
  data() {
    return {
        users: [
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
            lastname: 'Likes Vue.js'
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
      }
  }
}
</script>

<style scoped>


</style>

