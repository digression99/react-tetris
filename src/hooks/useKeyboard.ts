import { useEffect } from "react";

export function useKeyboard(handler: (k: string) => void) {
  useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      // if you press the same key, 
      // this will not trigger rerender.
      handler(e.key)
    }

    window.addEventListener('keydown', eventHandler)
    return () => window.removeEventListener('keydown', eventHandler)
  }, [handler])
}
