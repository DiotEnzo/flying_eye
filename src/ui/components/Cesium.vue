<template>
  <div class="p-6">Cesium Visualization</div>

  <div id="container-cesium"></div>

  <p style="display: flex; justify-content: center">
    Red point represent your drone, the arrow his direction and the grey line
    the all mouvements he will do
  </p>
  <div style="display: flex; justify-content: center">
    <v-btn @click="nextStep" color="primary" class="mx-2 my-2">Next Step</v-btn>
    <v-btn @click="previousStep" color="primary" class="mx-2 my-2"
      >Previous Step</v-btn
    >
    <v-btn @click="play" color="primary" class="mx-2 my-2">Play</v-btn>
    <v-btn @click="pause" color="primary" class="mx-2 my-2">Pause</v-btn>
  </div>
  <div>
    <v-card class="mx-4 my-4" style="width: 30%">
      <p class="px-4 py-4">Select one event date</p>
      <v-list>
        <v-list-item v-for="(date, index) in dates" :key="index">
          <v-btn
            @click="selectEvent(index)"
            color="primary"
            class="mx-2 my-2"
            >{{ date }}</v-btn
          >
        </v-list-item>
      </v-list></v-card
    >
  </div>
</template>
<script setup lang="ts">
import { createCesiumViewer } from "../../infrastructure/cesiumViewer";
import * as Cesium from "cesium";
import { ref, onMounted } from "vue";
import {
  traceDroneOnMap,
  traceAllSequences,
} from "../../infrastructure/traceDrone";
import json from "../../infrastructure/JsonTest.json";
const viewer = ref<Cesium.Viewer | null>(null);
const currentStep = ref<number>(0);
const isPlaying = ref<boolean>(false);
const interval = ref<NodeJS.Timeout | null>(null);
const dates = Object.keys(json.flight_records);
onMounted(async () => {
  viewer.value = createCesiumViewer(
    document.getElementById("container-cesium") as HTMLElement
  );

  traceDroneOnMap(viewer.value, json, 0, Cesium.Color.RED);
  traceAllSequences(viewer.value, json);
});
const nextStep = () => {
  currentStep.value++;
  if (currentStep.value >= 10) {
    currentStep.value = 0;
    if (interval.value) {
      clearInterval(interval.value);
    }
  }
  clearDataSource();
  traceDroneOnMap(viewer.value, json, currentStep.value, Cesium.Color.RED);
};
const previousStep = () => {
  currentStep.value--;
  if (currentStep.value < 0) {
    currentStep.value = 9;
  }
  clearDataSource();
  traceDroneOnMap(viewer.value, json, currentStep.value, Cesium.Color.RED);
};
const clearDataSource = () => {
  viewer.value?.dataSources.removeAll();
  traceAllSequences(viewer.value, json);
};
const play = () => {
  if (isPlaying.value) {
    return;
  }
  isPlaying.value = true;
  interval.value = setInterval(() => {
    if (!isPlaying.value) {
      return;
    }
    nextStep();
  }, 1000);
};
const pause = () => {
  isPlaying.value = false;
  if (interval.value) {
    clearInterval(interval.value);
  }
};
const selectEvent = (index: number) => {
  pause();
  currentStep.value = index;
  clearDataSource();
  traceDroneOnMap(viewer.value, json, currentStep.value, Cesium.Color.RED);
};
</script>
<style scoped>
#container-cesium {
  width: 80%;
  height: 100%;
  margin: auto;
}
</style>
