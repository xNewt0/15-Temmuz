import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const assetBase = import.meta.env.BASE_URL

const lines = [
  { text: 'O GECE', sub: 'şehir uyumadı', color: '#f5f5f0' },
  { text: 'KÖPRÜDE', sub: 'sesler değil, yürekler çoğaldı', color: '#E30A17' },
  { text: 'ÖLÜM VARDI', sub: 'ama geri adım yoktu', color: '#f5f5f0' },
  { text: 'KORKU YOKTU', sub: 'çünkü millet oradaydı', color: '#E30A17' },
]

export default function Bridge() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const phraseRef = useRef(null)
  const progressRef = useRef(null)
  const latestIndexRef = useRef(0)

  useEffect(() => {
    const phrase = phraseRef.current
    if (!phrase) return

    gsap.fromTo(
      phrase,
      { autoAlpha: 0, y: 28, filter: 'blur(12px)', scale: 0.98 },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.55, ease: 'power3.out' }
    )
  }, [activeIndex])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const setIndexSafely = (index) => {
      if (latestIndexRef.current === index) return
      latestIndexRef.current = index
      setActiveIndex(index)
    }

    const pauseVideo = () => {
      video.pause()
    }

    const playVideo = async () => {
      video.playbackRate = 2
      try {
        await video.play()
      } catch {
        // Muted + playsInline usually allows autoplay; if the browser blocks it,
        // the first user scroll/touch will unblock playback.
      }
    }

    const restartAndPlay = () => {
      video.currentTime = 0
      latestIndexRef.current = 0
      setActiveIndex(0)
      playVideo()
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onEnter: restartAndPlay,
      onEnterBack: restartAndPlay,
      onLeave: pauseVideo,
      onLeaveBack: pauseVideo,
    })

    const syncWithVideo = () => {
      if (!video.duration) return

      const progress = video.currentTime / video.duration
      const nextIndex = Math.min(lines.length - 1, Math.floor(progress * lines.length))
      setIndexSafely(nextIndex)

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(0.035, progress)})`
      }
    }

    video.addEventListener('timeupdate', syncWithVideo)
    video.addEventListener('ended', pauseVideo)

    return () => {
      trigger.kill()
      video.removeEventListener('timeupdate', syncWithVideo)
      video.removeEventListener('ended', pauseVideo)
      pauseVideo()
    }
  }, [])

  const activeLine = lines[activeIndex]

  return (
    <section ref={sectionRef} className="relative h-[260vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={`${assetBase}kopru1.mp4`}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/20 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.62)_78%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="absolute left-6 right-6 top-8 z-20 h-px overflow-hidden bg-white/10 md:left-12 md:right-12">
          <div ref={progressRef} className="h-full origin-left bg-[#E30A17] shadow-[0_0_18px_rgba(227,10,23,0.8)]" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div ref={phraseRef} key={activeIndex} className="max-w-5xl">
            <p
              className="font-['Oswald'] font-bold uppercase leading-[0.86]"
              style={{
                color: activeLine.color,
                fontSize: 'clamp(4.6rem, 13vw, 11rem)',
                letterSpacing: '-0.035em',
                textShadow: activeLine.color === '#E30A17'
                  ? '0 0 70px rgba(227,10,23,0.52), 0 20px 70px rgba(0,0,0,0.95)'
                  : '0 20px 70px rgba(0,0,0,0.95), 0 0 28px rgba(255,255,255,0.12)',
              }}
            >
              {activeLine.text}
            </p>
            <p className="mt-5 font-['Inter'] text-sm font-light uppercase tracking-[0.32em] text-white/68 md:text-base">
              {activeLine.sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
