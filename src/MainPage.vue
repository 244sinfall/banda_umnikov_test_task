<script setup>
import Button from 'primevue/button'
import CafeList from "@/components/CafeList.vue";
import {onMounted} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
const store = useStore();
const router = useRouter();
async function goTo(id) {
  await router.push(`/cafe/${id}`)
}
async function goToRandom() {
  await router.push(`/cafe/${store.state.cafes.random().id}`)
}
onMounted(async() => {
  if(!store.state.cafes) {
    await store.dispatch('fetchCafes');
  }
})
</script>

<template>
  <span class="random">
    <Button label="Выбрать случайное" icon="pi pi-search" @click="goToRandom" />
  </span>
  <CafeList :cafe-list="store.state.cafes" :on-click="goTo"/>
</template>

<style scoped>
.random {
  display: flex;
  justify-content: center;
}
</style>