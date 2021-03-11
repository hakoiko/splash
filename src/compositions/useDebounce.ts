import { nextTick, Ref, ref, watch } from 'vue'

type UseDebounceOptions = {
  /** 디바운스 시간 */
  ms?: number
  /** 최초 설정시에는 timeout을 기다리지 않고 값을 즉시 반영 */
  immediate?: boolean
}
export function useDebounce<T> (
  /** 디바운스 반영할 값 */
  source: Ref<T>,
  options?: UseDebounceOptions
): Ref<T> {
  const { ms, immediate } = {
    ms: 500,
    immediate: false,
    ...options
  }
  const current = ref<T>() as Ref<T>
  let timeout: number | null

  // current = ref<T>(source.value)로 ref를 선언해버리면
  // source = current인 상태이므로 debounce 되지 않습니다.
  // 외부에서 useDebounce를 통해 받아오는 값은, 변경되는 값 뿐만 아니라
  // 값의 최초 변경 역시 debounce되어야 할것으로 생각됩니다.
  //
  // 또한 다른 hook에서 watch를 통해 debounced value를 참조할 수도 있으므로
  // 값의 '변경'을 외부 hook에게 알려주려면 nextTick() 메서드를 사용해 최초의 undefined값이 리턴된 후에
  // source.value를 집어넣어 외부에서 debounced value에 대한 변경 감지가 원활할듯 합니다
  nextTick(() => {
    if (immediate) current.value = source.value
  })

  // initial debounced value 적용
  timeout = setTimeout(() => {
    current.value = source.value
  }, ms)

  watch(source, (newval) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      current.value = newval
    }, ms)
  })
  return current
}
