import { Ref } from '@vue/reactivity'
import { useLocalStorage } from './useLocalStorage'
import { useQueryList } from './useQueryList'

type TodoItem = {
  id: string
  title: string
  done: boolean
}

type UseTodoReturns = {
  todoList: Ref<TodoItem[]>
  scheduled: Ref<TodoItem[]>
  done: Ref<TodoItem[]>
  addTodo: (arg: string) => void
}

function createTodo (title: string): TodoItem {
  return {
    id: Math.random().toString(36).slice(2),
    title: title,
    done: false
  }
}

const { list, results, elses } = useQueryList<TodoItem>([], {
  query: item => item.done === false
})

export function useTodo (): UseTodoReturns {
  function addTodo (title: string): void {
    const newTodo = createTodo(title)
    list.value.push(newTodo)
  }

  return {
    todoList: useLocalStorage(list, { key: 'splash-todo' }),
    scheduled: results,
    done: elses,
    addTodo
  }
}
