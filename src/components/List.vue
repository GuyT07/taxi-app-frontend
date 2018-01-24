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
import UserService from '../services/UserService.js'
var userService = new UserService()
export default {
  name: 'List',
  data () {
    return {
      users: []
    }
  },
  methods: {
    getUsers: function () {
      this.users = userService.getUsers();
    }
  },
  created () {
    this.getUsers()
  }
}
</script>

<style scoped>


</style>

