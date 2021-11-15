<template>
  <div id="restaurant-forum">
    <Navbar />
    <main class="py-5 bg-light" style="min-height: 100vh">
      <router-view/>
    </main>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style>


</style>
