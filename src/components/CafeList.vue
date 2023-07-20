<script setup>
import DataView from "primevue/dataview";
import Button from 'primevue/button';
import CafePlaceholder from '@/assets/cafe_placeholder.png'
import {getDistance, getTime} from "../utils";

const props =defineProps({
  cafeList: Array,
  onClick: Function
})
</script>

<template>
  <DataView :value="props.cafeList" :paginator="true" layout="list" :rows="10">
    <template #list="cafe">
      <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div class="p-4 border-1 surface-border surface-card border-round">
          <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <div v-if="cafe.data.time && cafe.data.distance" class="flex align-items-center gap-2">
              <i class="pi pi-clock"></i>
              <span class="font-semibold">{{ `${getTime(cafe.data.time)} (${getDistance(cafe.data.distance)})` }}</span>
            </div>
          </div>
          <div class="flex flex-column align-items-center gap-3 py-5">
            <img class="w-9 shadow-2 border-round" :src="cafe.data.photo ? cafe.data.photo : CafePlaceholder" :alt="cafe.data.name" />
            <div class="text-2xl font-bold">{{ cafe.data.name }}</div>
          </div>
          <div class="flex justify-content-end">
            <Button label="Подробнее" icon="pi pi-info-circle" rounded @click="onClick(cafe.data.id)"></Button>
          </div>
        </div>
      </div>
    </template>
  </DataView>
</template>

<style scoped>
  img {
    max-width: 350px;
    max-height: 200px;
    object-fit: cover;
  }
</style>