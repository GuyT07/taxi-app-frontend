<template>
  <div ="hello">
    List
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'List',
  data () {
    return {
      msg: 'Welcome to List'
    }
  },
  methods: mapActions([
    'increment',
    'decrement'
  ])
}
</script>

