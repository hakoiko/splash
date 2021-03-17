import { Ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

type UseLocalStorageOption = {
  key: string
}

function alertNoStorage () {
  console.error('NO LOCAL STORAGE SUPPORT')
}

/**
 * 레퍼런스 아이템과 로컬스토리지를 동기화 합니다.
 */
export function useLocalStorage <T> (source: Ref<T>, { key }: UseLocalStorageOption): Ref {
  if (!window.localStorage) {
    alertNoStorage()
    return source
  }

  const currentStorageValue = window.localStorage.getItem(key)
  if (currentStorageValue) {
    const parsedValue = JSON.parse(currentStorageValue)
    source.value = parsedValue
  }

  watch(source, newval => {
    window.localStorage.setItem(key, JSON.stringify(newval))
  }, { deep: true })

  return source
}
