import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export function useDebounce<T> (
  /** 디바운스 반영할 값 */
  reference: Ref<T>,
  /** 디바운스 시간 */
  ms = 500,
  /** 최초 1번은 즉시 값을 반영하면 되는지 여부 */
  immediate = false
): Ref<T> {
  const current = ref<T>(reference.value) as Ref<T>
  let timeout: number | null
  watch(reference, (newval) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) current.value = newval
    }, ms)
    if (immediate && !timeout) current.value = newval
  })
  return current
}
