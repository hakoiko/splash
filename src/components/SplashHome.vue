<template>
  <section
    class="splash-home"
    :style="backgroundImage"
  >
    <div class="home-clock">
      {{ currentTime }}
    </div>
    <!-- <div class="home-search">
      <input
        v-model="searchString"
        type="text"
        class="input-main"
      >
    </div> -->
    <!-- <span
      v-for="todo in scheduled"
      :key="todo.id"
    >[{{ todo.title }}]</span> -->
    <div class="home-todo">
      <splash-todo />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { useDebounce } from '@compositions/useDebounce'
import { useTime } from '@compositions/useTime'
import { useUnsplash } from '@compositions/useUnsplash'
import SplashTodo from './SplashTodo.vue'
import { useTodo } from '@compositions/useTodo'

const currentTime = useTime('HH:mm')
const searchString = ref<string>('cats')
const photos = useUnsplash(useDebounce<string>(searchString, { immediate: true }))
const backgroundImage = computed(() => {
  const url = photos.value[0]?.urls?.regular || ''
  return { 'background-image': `url(${url})` } as CSSProperties
})

const { scheduled } = useTodo()
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');

:deep() {
  --white: #fff;
  --width-m: 960px;
  --radius-l: 8px;
  --radius-m: 4px;
  --padding-s: 8px;
  --font-l: 24px;
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
  }
  .home-todo {
    width: 70vw;
    margin: auto;
  }
}
</style>
