import { useEffect } from 'react'
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { useGameController } from './hooks/useGameController';
import { useCountTime } from './hooks/base/useCountTime';
import { usePlayfield } from './hooks/usePlayfield';
import { useBlock } from './hooks/useBlock';
import { EndPage } from './pages/EndPage';

const TIMER_TICK = 50

function App() {
  const { reduceTime, initializeField, changeGameStatus, gameStatus, gravity } = usePlayfield()
  const { initializeBlock } = useBlock()

  useGameController()

  const { start, stop } = useCountTime((t: number) => {
    reduceTime(gravity)
  }, gravity, [gravity]) // the timer count does not change whether the gravity changes.

  useEffect(() => {
    // NOTE - this effect is called numerously, 
    // since deps include start, stop.
    if (gameStatus === 'init') {
      initializeField()
      initializeBlock()
      changeGameStatus('pending')
    } else if (gameStatus === 'done') {
      stop()
    } else if (gameStatus === 'started') {
      start(TIMER_TICK)
    }
    // TODO - show score page, start again page.
  }, [changeGameStatus, gameStatus, initializeBlock, initializeField, start, stop])

  if (gameStatus === 'pending') {
    return <StartPage />
  } else if (gameStatus === 'done') {
    return <EndPage />
  }
  return <GamePage />
}

export default App;
