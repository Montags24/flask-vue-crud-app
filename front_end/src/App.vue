<template>
  <div class="container">
    <RouterView :books="books" />
  </div>
</template>

<script>
import { reactive } from 'vue';

import Books from '@/js/Books.js'
const books = reactive(new Books())


export default {
  data() {
    return {
      books: books,
    };
  },
  methods: {
    // Any additional methods can be added here
  },
  created() {
    // Execute logic when the component is created, if needed
  },
  beforeUnmount() {
    // Cleanup logic before the component is unmounted, if needed
  },
};
</script>

<style>
#app {
  margin-top: 60px;
}
</style>