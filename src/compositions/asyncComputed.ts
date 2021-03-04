import { Ref, ref, watchEffect } from 'vue'

export function asyncComputed<T> (fn: () => Promise<T>, initialState: T): Ref<T> {
  const current = ref<T>(initialState) as Ref<T>
  watchEffect(async (onInvalidated) => {
    current.value = await fn()
    onInvalidated(() => {
      console.log('안되는데용...')
    })
    console.log('@run watchEffect', fn)
  })
  console.log('CURRENT:', current)
  return current
}

export function useDelayX <T> (fn: () => T, timeout = 0): Ref<T | undefined> {
  const current = ref<T>()
  watchEffect(() => {
    setTimeout(() => {
      current.value = fn()
    }, timeout)
  })
  return current
}

export function useDelay <T extends unknown> (fn: () => T, timeout = 0): Ref<T | undefined> {
  const current = ref<T>()

  watchEffect(() => {
    const nextVal: T = fn()
    setTimeout((val: T) => {
      current.value = val
    }, timeout, nextVal)
  })
  return current
}

export function useDelayAsync <T extends unknown> (fn: () => T, timeout = 0): Ref<T | undefined> {
  const current = ref<T>()

  const timeoutFn = async (callback: () => T): Promise<T> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(callback())
      }, timeout)
    })
  }

  watchEffect(async () => {
    current.value = await timeoutFn(fn)
  })
  return current
}
