<template>
  <div >
    <ul id="example-1">
      <li v-for="item in items">
        {{ item.message }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
        items: [
          { message: 'Foo' },
          { message: 'Bar' }
        ]
      }
  }
}
</script>

