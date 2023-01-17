import { useState, useEffect, useRef } from 'react'

export function useCountTime(fn: (time: number) => void, deps: any[]) {
  const [time, setTime] = useState(0)
  const prevTime = useRef<number>(0)
  const [intervalTimerId, setIntervalTimerId] = useState<number | undefined>(undefined)

  useEffect(() => {
    // should be trigged only when the time is changed.
    if (prevTime.current === time) return
    prevTime.current = time
    fn(time)
  }, [time, fn, ...deps])

  const start = () => {
    // start timer.
    const timerId = window.setInterval(() => {
      setTime(t => {
        console.log('changing time')
        return t + 1
      })
    }, 1000)

    setIntervalTimerId(timerId)
  }

  const stop = () => {
    window.clearInterval(intervalTimerId)
  }

  return {
    time,
    start,
    stop
  }
}

