<template>
<div>
    <ul>
      <li v-for="user in users">
        <a class="button" href="#" v-on:click="isClicked = !isClicked">
          {{ user.firstname }}
          {{ user.lastname }}
        </a>
      </li>
    </ul>

    <p v-if="!isClicked">
      Click
   </p>
    <p v-else>
     Clack
   </p>

  </div>
</template>

<script>
import UserService from '../services/UserService.js'
var userService = new UserService()
export default {
  name: 'List',
  data () {
    return {
        isClicked: false,
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

