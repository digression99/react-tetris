import { useCallback, useState, useEffect, useRef } from 'react'

export function useCountTime(fn: (time: number) => void, initTimeMs: number, deps: any[]) {
  const [time, setTime] = useState(0)
  const prevTime = useRef<number>(0)
  const intervalTimerId = useRef<number | undefined>(undefined)

  useEffect(() => {
    // should be trigged only when the time is changed.
    if (prevTime.current === time) return
    prevTime.current = time
    fn(time)
  }, [initTimeMs, time, fn, ...deps])

  const start = useCallback((time: number) => {
    // NOTE - timerId could be 0 
    if (typeof intervalTimerId.current === 'number') return

    const timerId = window.setInterval(() => {
      setTime(t => {
        return t + 1
      })
    }, time)

    intervalTimerId.current = timerId
  }, [])

  const stop = useCallback(() => {
    window.clearInterval(intervalTimerId.current)
    intervalTimerId.current = undefined
  }, [])

  useEffect(() => {
    // NOTE - if initTimeMs is changed, rerender the effect.
    stop()
    start(initTimeMs)
  }, [initTimeMs, start, stop])

  return {
    time,
    start,
    stop
  }
}

