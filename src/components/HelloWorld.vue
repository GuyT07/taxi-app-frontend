<template>
  <div>
    <h1>{{ msg }}</h1>

    <p>Store count: {{ $store.state.count }}</p>
    <button class="btn btn-success" @click="increment">+</button>
    <button class="btn btn-danger" @click="decrement">-</button>

    <p><a class="button" href="#/list">Cool list</a></p>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to the Kudos App'
    }
  },
  methods: mapActions([
    'increment',
    'decrement'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
