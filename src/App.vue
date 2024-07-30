<script setup lang="ts">
import CesiumVue from "./ui/components/Cesium.vue";
import TableVue from "./ui/components/Table.vue";

import { controllerFlyingEye } from "./infrastructure/controller";
import { onMounted, ref } from "vue";
const devices = ref<any[]>([]);
onMounted(async () => {
  devices.value = await new controllerFlyingEye().fetchDevices();
});
</script>

<template>
  <div style="height: 70%">
    <TableVue :devices="devices"></TableVue>
    <CesiumVue />
  </div>
</template>

<style scoped></style>
