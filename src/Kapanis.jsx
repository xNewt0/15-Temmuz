import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Kapanis() {
  const sectionRef = useRef(null)
  const bigTextRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    // Elegant hovering effect for the big text
    const ctx = gsap.context(() => {
      gsap.to(bigTextRef.current, {
        y: -15,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Generate floating embers. Clear first so React StrictMode dev remounts do not duplicate them.
      if (particlesRef.current) {
        particlesRef.current.innerHTML = ''
        const particleCount = window.innerWidth < 768 ? 20 : 40
        for (let i = 0; i < particleCount; i++) {
          const p = document.createElement('div')
          p.className = 'absolute rounded-full pointer-events-none'

          // Random size between 2px and 6px
          const size = Math.random() * 4 + 2
          p.style.width = `${size}px`
          p.style.height = `${size}px`

          // Ember colors
          const colors = ['#E30A17', '#ff4d4d', '#ff9933', '#ffffff']
          p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
          p.style.boxShadow = `0 0 ${size * 2}px ${p.style.backgroundColor}`

          // Initial random position at bottom
          p.style.left = `${Math.random() * 100}%`
          p.style.bottom = `${(Math.random() * 20) - 10}%` // Start slightly below visible area
          p.style.opacity = Math.random() * 0.5 + 0.3

          particlesRef.current.appendChild(p)

          // Animate particle floating up
          gsap.to(p, {
            y: -window.innerHeight * (Math.random() * 0.8 + 0.5),
            x: `+=${(Math.random() - 0.5) * 200}`, // Drift left/right
            opacity: 0,
            duration: Math.random() * 5 + 5,
            ease: 'sine.inOut',
            repeat: -1,
            delay: Math.random() * 5,
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
      style={{
        background: '#050505',
      }}
    >
      {/* Deep Red glowing core at the bottom (like a fire/heartbeat) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[100vh] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(227,10,23,0.15) 0%, rgba(227,10,23,0.02) 40%, transparent 70%)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Particle container */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">

        {/* Date line */}
        <p
          className="font-['Inter'] mb-12 opacity-50"
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
          }}
        >
          15 Temmuz 2016 – 15 Temmuz 2026
        </p>

        {/* Main dramatic text */}
        <div ref={bigTextRef} className="relative">
          <h2
            className="font-['Cinzel'] leading-tight mb-4"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              color: '#f5f5f0',
              textShadow: '0 10px 50px rgba(0,0,0,0.8), 0 0 30px rgba(227,10,23,0.3)',
            }}
          >
            O GECE ÖLENLER,
          </h2>
          <h2
            className="font-['Cinzel'] leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              color: '#E30A17',
              textShadow: '0 0 40px rgba(227,10,23,0.6)',
            }}
          >
            BUGÜN HÂLÂ NÖBETTE.
          </h2>
        </div>

        <div className="w-px h-24 bg-gradient-to-b from-white/30 to-transparent mt-16 mb-8" />

        <p
          className="font-['Inter'] font-light opacity-60"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Ruhları şad olsun
        </p>
      </div>

      <p
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-['Inter'] text-center w-full"
        style={{
          fontSize: '0.6rem',
          color: 'rgba(245,245,240,0.15)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase'
        }}
      >
        Demokrasi ve Milli Birlik Günü &mdash; Türkiye Cumhuriyeti
      </p>
    </section>
  )
}
