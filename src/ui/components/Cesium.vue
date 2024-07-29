<template>
  <container id="container-cesium"></container>
</template>
<script setup lang="ts">
import { createCesiumViewer } from "../../infrastructure/cesiumViewer";
import * as Cesium from "cesium";
import { ref, onMounted } from "vue";
const viewer = ref<Cesium.Viewer | null>(null);
onMounted(() => {
  viewer.value = createCesiumViewer(
    document.getElementById("container-cesium") as HTMLElement
  );
});
</script>
