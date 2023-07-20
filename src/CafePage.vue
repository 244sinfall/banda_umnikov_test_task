<script setup>
import CafeInfo from "@/components/CafeInfo.vue";
import Button from 'primevue/button'
import { watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import Toast from 'primevue/toast';
const route = useRoute();
const router = useRouter();
const store = useStore();
const toast = useToast();
async function onOtherCafe() {
  if(!store.state.cafes) {
    await store.dispatch('fetchCafes')
  }
  let newId = store.state.cafes.random().id
  while (newId === store.state.cafe.id) {
    newId = store.state.cafes.random().id
  }
  return await router.push(`/cafe/${newId}`)
}
async function onLinkCopy() {
  await navigator.clipboard.writeText(window.location);
  toast.add({
    summary: "Успешно!",
    detail: "Ссылка на кафе успешно скопирована",
    severity: "success"
  })
}
function onBack() {
  router.push('/')
}
async function load() {
  const cafe = store.getters.getCafe(route.params.id);
  if(!cafe) {
    await store.dispatch("fetchCafe", route.params.id)
  }
}
await load()
watch(() => route.params.id, async () => {
  await load()
})
</script>

<template>
  <Toast />

  <CafeInfo :cafe="store.state.cafe"/>

  <span class="controls">
    <Button label="Другое место" icon="pi pi-search" @click="onOtherCafe()" />
    <Button label="Скопировать ссылку" icon="pi pi-paperclip" severity="secondary" @click="onLinkCopy()" />
    <Button label="К списку" icon="pi pi-list" severity="warning" @click="onBack()" />
  </span>
</template>

<style scoped>
  .controls {
    padding-top: 0.25rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap:0.25rem;
  }
</style>