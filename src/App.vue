<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Cesium/>
  </div>
</template>

<script>
 import Cesium from './components/Cesium.vue'

export default {
  name: 'app',
  components: {
    Cesium
  }
}
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
