<template>
  <div class="p-4">Table Devices</div>
  <div class="flex">
    <v-text-field
      class="px-4"
      v-model="sitIdFilter"
      label="Filtrer par Sit ID"
      @keydown.enter="applyFilter"
    ></v-text-field>
    <v-btn @click="applyFilter" color="primary" class="mx-2 my-2"
      >Filtrer</v-btn
    >
  </div>

  <v-card class="mx-4 my-4">
    <v-data-table
      :items="devicesFiltered"
      :headers="headers"
      class="p-4"
    ></v-data-table
  ></v-card>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
const props = defineProps<{ devices?: any[] }>();
const sitIdFilter = ref<string>("");
const devicesFiltered = ref<any[] | undefined>([]);
const headers = [
  { title: "DetId", key: "det_id" },
  { title: "Sit_Id", key: "sit_id" },
  { title: "DetText", key: "det_text" },
  { title: "Active", key: "dev_active" },
  { title: "Cdt", key: "dev_cdt" },
  { title: "DevId", key: "dev_id" },
  { title: "Dev_Name", key: "dev_name" },
  { title: "Dev_Dn", key: "dev_sn" },
  { title: "Dev_Udt", key: "dev_udt" },
  { title: "Lastping", key: "lastping" },

  { title: "Sit_Id", key: "sit_id" },
  { title: "Sit_Name", key: "sit_name" },
];
const updatedDevices = () => {
  if (sitIdFilter.value === "") {
    devicesFiltered.value = props.devices;
  } else {
    devicesFiltered.value = props.devices?.filter(
      (device) => device.sit_id.toString() === sitIdFilter.value
    );
  }
};
onMounted(() => {
  updatedDevices();
});
watch(
  () => props.devices,
  () => {
    updatedDevices();
  }
);
const applyFilter = () => {
  updatedDevices();
};
</script>
