import { ref, Ref } from '@vue/reactivity'

function alertNoStorage () {
  console.error('NO LOCAL STORAGE SUPPORT')
}

const current = ref()

function useLocalStorage (): Ref {
  if (!window.localStorage) {
    alertNoStorage()
  }
  return current
}
