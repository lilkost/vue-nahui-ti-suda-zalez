<template>
  <div class="app">
      <Navbar></Navbar>
      <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
  export default {

  }
</script>

<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
</style>