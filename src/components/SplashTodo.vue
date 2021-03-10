<template>
  <input
    v-model="newTodoTitle"
    placeholder="할일 뭐가 있더라"
    type="text"
    class="input-main"
    @keydown.enter="() => { addTodo(newTodoTitle); newTodoTitle = '' }"
  >
  <ul class="todo-list">
    <li
      v-for="item in scheduled"
      :key="item.id"
      class="todo-list-item"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useTodo } from '../compositions/useTodo'
import { ref } from '@vue/reactivity'

const newTodoTitle = ref<string>('')
const { todoList, scheduled, addTodo } = useTodo()
</script>

<stype lang="scss" scoped>
.input-main {
  font-size: 32px;
  border: none;
  width: 100%;
  text-align: center;
}
</stype>
