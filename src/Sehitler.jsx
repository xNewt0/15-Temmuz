import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const sehitler = [
  'Ömer Halisdemir', 'Mustafa Cambaz', 'Erol Olçok', 'Abdullah Tayyip Olçok', 'Ali Gültekin',
  'Hasan Gülhan', 'İbrahim Küçük', 'Mehmet Keleş', 'Erdal Dursun', 'Recai Gürler',
  'Ferhat Tok', 'Hüseyin Sözeri', 'Musa Özalkan', 'Ali Arslan', 'Bülent Şeker',
  'Cengiz Yılmaz', 'Şenol Teke', 'Fatih Çoban', 'İlhan Varank', 'Cuma Dağ',
  'Yılmaz Ercan', 'Burak Cantürk', 'Aydın Çopur', 'Rüstem Resul Perçin', 'Suat Akıncı',
  'Halil Kantarcı', 'Ahmet Özsoy', 'Çetin Can', 'Muhammet Oğuz Kılınç', 'Sevgi Yeşilyurt'
]

function MarqueeTrack({ items, direction, speed, rotation, top = '50%', opacity = 1 }) {
  const trackRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current) return

    gsap.fromTo(
      trackRef.current,
      { xPercent: direction === -1 ? 0 : -50 },
      {
        xPercent: direction === -1 ? -50 : 0,
        duration: speed,
        ease: 'none',
        repeat: -1,
      }
    )
  }, [direction, speed])

  return (
    <div
      className="absolute left-1/2 flex whitespace-nowrap"
      style={{
        top,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        width: '400vw',
        opacity: opacity
      }}
    >
      <div ref={trackRef} className="flex items-center" style={{ width: 'max-content' }}>
        {[...items, ...items, ...items, ...items].map((name, i) => (
          <div key={i} className="flex items-center">
            <span
              className="font-['Cinzel'] font-bold uppercase tracking-widest px-6 sm:px-12"
              style={{
                fontSize: 'clamp(1.2rem, 3.5vw, 2.5rem)',
                color: 'rgba(245,245,240,0.85)',
                textShadow: '0 0 10px rgba(255,255,255,0.1)',
              }}
            >
              {name}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#E30A17] opacity-80 shadow-[0_0_8px_rgba(227,10,23,0.9)]" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Sehitler() {
  const sectionRef = useRef(null)
  const backgroundRef = useRef(null)

  // Split into 5 tracks for a denser network of names
  const track1 = sehitler.slice(0, 6)
  const track2 = sehitler.slice(6, 12)
  const track3 = sehitler.slice(12, 18)
  const track4 = sehitler.slice(18, 24)
  const track5 = sehitler.slice(24)

  useEffect(() => {
    // Ambient background animation (slowly panning gradient mesh)
    const ctx = gsap.context(() => {
      gsap.to(backgroundRef.current, {
        backgroundPosition: '200% 50%',
        duration: 30,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      {/* Animated abstract smoke/gradient background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 0% 50%, rgba(227,10,23,0.1) 0%, transparent 50%), radial-gradient(circle at 100% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

      {/* 5 Marquee Tracks crossing the screen */}
      <div className="relative w-full h-full z-10">
        <MarqueeTrack items={track1} direction={-1} speed={50} rotation={15} top="20%" opacity={0.55} />
        <MarqueeTrack items={track2} direction={1} speed={60} rotation={-12} top="35%" opacity={0.75} />
        <MarqueeTrack items={track3} direction={-1} speed={45} rotation={0} top="50%" opacity={1} />
        <MarqueeTrack items={track4} direction={1} speed={55} rotation={8} top="65%" opacity={0.65} />
        <MarqueeTrack items={track5} direction={-1} speed={65} rotation={-18} top="80%" opacity={0.5} />
      </div>

      {/* Central dramatic overlay text */}
      <div className="absolute z-20 pointer-events-none text-center px-4 mix-blend-normal bg-black/40 backdrop-blur-md p-10 rounded-full border border-white/5 shadow-2xl">
        <h2
          className="font-['Cinzel'] font-bold text-[#f5f5f0]"
          style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            lineHeight: 1,
            letterSpacing: '0.05em',
            textShadow: '0 0 40px rgba(0,0,0,1)',
          }}
        >
          251 CAN
        </h2>
        <p
          className="font-['Inter'] mt-4 text-[#f5f5f0]"
          style={{
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(0,0,0,1)',
          }}
        >
          Sonsuzluğa Kazınan İsimler
        </p>
      </div>
    </section>
  )
}
