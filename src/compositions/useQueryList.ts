import { Ref, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

type UseQueryOptions<T> = {
  query: (arg: T) => boolean
}

type UseQueryReturns<T> = {
  list: Ref<T[]>
  results: Ref<T[]>
  elses: Ref<T[]>
}

export function useQueryList<T> (initialValue: T[] = [], options?: UseQueryOptions<T>): UseQueryReturns<T> {
  const { query } = {
    query: () => true,
    ...options
  }

  const list = ref<T[]>(initialValue) as Ref<T[]>
  const results = ref<T[]>([]) as Ref<T[]>
  const elses = ref<T[]>([]) as Ref<T[]>
  watch(list, (newval) => {
    results.value = []
    elses.value = []
    newval.forEach(item => {
      if (query(item)) results.value.push(item)
      else elses.value.push(item)
    })
  }, { deep: true })

  /* const results = computed(() => {
    return list.value.filter(item => query(item))
  })
  const elses = computed(() => {
    return list.value.filter(item => !query(item))
  }) */

  return {
    list,
    results,
    elses
  }
}
