import { useState } from 'react'

export function useCountTime() {
  const [time, setTime] = useState(0)
  const [intervalTimerId, setIntervalTimerId] = useState<number | undefined>(undefined)

  const start = () => {
    // start timer.
    const timerId = window.setInterval(() => {
      setTime(t => t + 1)
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

