<template>
  <section
    class="splash-home"
    :style="backgroundImage"
  >
    <div class="home-clock">
      {{ currentTime }}
    </div>
    <div class="home-search">
      <input
        v-model="searchString"
        type="text"
        class="search-input"
      >
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { useDebounce } from '../compositions/useDebounce'
import { useTime } from '../compositions/useTime'
import { useUnsplash } from '../compositions/useUnsplash'

const currentTime = useTime('HH:mm')
const searchString = ref<string>('')
const photos = useUnsplash(useDebounce<string>(searchString))
const backgroundImage = computed(() => {
  const url = photos.value[0]?.urls?.regular || ''
  return { 'background-image': `url(${url})` } as CSSProperties
})

onMounted(() => {
  searchString.value = 'cat'
})

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
:root {
  --white: #fff;
  --width-m: 960px;
  --radius-l: 8px;
  --padding-s: 8px;
}
.splash-home {
  position: relative;
  padding-top: 5vh;
  box-sizing: border-box;
  background-size: cover;
  height: 100vh;
  .home-clock {
    position: relative;
    margin: 80px auto;
    text-align: center;
    font-size: 80px;
    font-family: 'Roboto';
    color: var(--white);
  }
  .home-search {
    position: relative;
    background-color: var(--white);
    width: var(--width-m);
    border-radius: var(--radius-l);
    margin: auto;
    padding: var(--padding-s);

    .search-input {
      font-size: 32px;
      border: none;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
