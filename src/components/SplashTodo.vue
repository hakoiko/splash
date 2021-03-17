<template>
  <div class="todo-create">
    <input
      v-model="newTodoTitle"
      placeholder="할일 뭐가 있더라"
      type="text"
      class="create-input"
      @keydown.enter="() => { addTodo(newTodoTitle); newTodoTitle = '' }"
    >
  </div>
  <div class="todo-list-header">
    <div class="header-title">
      할 일들
    </div>
    <div class="header-options">
      <span class="options-item-count">{{ scheduled.length }}</span>
    </div>
  </div>
  <ul class="todo-list -scheduled">
    <li
      v-for="item in scheduled"
      :key="item.id"
      class="todo-list-item"
    >
      <div class="item-title">
        {{ item.title }}
      </div>
      <div class="item-action">
        <a
          class="button -minor -small"
          @click="() => item.done = true"
        >다했다</a>
      </div>
    </li>
  </ul>

  <div class="todo-list-header">
    <div class="header-title">
      다 한것들
    </div>
    <div class="header-options">
      <span class="options-item-count">{{ done.length }}</span>
    </div>
  </div>
  <ul class="todo-list -done">
    <li
      v-for="item in done"
      :key="item.id"
      class="todo-list-item"
    >
      <div class="item-title">
        {{ item.title }}
      </div>
      <div class="item-action">
        <a
          class="button -minor -small"
          @click="() => item.done = false"
        >리오픈</a>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useTodo } from '@compositions/useTodo'
import { ref } from '@vue/reactivity'

const newTodoTitle = ref<string>('')
const { scheduled, addTodo, done } = useTodo()
</script>

<style lang="scss" scoped>
  .todo-create {
    margin: 20px 0;
    .create-input {
      font-size: var(--font-l);
      border: none;
      width: 100%;
      text-align: left;
      border-radius: var(--radius-m);
      background-color: var(--white);
      padding: var(--padding-s);
      box-sizing: border-box;
  }
}

.todo-list {
  margin-bottom: 40px;
  .todo-list-item {
    background-color: var(--white);
    padding: var(--padding-s);
    border-radius: var(--radius-m);
    margin-bottom: 8px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  &.-done {
    .todo-list-item {
      .item-title {
        opacity: .7;
      }
    }
  }
}
</style>
