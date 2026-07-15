import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './Hero'
import Bridge from './Bridge'
import Sehitler from './Sehitler'
import Kapanis from './Kapanis'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.killAll()
    }
  }, [])

  return (
    <>
      <main style={{ background: '#050505' }}>
        <Hero />
        <Bridge />
        <Sehitler />
        <Kapanis />
      </main>
      <div className="cinematic-glow" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />
    </>
  )
}
