<script setup>
import CafePlaceholder from '@/assets/cafe_placeholder.png'
import Card from 'primevue/card'
import { reactive, watch} from "vue";
import {getDistance, getTime} from "@/utils";
const props =defineProps({
  cafe: Object
})
const state = reactive({
  descriptionFields: []
})
watch(props, () => {
  state.descriptionFields = [
    {
      shouldShow: (item) => item.landmark,
      title: 'Как найти:',
      toText: (item) => item.landmark
    },
    {
      shouldShow: (item) => item.price && item.business_lunch,
      title: 'Бизнес-ланч:',
      toText: (item) => `${item.price} ₽`
    },
    {
      shouldShow: (item) => item.cuisine,
      title: 'Кухня:',
      toText: (item) => item.cuisine
    },
    {
      shouldShow: (item) => item.distance,
      title: 'Расстояние:',
      toText: (item) => getDistance(item.distance)
    },
    {
      shouldShow: (item) => item.time,
      title: 'Идти пешком:',
      toText: (item) => getTime(item.time)
    }]
},{ immediate: true })
</script>
<template>
  <Card>
    <template #header>
      <img class="photo" :src="cafe.photo ? cafe.photo : CafePlaceholder" alt="Фото">
    </template>
    <template #title>{{cafe.name}}</template>
    <template #subtitle>{{cafe.address}}</template>
    <template #content>
      <div class="content">
        <span v-for="field in state.descriptionFields.filter(f => f.shouldShow(cafe))" :key="field.title" class="description">
          <strong>{{ field.title }}</strong> {{field.toText(cafe)}}
        </span>
      </div>
    </template>
  </Card>
</template>

<style scoped>
  .photo {
    width: 100%;
    height: 50dvh;
    object-fit: cover;
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
</style>