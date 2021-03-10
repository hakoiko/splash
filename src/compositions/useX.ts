import { reactive, Ref, toRef } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

export type useXProps<T> = {
  localStorage?: string
}

const state = reactive<{ [key: string]: unknown }>({})

export function useX <T> (
  key: string,
  source: Ref<T>
): Ref<T> {
  state[key] = source

  watch(source, (newval, oldval) => {
    console.log('@useX.watch', newval, state)
    if (JSON.stringify(newval) === JSON.stringify(oldval)) return
    state[key] = newval
  })

  return toRef(state, key) as Ref<T>
}
