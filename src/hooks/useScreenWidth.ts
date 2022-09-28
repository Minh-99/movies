import { useState, useEffect } from 'react'

export default function useScreenWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(0)

  const isWindow = typeof window !== 'undefined'

  const getWidth: any = () => (isWindow ? window.innerWidth : windowWidth)

  const resize = () => setWindowWidth(getWidth())

  useEffect(() => {
    if (isWindow) {
      setWindowWidth(getWidth())

      window.addEventListener('resize', resize)

      return () => window.removeEventListener('resize', resize)
    }
  }, [isWindow])

  return windowWidth
}