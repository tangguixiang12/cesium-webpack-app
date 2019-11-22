<template>
  <div id="cesiumContainer">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld/> -->
  </div>
</template>

<script>

import * as Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
export default {
  name: 'Cesium',
  // components: {
  //   HelloWorld
  // },
  mounted(){


var viewer = new Cesium.Viewer('cesiumContainer');
  }
}
</script>

<style lang="scss">

@import '../css/main.scss';
</style>
