import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const assetBase = import.meta.env.BASE_URL

export default function Hero() {
  const containerRef = useRef(null)
  const titleWrapRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const subtextRef = useRef(null)
  const slashRef = useRef(null)
  const railRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([subtitleRef.current, subtextRef.current, railRef.current], { autoAlpha: 0 })
      gsap.set(titleRef.current, { yPercent: 105, skewY: 7 })
      gsap.set(slashRef.current, { scaleY: 0, transformOrigin: 'center bottom' })

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.to(slashRef.current, { scaleY: 1, duration: 0.85, delay: 0.25 })
        .to(titleRef.current, { yPercent: 0, skewY: 0, duration: 1.15 }, '-=0.35')
        .to(slashRef.current, { x: '42vw', scaleX: 0.22, duration: 0.9 }, '-=0.9')
        .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 0.85 }, '-=0.55')
        .to(subtextRef.current, { autoAlpha: 1, y: 0, duration: 0.85 }, '-=0.55')
        .to(railRef.current, { autoAlpha: 1, height: 64, duration: 0.75 }, '-=0.45')

      gsap.to(railRef.current, {
        y: 12,
        duration: 1.25,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat origin-center scale-105"
        style={{ backgroundImage: `url('${assetBase}1.jpg')` }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.92)_0%,rgba(5,5,5,0.48)_48%,rgba(5,5,5,0.86)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(227,10,23,0.18)_0%,transparent_36%)] mix-blend-screen" />
      <div className="absolute left-0 top-0 h-full w-[18vw] bg-[#E30A17]/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-10">
        <div className="mb-5 flex items-center gap-4 text-left">
          <span className="h-px w-12 bg-[#E30A17]" />
          <span className="font-['Inter'] text-xs uppercase tracking-[0.38em] text-white/45">
            15 Temmuz 2016
          </span>
        </div>

        <div ref={titleWrapRef} className="relative overflow-hidden pb-2">
          <div
            ref={slashRef}
            className="absolute -left-2 top-0 z-20 h-full w-4 bg-[#E30A17] shadow-[0_0_60px_rgba(227,10,23,0.75)]"
          />
          <h1
            ref={titleRef}
            className="font-['Teko'] font-bold uppercase leading-[0.78] text-[#f5f5f0]"
            style={{
              fontSize: 'clamp(5rem, 18vw, 15rem)',
              letterSpacing: '-0.055em',
              textShadow: '0 18px 55px rgba(0,0,0,0.85)',
            }}
          >
            Bir Millet<br />Uyandı
          </h1>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,520px)_1fr] md:items-start">
          <p
            ref={subtitleRef}
            className="font-['Teko'] uppercase leading-none text-[#E30A17]"
            style={{
              transform: 'translateY(18px)',
              fontSize: 'clamp(2rem, 5vw, 4.25rem)',
              letterSpacing: '-0.015em',
            }}
          >
            Karanlığa karşı<br />tek bir nefes.
          </p>

          <p
            ref={subtextRef}
            className="max-w-xl font-['Inter'] text-sm font-light leading-8 text-white/62 md:pt-2 md:text-base"
            style={{ transform: 'translateY(18px)' }}
          >
            O gece şehir uyumadı. Sokaklar, köprüler ve meydanlar; iradesine sahip çıkan insanların sessiz ama sarsılmaz yürüyüşüne tanık oldu.
          </p>
        </div>
      </div>

      <div ref={railRef} className="absolute bottom-9 left-1/2 h-0 w-px -translate-x-1/2 bg-gradient-to-b from-white/5 via-white/45 to-[#E30A17]/60" />
    </section>
  )
}
