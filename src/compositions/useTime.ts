import dayjs from 'dayjs'
import { onBeforeUnmount, ref, Ref } from 'vue'

export function useTime (format = 'YY:MM:DD HH:mm:ss'): Ref<string> {
  const leftMinutes = dayjs().minute() - 60
  const leftSeconds = dayjs().second() - 60
  const leftMs = dayjs().millisecond() - 1000
  const current = ref<string>(dayjs().format(format))
  let interval = 1000
  if (format.includes('HH')) interval = 1000 * 60 * 60
  if (format.includes('mm')) interval = 1000 * 60
  if (format.includes('ss')) interval = 1000

  let initialTimeout = 1000
  if (format.includes('HH')) initialTimeout = leftMinutes + leftSeconds + leftMs
  if (format.includes('mm')) initialTimeout = leftSeconds + leftMs
  if (format.includes('ss')) initialTimeout = leftMs

  let intervalObj: number

  function startInterval () {
    intervalObj = setInterval(() => {
      current.value = dayjs().format(format)
    }, interval)
  }

  onBeforeUnmount(() => {
    clearInterval(intervalObj)
  })

  setTimeout(() => {
    current.value = dayjs().format(format)
    startInterval()
  }, initialTimeout)

  return current
}
