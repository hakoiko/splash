import { Ref } from '@vue/reactivity'
import { useQueryList } from './useQueryList'

type TodoItem = {
  id: string
  title: string
  did: boolean
}

type UseTodoReturns = {
  todoList: Ref<TodoItem[]>
  scheduled: Ref<TodoItem[]>
  did: Ref<TodoItem[]>
  addTodo: (arg: string) => void
}

function createTodo (title: string): TodoItem {
  return {
    id: Math.random().toString(36).slice(2),
    title: title,
    did: false
  }
}

const { list, results, elses } = useQueryList<TodoItem>([], {
  query: item => item.did === false
})

export function useTodo (): UseTodoReturns {
  function addTodo (title: string): void {
    const newTodo = createTodo(title)
    list.value.push(newTodo)
  }

  return {
    todoList: list,
    scheduled: results,
    did: elses,
    addTodo
  }
}
