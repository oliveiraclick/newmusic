import { useState } from 'react'

function App() {
  const [view, setView] = useState<'landing' | 'login' | 'register-artist' | 'register-contractor' | 'landing-artist' | 'landing-contractor' | 'profile-artist' | 'dashboard-contractor' | 'public-rating' | 'dashboard-artist' | 'mini-profile' | 'checkout-booking' | 'role-selection'>('landing')
  const [contractorSubView, setContractorSubView] = useState<'search' | 'bookings' | 'payments' | 'contracts' | 'venue'>('search')
  const [artistSubView, setArtistSubView] = useState<'overview' | 'schedule' | 'finance' | 'packages' | 'shop' | 'marketplace'>('overview')

  const [currentArtistIndex, setCurrentArtistIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Advanced Agenda States
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 1, 1)) // Fevereiro 2026
  const [blockedDates, setBlockedDates] = useState<Record<string, 'external' | 'vacation' | 'show'>>({
    '2026-02-25': 'show',
    '2026-02-28': 'show',
    '2026-02-14': 'vacation',
    '2026-02-15': 'vacation',
    '2026-02-20': 'external'
  })
  const [financialRecords, setFinancialRecords] = useState<Record<string, number>>({
    '2026-02-25': 4500,
    '2026-02-28': 1200,
    '2026-02-20': 2000
  })

  // Agenda Modal States
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false)
  const [selectedAgendaDate, setSelectedAgendaDate] = useState<string | null>(null)
  const [agendaModalStep, setAgendaModalStep] = useState<'options' | 'cache_input'>('options')
  const [externalCacheValue, setExternalCacheValue] = useState('')
  const [externalContractorName, setExternalContractorName] = useState('')
  const [bookingDetails, setBookingDetails] = useState<Record<string, { contractor: string, time: string }>>({
    '2026-02-25': { contractor: 'Pub Intergalactic', time: '21:00' },
    '2026-02-28': { contractor: 'Sunset Rooftop', time: '18:30' }
  })
  const [marketplaceItems] = useState([
    { id: 1, name: 'Microfone Shure SM58', price: 'R$ 850', seller: 'Leo Folk', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, name: 'Pedal Delay Boss DD-7', price: 'R$ 1.100', seller: 'Jack Wild', img: 'https://images.unsplash.com/photo-1541689592655-f5f52827a3b4?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, name: 'Interface Focusrite 2i2', price: 'R$ 1.400', seller: 'Aurora Sky', img: 'https://images.unsplash.com/photo-1598449334855-08197771746f?q=80&w=2070&auto=format&fit=crop' }
  ])

  // Checkout flow inputs
  const [checkoutDate, setCheckoutDate] = useState('2026-03-15')
  const [checkoutTime, setCheckoutTime] = useState('20:00')

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]

  const artists = [
    {
      name: 'Jack Wild',
      track: 'Sunset Boulevard',
      genre: 'Rock / Pop',
      img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
      reliability: 98,
      equipment: 'Som + Luz Inclusos',
      vibes: ['Sunset', 'High Energy', 'Rock Night'],
      packages: [
        { id: 'p1', title: 'Voz + Violão', size: 'Até 20 pessoas', price: 'R$ 800' },
        { id: 'p2', title: 'Voz + Violão', size: 'Até 50 pessoas', price: 'R$ 1.200' },
        { id: 'p3', title: 'Voz + Violão', size: 'Até 100 pessoas', price: 'R$ 2.000' },
        { id: 'p4', title: 'Banda Completa', size: 'Ideal p/ Casamentos', price: 'R$ 4.500' }
      ]
    },
    {
      name: 'Aurora Sky',
      track: 'Night Memories',
      genre: 'Country / Folk',
      img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2070&auto=format&fit=crop',
      reliability: 100,
      equipment: 'Apenas Som Acústico',
      vibes: ['Cozy', 'Acoustic', 'Intimate'],
      packages: [
        { id: 'p1', title: 'Solo Acústico', size: 'Até 20 pessoas', price: 'R$ 600' },
        { id: 'p2', title: 'Duo Acústico', size: 'Até 50 pessoas', price: 'R$ 1.000' },
        { id: 'p3', title: 'Duo + Percussão', size: 'Até 100 pessoas', price: 'R$ 1.800' },
        { id: 'p4', title: 'Banda Country', size: 'Palco Principal', price: 'R$ 3.800' }
      ]
    },
    {
      name: 'The Bloom Trio',
      track: 'Blue Velvet',
      genre: 'Jazz & Soul',
      img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop',
      reliability: 95,
      equipment: 'Necessita P.A. Externo',
      vibes: ['Sophisticated', 'Dinner', 'Jazz Club'],
      packages: [
        { id: 'p1', title: 'Duo Instrumental', size: 'Até 20 pessoas', price: 'R$ 1.200' },
        { id: 'p2', title: 'Trio Jazz Standart', size: 'Até 50 pessoas', price: 'R$ 2.500' },
        { id: 'p3', title: 'Trio + Cantora', size: 'Até 100 pessoas', price: 'R$ 3.500' },
        { id: 'p4', title: 'Big Band/Sexteto', size: 'Eventos Corporativos', price: 'R$ 6.000' }
      ]
    },
  ]

  const nextArtist = () => setCurrentArtistIndex((prev) => (prev + 1) % artists.length)
  const prevArtist = () => setCurrentArtistIndex((prev) => (prev - 1 + artists.length) % artists.length)

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    if (touchStart - touchEnd > 70) nextArtist()
    if (touchStart - touchEnd < -70) prevArtist()
    setTouchStart(null)
  }

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-6 md:px-20 border-b border-white/5 bg-dark/50 backdrop-blur-md sticky top-0 z-50">
          <div onClick={() => setView('landing')} className="text-2xl font-display font-black tracking-tighter cursor-pointer flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center text-white text-lg group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.3)]">S</div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">SOUNDSTAGE</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Funcionalidades</a>
            <a href="#" className="hover:text-primary transition-colors">Como Funciona</a>
            <a href="#" className="hover:text-primary transition-colors">Preços</a>
          </div>
          <button
            onClick={() => setView('login')}
            className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all font-bold text-sm"
          >
            Entrar
          </button>
        </nav>

        {/* Hero Section */}
        <main
          className="flex-grow flex flex-col md:flex-row items-center justify-between text-left px-6 md:px-20 py-20 relative overflow-hidden bg-cover bg-fixed bg-center gap-12 transition-all duration-700"
          style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.8)), url("${artists[currentArtistIndex].img}")` }}
        >
          {/* Noise & Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

          {/* Animated backgrounds */}
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]"></div>

          {/* Left Column: Content */}
          <div className="flex-1 z-10 max-w-3xl">
            <h1 className="text-6xl md:text-[90px] font-black mb-8 leading-[0.85] tracking-tighter">
              ONDE O <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 italic">TALENTO</span> <br />
              ENCONTRA O <span className="text-accent underline decoration-primary/40">PALCO</span> CERTO.
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-xl">
              A plataforma definitiva para conectar artistas e contratantes com transparência, segurança e gestão de ponta a ponta.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => setView('landing-artist')}
                className="btn-accent group flex items-center justify-center gap-3"
              >
                Sou Artista
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={() => setView('landing-contractor')}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 rounded-full font-bold shadow-lg shadow-cyan-500/30 hover:scale-105 group flex items-center justify-center gap-3"
              >
                Sou Contratante
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={() => setView('profile-artist')}
                className="px-8 py-3 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2 group"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                View Profile VIP
              </button>
            </div>
          </div>

          {/* Right Column: Hero Radio Player */}
          <div className="flex-1 z-10 flex justify-center md:justify-end w-full">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="glass p-8 md:p-10 max-w-sm w-full shadow-2xl border-primary/20 group hover:border-primary/50 transition-all relative overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>

              <div className="relative mb-8 select-none">
                <img
                  key={artists[currentArtistIndex].img}
                  src={artists[currentArtistIndex].img}
                  alt={artists[currentArtistIndex].name}
                  className="w-full aspect-square object-cover rounded-2xl shadow-xl animate-in fade-in zoom-in duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h4 className="text-lg font-bold">{artists[currentArtistIndex].name}</h4>
                    <p className="text-sm text-gray-300">{artists[currentArtistIndex].track}</p>
                  </div>
                  <div className="flex gap-1 mb-1">
                    <span className="w-1 h-4 bg-accent animate-music-1"></span>
                    <span className="w-1 h-6 bg-accent animate-music-2"></span>
                    <span className="w-1 h-3 bg-accent animate-music-3"></span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/3 animate-pulse"></div>
                </div>

                <div className="flex justify-between items-center px-4">
                  <button onClick={prevArtist} className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18V6h2v12H6zm3.5-6L18 6v12l-8.5-6z" /></svg>
                  </button>
                  <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                  <button onClick={nextArtist} className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L18 18V6l-8.5 6z" transform="rotate(180 12 12)" /></svg>
                  </button>
                </div>

                <div className="pt-8 text-center">
                  <button onClick={() => setView('profile-artist')} className="text-accent text-[10px] font-black uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all">Saber mais sobre {artists[currentArtistIndex].name} →</button>
                </div>

                <div className="text-center text-xs text-primary font-bold tracking-widest uppercase opacity-70 flex flex-col gap-1">
                  <span>Rádio Soundstage Live</span>
                  <span className="text-[10px] text-gray-500">Deslize para trocar de estilo</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Social Proof Bar */}
        <section className="bg-white/5 backdrop-blur-3xl border-y border-white/5 py-10 overflow-hidden relative">
          <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
          <div className="flex items-center gap-12 animate-marquee whitespace-nowrap px-6 relative z-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-4 text-sm font-black text-gray-300 uppercase tracking-[0.2em]">
                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
                Check-in: <span className="text-primary italic">Jack Wild</span> em Belo Horizonte • <span className="text-white/20">Evento Corporativo</span>
              </div>
            ))}
          </div>
        </section>

        {/* Artist Highlights (Netflix Style) */}
        <section className="py-24 px-6 md:px-20 bg-dark overflow-hidden">
          <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Curadoria Soundstage</span>
              <h2 className="text-4xl md:text-5xl">Destaques da <span className="italic">Semana</span></h2>
              <p className="text-gray-400 mt-4 text-lg">Os artistas mais requisitados pelos melhores contratantes da região.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Ver todos os artistas
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Lia do Samba', type: 'Samba / MPB', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop', rating: '4.9' },
              { name: 'Jack Wild', type: 'Rock / Pop', img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop', rating: '5.0' },
              { name: 'Anya Sharma', type: 'Jazz / Soul', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop', rating: '4.8' },
              { name: 'Leo Folk', type: 'Folk / Indie', img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2070&auto=format&fit=crop', rating: '4.7' }
            ].map((artist, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4">
                  <img
                    src={artist.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={artist.name}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-dark/90 to-transparent">
                    <div className="flex items-center gap-1 text-accent text-sm font-bold">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-accent" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                      {artist.rating}
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{artist.name}</h4>
                <p className="text-sm text-gray-500">{artist.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works / Steps */}
        <section className="py-24 px-6 md:px-20 bg-dark">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl mb-20 text-center">Simples. <span className="text-primary italic">Veloz.</span> Seguro.</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { step: '01', title: 'Cadastre-se grátis', desc: 'Crie seu perfil profissional ou configure seu perfil de contratante em minutos.' },
                { step: '02', title: 'Conecte e Combine', desc: 'Busque talentos ou seja descoberto por palcos de elite da sua região.' },
                { step: '03', title: 'Show e Cache', desc: 'Faça sua performance, gere check-in e receba seu pagamento com 100% de segurança.' }
              ].map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="text-9xl font-display font-black text-white/5 absolute -top-16 left-1/2 -translate-x-1/2 group-hover:text-primary/10 transition-colors">{item.step}</div>
                  <div className="relative z-10">
                    <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                    <p className="text-gray-500 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-10 border-t border-white/10 text-center text-gray-500">
          <p>© 2026 SOUNDSTAGE - Transformando a cena musical brasileira.</p>
        </footer>
      </div>
    )
  }

  if (view === 'landing-artist') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col selection:bg-accent selection:text-dark overflow-x-hidden">
        {/* Nav Luxo */}
        <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-6 md:px-12 z-[100] transition-all duration-500 bg-dark/80 backdrop-blur-2xl border-b border-accent/20">
          <div onClick={() => setView('landing')} className="text-3xl font-display font-black tracking-tighter cursor-pointer flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-accent to-accent-light rounded-xl flex items-center justify-center text-dark text-lg group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,191,0,0.3)]">S</div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">SOUNDSTAGE</span>
          </div>
          <button
            onClick={() => setView('landing')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:text-dark transition-all duration-500 font-bold tracking-widest text-xs uppercase"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Voltar ao Início
          </button>
        </nav>

        <main className="flex-grow pt-24">
          {/* Hero Cinematic Artist */}
          <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-dark"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay scale-110 animate-slow-zoom"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[160px] rounded-full opacity-50"></div>

            {/* Text Content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#ffbf00]"></div>
                <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em]">Convite Exclusivo: Interior de MG</span>
              </div>

              <h1 className="text-6xl md:text-[120px] font-black leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                A ELITE DA <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-accent-light via-accent to-accent-dark italic">MÚSICA MINEIRA</span>
              </h1>

              <p className="text-xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                Onde o talento bruto é lapidado em <span className="text-white font-bold">business de alto nível</span>. Entre para o maior portal de contratação da região.
              </p>

              <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-14 duration-1000 delay-700">
                <button
                  onClick={() => setView('role-selection')}
                  className="group relative px-12 py-6 bg-accent rounded-full text-dark text-xl font-black overflow-hidden shadow-[0_20px_40px_rgba(255,191,0,0.3)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="relative z-10">PLEITEAR MINHA VAGA</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Artist" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-black bg-accent flex items-center justify-center text-[10px] font-black text-dark">+2k</div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-10 left-12 hidden lg:flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl animate-float">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L9 9H1L8 14L5 22L12 17L19 22L16 14L23 9H15L12 1Z" /></svg>
              </div>
              <div>
                <h5 className="text-sm font-black uppercase text-accent">Nível Black Label</h5>
                <p className="text-[10px] text-gray-500">Apenas os 10% melhores são convidados</p>
              </div>
            </div>
          </section>

          {/* Business Intelligence Section */}
          <section className="py-40 px-6 md:px-20 bg-dark relative">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
              <div className="flex-1 space-y-12">
                <div className="space-y-4">
                  <span className="text-accent text-sm font-black uppercase tracking-[0.5em]">The Infrastructure</span>
                  <h2 className="text-5xl md:text-8xl font-black leading-tight italic">
                    Nós somos o seu <br />
                    <span className="text-white">Escritório Particular.</span>
                  </h2>
                </div>

                <p className="text-xl text-gray-400 leading-relaxed">
                  Soundstage não é um diretório. É um sistema de inteligência de carreira que coloca você no centro dos maiores palcos de Minas Gerais.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 group hover:border-accent/40 transition-colors">
                    <div className="w-14 h-14 bg-accent text-dark rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Visibilidade de Elite</h4>
                    <p className="text-gray-500 leading-snug">Seu perfil será entregue via push inteligente para contratantes com alto poder de investimento.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 group hover:border-accent/40 transition-colors">
                    <div className="w-14 h-14 bg-accent text-dark rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Cachê Blindado</h4>
                    <p className="text-gray-500 leading-snug">O pagamento é retido com segurança e liberado automaticamente. O fim da inadimplência.</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full"></div>
                <div className="relative glass p-4 rounded-[3rem] border-white/10 overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-700">
                  <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" className="rounded-[2.5rem] w-full" alt="Black Label Board" />
                  <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-accent/20">
                    <div className="w-3 h-3 bg-accent rounded-full animate-ping"></div>
                    <span className="text-[10px] font-black uppercase text-white tracking-widest">Live: Dashboard Elite</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Exclusive Page - High End Focus */}
          <section className="py-40 px-6 bg-dark border-y border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-32">
              <div className="flex-1 order-2 md:order-1 relative group">
                <div className="absolute -inset-10 bg-accent/10 rounded-full blur-[120px] transition-all group-hover:bg-accent/20"></div>
                <div className="relative max-w-sm mx-auto perspective-1000">
                  <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" className="rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-4 border-white/10 rotate-y-12 group-hover:rotate-y-0 transition-transform duration-1000" alt="Exclusive Profile" />
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 bg-accent p-6 rounded-3xl shadow-2xl animate-bounce-slow">
                    <h6 className="text-dark font-black text-2xl tracking-tighter italic">LINK NA BIO <br /> PREMIUM</h6>
                  </div>
                </div>
              </div>

              <div className="flex-1 order-1 md:order-2 space-y-10">
                <div className="space-y-4">
                  <span className="text-accent text-sm font-black uppercase tracking-[0.5em]">Proprietary Branding</span>
                  <h2 className="text-5xl md:text-8xl font-black italic leading-[0.9]">
                    Sua Identidade <br />
                    <span className="text-white">IMPECÁVEL.</span>
                  </h2>
                </div>

                <p className="text-2xl text-gray-400">
                  Entregue um link que transborda profissionalismo. O fim das apresentações amadoras começa aqui.
                </p>

                <div className="space-y-6">
                  {[
                    { t: 'Showroom Digital', d: 'Seu portfólio em alta definição para quem realmente decide.' },
                    { t: 'Agenda Royal', d: 'Eles vêem sua agenda, escolhem as datas e pagam premium.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 items-start">
                      <div className="w-1.5 h-16 bg-gradient-to-b from-accent to-transparent"></div>
                      <div>
                        <h4 className="text-2xl font-bold italic">{item.t}</h4>
                        <p className="text-gray-500 text-lg">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Luxury Journey Roadmap */}
          <section className="py-40 px-6 md:px-20 bg-dark relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[150px] rounded-full"></div>

            <div className="max-w-7xl mx-auto text-center mb-32 relative z-10">
              <span className="text-accent font-black uppercase tracking-[0.6em] text-xs mb-6 block">Career Evolution Path</span>
              <h2 className="text-5xl md:text-[100px] font-black mb-8 leading-[0.8] tracking-tighter">THE <span className="text-accent italic">BLACK</span> JOURNEY</h2>
              <p className="text-2xl text-gray-500 max-w-3xl mx-auto">Onde o sucesso não é uma opção, é a única saída. Percorra o caminho da elite.</p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
              {/* Fase 1 */}
              <div className="relative group p-1.5 rounded-[2.5rem] bg-gradient-to-b from-accent/50 to-transparent">
                <div className="relative h-full glass p-10 rounded-[2.4rem] border-white/5 flex flex-col justify-between group-hover:bg-accent/10 transition-colors">
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent rounded-full flex items-center justify-center font-black text-dark text-xl shadow-2xl shadow-accent/50">I</div>
                  <div>
                    <h4 className="text-3xl font-black mb-8 text-white skew-x-2">GENESIS</h4>
                    <ul className="space-y-4">
                      {['Portal Business', 'Visual Premium', 'Dashboard Elite'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-gray-300 font-bold tracking-tight">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10 pt-6 border-t border-white/5">
                    <span className="text-[10px] font-black text-accent uppercase tracking-widest bg-accent/10 py-1 px-3 rounded-md">ATIVO AGORA</span>
                  </div>
                </div>
              </div>

              {/* Locked Phases (Blurred) */}
              {[
                { n: 'II', t: 'ASCENT', r: '10 SHOWS', d: ['Ads Regional', 'Graphic Squad', 'Performance View'] },
                { n: 'III', t: 'PRESTIGE', r: '50 SHOWS', d: ['Private Podcast', 'Studio Recording', 'Brand Strategy'] },
                { n: 'IV', t: 'BLACK', r: 'ELITE CLUB', d: ['Mgmt Personal', 'Sponsored Tour', '24/7 Crew'] }
              ].map((phase, idx) => (
                <div key={idx} className="relative group p-1.5 rounded-[2.5rem] bg-white/5 opacity-50 contrast-75">
                  <div className="relative h-full glass p-10 rounded-[2.4rem] border-white/5 blur-[4px] grayscale transition-all duration-700 hover:blur-[2px] hover:grayscale-0">
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center font-black text-gray-400 text-xl">{phase.n}</div>
                    <h4 className="text-3xl font-black mb-8 text-gray-500 uppercase italic tracking-tighter">{phase.t}</h4>
                    <ul className="space-y-4">
                      {phase.d.map(item => (
                        <li key={item} className="text-sm text-gray-600 font-bold">{item}</li>
                      ))}
                    </ul>
                    <div className="mt-10 pt-6 border-t border-white/5">
                      <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{phase.r}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-accent/10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <div className="inline-block px-10 py-4 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-xl">
                <p className="text-accent text-sm font-black italic tracking-widest uppercase">Um artista ativo é um artista próspero.</p>
              </div>
            </div>
          </section>

          {/* Final CTA Premium */}
          <section className="py-60 px-6 text-center bg-dark relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,191,0,0.1)_0%,transparent_70%)]"></div>
            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <h2 className="text-6xl md:text-[100px] font-black leading-[0.8] tracking-tighter">Sua Ascensão <br /> <span className="text-accent italic">INEVITÁVEL.</span></h2>
              <p className="text-2xl text-gray-400 max-w-2xl mx-auto">Não perca mais tempo sendo apenas mais um músico. Seja o negócio que todos querem fechar.</p>
              <button
                onClick={() => setView('role-selection')}
                className="px-20 py-8 bg-white text-dark text-2xl font-black rounded-full shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all"
              >
                INICIAR MINHA GENESIS
              </button>
              <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">O palco regional premium está pronto.</p>
            </div>
          </section>
        </main>

        <footer className="py-20 px-12 bg-dark border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-2xl font-black tracking-tighter">SOUNDSTAGE <span className="text-accent italic">ELITE</span></div>
          <div className="text-gray-600 text-sm font-bold uppercase tracking-[0.2em]">© 2026 Interior de Minas Excellence</div>
          <div className="flex gap-6">
            {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border border-white/10 hover:border-accent transition-colors flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100"></div>)}
          </div>
        </footer>
      </div>
    )
  }

  if (view === 'landing-contractor') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col selection:bg-cyan-500 selection:text-white overflow-x-hidden">
        {/* Nav Corporate */}
        <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-6 md:px-12 z-[100] transition-all duration-500 bg-dark/80 backdrop-blur-2xl border-b border-white/5">
          <div onClick={() => setView('landing')} className="text-3xl font-display font-black tracking-tighter cursor-pointer flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-lg group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.3)]">S</div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">SOUNDSTAGE</span>
          </div>
          <button
            onClick={() => setView('landing')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-white transition-all duration-500 font-bold tracking-widest text-xs uppercase"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Início
          </button>
        </nav>

        <main className="flex-grow pt-24">
          {/* Hero Experience - Contractor */}
          <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.05),transparent_50%)]"></div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">Solução para Grandes Eventos</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                  GARANTA O <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 italic">SHOW PERFEITO.</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
                  Transforme seu evento com artistas validados por <span className="text-white font-bold text-shadow-glow">dados reais</span>. Pontualidade, técnica e repertório sob seu controle total.
                </p>

                <div className="pt-6 flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => setView('role-selection')}
                    className="px-12 py-6 bg-cyan-500 rounded-full text-white text-xl font-black shadow-[0_20px_40px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all"
                  >
                    CONTRATAR AGORA
                  </button>
                  <button className="px-12 py-6 rounded-full border border-white/10 hover:bg-white/5 transition-all text-gray-300 font-bold">
                    EXPLORAR PORTFÓLIO
                  </button>
                </div>
              </div>

              <div className="flex-1 relative group w-full lg:w-auto">
                <div className="absolute -inset-10 bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-all"></div>
                <div className="relative glass p-4 rounded-[2rem] border-white/10 shadow-3xl transform rotate-3 hover:rotate-0 transition-transform duration-1000">
                  {/* Metric Card Mockup */}
                  <div className="bg-dark p-6 rounded-[1.5rem] border border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                      <h5 className="text-cyan-500 font-black text-xs uppercase tracking-widest">Artist Reliability Score</h5>
                      <span className="bg-cyan-500/10 text-cyan-500 px-3 py-1 rounded-full text-[10px] font-black">ANALYSIS LIVE</span>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: 'Pontualidade', score: 98, color: 'bg-green-500' },
                        { label: 'Domínio de Repertório', score: 95, color: 'bg-cyan-500' },
                        { label: 'Engajamento de Público', score: 92, color: 'bg-blue-500' }
                      ].map(metric => (
                        <div key={metric.label}>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400">{metric.label}</span>
                            <span className="font-black text-white">{metric.score}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full ${metric.color} rounded-full`} style={{ width: `${metric.score}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-800 border border-cyan-500/50 p-1">
                        <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop" className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Artist" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Jack Wild</p>
                        <p className="text-[10px] text-gray-500">Curadoria Soundstage Platinum</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Grid - Rhythm Diversity */}
          <section className="py-32 px-6 md:px-20 bg-dark-lighter border-y border-white/5">
            <div className="max-w-7xl mx-auto mb-20">
              <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="text-cyan-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Musical Diversity</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter">O Artista certo, <br /><span className="text-white italic">no momento certo.</span></h2>
                </div>
                <p className="text-gray-400 text-lg md:text-xl max-w-sm mb-2">Do barzinho ao festival. Curadoria especializada para cada tipo de público.</p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { genre: 'Samba & Pagode', label: '+450 Artistas', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop' },
                { genre: 'Rock & Pop', label: '+320 Artistas', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop' },
                { genre: 'Sertanejo & Country', label: '+680 Artistas', img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2070&auto=format&fit=crop' },
                { genre: 'Jazz & Bossa', label: '+120 Artistas', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop' },
                { genre: 'DJs & Eletrônica', label: '+210 Artistas', img: 'https://images.unsplash.com/photo-1470221217718-703393c89ca4?q=80&w=2070&auto=format&fit=crop' }
              ].map((item, idx) => (
                <div key={idx} className="group relative aspect-[4/5] overflow-hidden rounded-3xl cursor-pointer">
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={item.genre} />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent group-hover:via-cyan-500/20 transition-all"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-xl font-black mb-1 leading-tight">{item.genre}</h4>
                    <span className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Intelligence Section - The Evaluation System */}
          <section className="py-40 px-6 md:px-20 bg-dark overflow-hidden relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-cyan-500 text-sm font-black uppercase tracking-[0.5em]">The Decision Engine</span>
                  <h2 className="text-5xl md:text-8xl font-black italic leading-[0.9]">
                    Escolha com <br />
                    <span className="text-white">PRECISÃO.</span>
                  </h2>
                </div>

                <p className="text-2xl text-gray-400">
                  Chega de vídeos de WhatsApp distorcidos. Assista a apresentações reais, veja notas técnicas e contrate com a segurança de um expert.
                </p>

                <div className="space-y-10">
                  {[
                    { t: 'Vídeos Reais', d: 'Gravações sem processamento de estúdio. O que você vê é o que terá no palco.' },
                    { t: 'Notas de Pares', d: 'Avaliações exclusivas de outros contratantes sobre comportamento e técnica.' },
                    { t: 'Musicalidade 360°', d: 'Análise de repertório, versatilidade e adaptação ao ambiente.' }
                  ].map((feature, idx) => (
                    <div key={idx} className="group flex gap-8 items-start">
                      <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-cyan-500/20 group-hover:bg-cyan-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-500 group-hover:text-dark transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{feature.t}</h4>
                        <p className="text-gray-500 text-lg leading-snug">{feature.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-cyan-600/10 blur-[120px] rounded-full"></div>
                <div className="relative glass p-8 rounded-[3rem] border-white/5 shadow-2xl space-y-8 animate-float">
                  <div className="flex items-center gap-6 p-6 bg-dark/50 rounded-2xl border border-white/5">
                    <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-dark font-black text-2xl">A</div>
                    <div>
                      <h6 className="text-xl font-black">Anya Sharma</h6>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => <svg key={i} className="w-4 h-4 fill-cyan-400" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>)}
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="block text-cyan-500 font-bold">4.9/5.0</span>
                      <span className="text-[10px] text-gray-500">24 CONTRATOS</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark/50 p-6 rounded-2xl border border-white/5">
                      <span className="text-[10px] uppercase text-gray-500 block mb-2">Pontualidade</span>
                      <span className="text-2xl font-black text-white">9/10</span>
                    </div>
                    <div className="bg-dark/50 p-6 rounded-2xl border border-white/5">
                      <span className="text-[10px] uppercase text-gray-500 block mb-2">Equipamento</span>
                      <span className="text-2xl font-black text-white">Pro</span>
                    </div>
                  </div>

                  <div className="aspect-video bg-gray-900 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden border border-white/10">
                    <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all" alt="Play Video" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-125 transition-all border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-white ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 px-4 py-2 rounded-full border border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-white tracking-widest">Show ao vivo - SESC BH</span>
                      <span className="text-[10px] text-cyan-400 font-bold">HD QUALITY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Guarantee Section */}
          <section className="py-32 px-6 md:px-20">
            <div className="max-w-4xl mx-auto text-center glass p-12 md:p-20 rounded-[4rem] border-red-500/20 relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/10 blur-[100px] rounded-full group-hover:bg-red-500/20 transition-all"></div>

              <div className="w-20 h-20 bg-red-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-red-500/30 transform rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>

              <h2 className="text-4xl md:text-6xl font-black mb-6">Backup <span className="text-red-500 italic">Instantâneo.</span></h2>
              <p className="text-xl text-gray-400 mb-10">O show não pode parar. Se o seu artista tiver um imprevisto, nossa IA escala o próximo da lista de elite automaticamente.</p>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-black text-sm uppercase tracking-widest">
                Segurança 100% Soundstage
              </div>
            </div>
          </section>

          {/* Final CTA Contractor */}
          <section className="py-60 px-6 text-center bg-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]"></div>
            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
              <h1 className="text-6xl md:text-[120px] font-black leading-[0.8] tracking-tighter">O SUCESSO DO <br /> SEU EVENTO <br /> <span className="text-cyan-400 italic">É CIÊNCIA.</span></h1>
              <p className="text-2xl text-gray-400 max-w-2xl mx-auto">Pare de contar com a sorte. Tenha a curadoria Soundstage cuidando de cada nota do seu palco.</p>
              <button
                onClick={() => setView('role-selection')}
                className="px-20 py-8 bg-cyan-500 text-white text-2xl font-black rounded-full shadow-[0_30px_60px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all outline outline-offset-4 outline-cyan-500/30"
              >
                ACESSAR O PORTAL
              </button>
            </div>
          </section>
        </main>

        <footer className="py-20 px-12 bg-dark border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-white text-xs">S</div>
            SOUNDSTAGE <span className="text-cyan-500 italic">BUSINESS</span>
          </div>
          <div className="text-gray-600 text-sm font-bold uppercase tracking-[0.2em]">© 2026 Inteligência Musical Aplicada</div>
          <div className="flex gap-6 text-gray-400">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">LinkedIn</span>
            <span className="hover:text-cyan-400 cursor-pointer transition-colors">Instagram</span>
          </div>
        </footer>
      </div>
    )
  }

  if (view === 'role-selection') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/60 to-dark"></div>

        <nav className="p-8 md:px-12 flex justify-between items-center absolute top-0 w-full z-20">
          <div onClick={() => setView('landing')} className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-dark text-xs">S</div>
            SOUNDSTAGE
          </div>
          <button onClick={() => setView('landing')} className="text-sm font-bold text-gray-500 hover:text-white transition-colors">Voltar</button>
        </nav>

        <div className="relative z-10 w-full max-w-5xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Como você quer <br /> <span className="text-accent underline decoration-white/10">começar?</span></h1>
            <p className="text-gray-400 text-lg font-medium">Escolha o seu perfil para acessar ferramentas exclusivas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => setView('register-artist')}
              className="group relative glass p-10 rounded-[48px] border-accent/10 hover:border-accent/40 transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center space-y-6"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">🎸</div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black italic uppercase">Sou Artista</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Divulgue seu trabalho, gerencie sua agenda e receba pagamentos garantidos.</p>
              </div>
              <button className="px-8 py-4 bg-accent text-dark font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-accent/20 group-hover:translate-y-[-4px] transition-all">
                CRIAR PERFIL ARTÍSTICO
              </button>
            </div>

            <div
              onClick={() => setView('register-contractor')}
              className="group relative glass p-10 rounded-[48px] border-cyan-500/10 hover:border-cyan-500/40 transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center space-y-6"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-20 h-20 bg-cyan-500/20 rounded-3xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">🏢</div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black italic uppercase">Sou Contratante</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Busque talentos, faça reservas seguras e profissionalize seu entretenimento.</p>
              </div>
              <button className="px-8 py-4 bg-cyan-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-cyan-500/20 group-hover:translate-y-[-4px] transition-all">
                CRIAR CONTA BUSINESS
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'register-artist') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden selection:bg-accent selection:text-dark">
        {/* Cinematic Background - Music Focused */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 animate-slow-zoom"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/20 to-dark"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <nav className="p-6 md:px-12 flex justify-between items-center absolute top-0 w-full z-20">
          <div onClick={() => setView('role-selection')} className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-dark text-xs">S</div>
            SOUNDSTAGE
          </div>
          <button onClick={() => setView('role-selection')} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">← Voltar</button>
        </nav>

        <div className="max-w-md w-full glass p-10 md:p-12 border-accent/20 relative z-10 mt-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black mb-2 text-white italic">Inicie sua <span className="text-accent underline decoration-white/20">Genesis</span>.</h2>
            <p className="text-gray-500 text-sm">Preencha os dados oficiais para pleitear sua vaga na elite mineira.</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Nome Artístico</label>
              <input type="text" placeholder="Ex: Jack Wild" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
            </div>
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">WhatsApp Oficial</label>
              <input type="tel" placeholder="(31) 98888-8888" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Pitch / Bio Curta (150 caracteres)</label>
              <textarea placeholder="Sua frase de impacto para convencer o contratante..." className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm h-20 resize-none"></textarea>
            </div>

            <div className="space-y-2 col-span-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Gênero Principal</label>
              <select className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all text-gray-400 font-bold text-sm">
                <option>Selecione seu estilo</option>
                <option>Rock / Pop</option>
                <option>Sertanejo / Country</option>
                <option>Samba / Pagode</option>
                <option>Jazz / Blues</option>
              </select>
            </div>
            <div className="space-y-2 col-span-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Link de Vídeo (YouTube)</label>
              <input type="url" placeholder="https://youtube.com/..." className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Rider Técnico (Equipamentos Necessários)</label>
              <textarea placeholder="Ex: 2 canais XLR para mesa, 1 tomada 220v, espaço de 3x2m..." className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm h-24 resize-none"></textarea>
            </div>

            <div className="pt-4 md:col-span-2">
              <button
                onClick={() => setView('dashboard-artist')}
                type="button"
                className="w-full py-5 bg-accent hover:bg-accent-dark text-dark font-black rounded-2xl shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-widest"
              >
                CRIAR PERFIL ARTÍSTICO
              </button>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">Já tem uma conta? <button onClick={() => setView('login')} className="text-accent font-bold hover:underline">Entrar</button></p>
              </div>
              <p className="text-[10px] text-center text-gray-600 mt-6 uppercase font-bold tracking-tighter">
                Ao se inscrever, você aceita nossos termos de uso premium.
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (view === 'register-contractor') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col selection:bg-cyan-500 selection:text-white">
        <nav className="p-6 md:px-12 flex justify-between items-center absolute top-0 w-full z-10">
          <div onClick={() => setView('role-selection')} className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-white text-xs">S</div>
            SOUNDSTAGE
          </div>
          <button onClick={() => setView('role-selection')} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">← Voltar</button>
        </nav>

        <div className="flex-grow flex items-center justify-center px-6 py-20 relative overflow-hidden">
          {/* Cinematic Background - Music Business Focused */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 scale-110 animate-slow-zoom"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-dark/95 via-transparent to-dark"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full"></div>

          <div className="max-w-md w-full glass p-10 md:p-12 border-cyan-500/20 relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black mb-2 text-white">Novo <span className="text-cyan-500">Contratante</span></h2>
              <p className="text-gray-500 text-sm">Acesse a melhor inteligência musical de Minas Gerais.</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">Nome do Responsável</label>
                <input type="text" placeholder="Nome completo" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
              </div>
              <div className="space-y-2 col-span-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">Documento (CPF/RG)</label>
                <input type="text" placeholder="000.000.000-00" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">Nome do Estabelecimento</label>
                <input type="text" placeholder="Ex: Choperia Central" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
              </div>
              <div className="space-y-2 col-span-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">CNPJ</label>
                <input type="text" placeholder="00.000.000/0001-00" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
              </div>
              <div className="space-y-2 col-span-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">WhatsApp</label>
                <input type="tel" placeholder="(31) 97777-7777" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">E-mail Corporativo</label>
                <input type="email" placeholder="contato@empresa.com.br" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">Endereço Completo</label>
                <input type="text" placeholder="Rua, número, bairro, cidade" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
              </div>
              <div className="pt-4 md:col-span-2">
                <button
                  onClick={() => setView('dashboard-contractor')}
                  type="button"
                  className="w-full py-5 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-widest"
                >
                  CRIAR CONTA BUSINESS
                </button>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">Já tem uma conta? <button onClick={() => setView('login')} className="text-cyan-500 font-bold hover:underline">Entrar</button></p>
                </div>
                <p className="text-[10px] text-center text-gray-600 mt-6 uppercase font-bold tracking-tighter">
                  Garantia de segurança e backup Soundstage inclusos.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Cinematic Background for Login - Music Focus */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 animate-slow-zoom"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/20 to-dark"></div>
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>

        <nav className="absolute top-0 w-full p-8 flex justify-center">
          <div onClick={() => setView('landing')} className="text-4xl font-black tracking-tighter cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">SOUNDSTAGE</div>
        </nav>

        <div className="max-w-md w-full glass p-10 md:p-12 border-white/5 relative z-10 text-center">
          <h2 className="text-3xl font-black mb-8 text-white">Bem-vindo de volta.</h2>

          <form className="space-y-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Cadastrado</label>
              <input type="email" placeholder="seu@email.com" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-primary focus:bg-white/10 outline-none transition-all placeholder:text-gray-700" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sua Senha</label>
                <a href="#" className="text-[9px] font-bold text-primary uppercase">Esqueci a senha</a>
              </div>
              <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-primary focus:bg-white/10 outline-none transition-all placeholder:text-gray-700" />
            </div>

            <div className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setView('dashboard-contractor')}
                  type="button"
                  className="group relative py-5 bg-white text-dark font-black rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl text-center"
                >
                  <span className="relative z-10 text-[10px] uppercase font-black tracking-widest">Contratante</span>
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  onClick={() => setView('dashboard-artist')}
                  type="button"
                  className="group relative py-5 bg-accent text-dark font-black rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl text-center"
                >
                  <span className="relative z-10 text-[10px] uppercase font-black tracking-widest">Sou Artista</span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4 text-center">
                <p className="text-sm text-gray-500 font-medium tracking-tight">Novo por aqui? Viva a experiência Soundstage.</p>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setView('role-selection')}
                    className="w-full py-5 bg-gradient-to-r from-accent to-accent-dark text-dark font-black rounded-2xl shadow-xl shadow-accent/10 hover:scale-[1.02] transition-all text-xs uppercase tracking-[0.2em]"
                  >
                    Criar Minha Conta Grátis
                  </button>
                  <button onClick={() => setView('profile-artist')} className="w-full py-4 text-[10px] font-black uppercase tracking-widest border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                    Demo: Perfil Black Label
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <button onClick={() => setView('landing')} className="mt-12 text-sm font-bold text-gray-600 hover:text-white transition-colors">← Voltar para a Home</button>
      </div>
    )
  }

  if (view === 'profile-artist') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans selection:bg-accent selection:text-dark">
        {/* Navigation - Profile Style */}
        <nav className="fixed top-0 inset-x-0 h-20 flex items-center justify-between px-6 md:px-12 z-[100] bg-dark/40 backdrop-blur-3xl border-b border-white/5">
          <div onClick={() => setView('landing')} className="text-xl font-black tracking-tighter cursor-pointer flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-dark text-xs group-hover:rotate-12 transition-transform">S</div>
            SOUNDSTAGE
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setView('landing-artist')}
              className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors"
            >
              Voltar ao Painel
            </button>
            <button className="px-6 py-2 bg-accent text-dark text-xs font-black rounded-full shadow-lg shadow-accent/20 hover:scale-105 transition-all">
              CONTRATAR AGORA
            </button>
          </div>
        </nav>

        {/* Hero Cinematic Profile */}
        <header className="relative h-[80vh] flex items-end pb-20 px-6 md:px-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
              alt="Artist Cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-end justify-between gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-accent text-dark text-[10px] font-black uppercase rounded-full">Nível Black Label</span>
                  <span className="flex items-center gap-1 text-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 1L9 9H1L8 14L5 22L12 17L19 22L16 14L23 9H15L12 1Z" /></svg>
                    <span className="text-sm font-bold tracking-widest uppercase mt-0.5">Artista Verificado</span>
                  </span>
                </div>
                <h1 className="text-7xl md:text-[140px] font-black leading-[0.8] tracking-tighter">
                  JACK <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-white to-accent-dark">WILD</span>
                </h1>
                <div className="flex items-center gap-8 text-gray-400">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">Gênero</span>
                    <span className="text-lg font-bold text-white">Rock / Pop / Indie</span>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">Avaliação</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-white">5.0</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-accent"></div>)}
                      </div>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">Confiabilidade</span>
                    <span className="text-lg font-bold text-green-500">{artists[0].reliability}%</span>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">Setup</span>
                    <span className="text-lg font-bold text-white">{artists[0].equipment}</span>
                  </div>
                  <div className="h-8 w-px bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">Local</span>
                    <span className="text-lg font-bold text-white">Belo Horizonte, MG</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-6 glass border-accent/20 text-center min-w-[140px]">
                  <span className="block text-3xl font-black text-accent">240+</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Shows Realizados</span>
                </div>
                <div className="p-6 glass border-accent/20 text-center min-w-[140px]">
                  <span className="block text-3xl font-black text-accent">100%</span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pontualidade</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-24 space-y-40">

          {/* Section: Bio & Socials */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <span className="text-accent text-sm font-black uppercase tracking-widest">História</span>
                <h2 className="text-5xl font-black italic">A Alma do Rock <br /> <span className="text-white">Mineiro.</span></h2>
              </div>
              <p className="text-xl text-gray-400 leading-relaxed font-light">
                Com mais de 10 anos de estrada e passagens pelos maiores festivais do Brasil, Jack Wild traz uma experiência imersiva que mistura o peso do rock clássico com as texturas do indie moderno. Conhecido pela performance explosiva e o domínio vocal único, Jack transformou casas noturnas, ventos corporativos e casamentos de luxo em verdadeiras arenas de rock.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Gibson Les Paul Custom', 'Marshall Amplification', 'Shure Wireless Syst.', 'Banda Completa', 'Acústico Solo'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-gray-400">{tag}</span>
                ))}
              </div>
            </div>

            <div className="space-y-12 bg-white/5 p-10 rounded-[40px] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
              <div className="space-y-6 relative z-10">
                <h4 className="text-xl font-black uppercase tracking-widest border-b border-white/10 pb-4">Conexões Oficiais</h4>
                <div className="space-y-6">
                  <a href="#" className="flex items-center justify-between group/link">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover/link:bg-accent/20 transition-colors text-gray-500 group-hover/link:text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.475 1.382.897.422.422.681.822.897 1.382.163.422.358 1.057.412 2.227.059 1.266.071 1.645.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.475.96-.897 1.382-.422.422-.822.681-1.382.897-.422.163-1.057.358-2.227.412-1.266.059-1.645.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.475-1.382-.897-.422-.422-.681-.822-.897-1.382-.163-.422-.358-1.057-.412-2.227-.059-1.266-.071-1.645-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.475-.96.897-1.382.422-.422.822-.681 1.382-.897.422-.163 1.057-.358 2.227-.412 1.266-.059 1.645-.071 4.85-.071zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.15.26-2.914.557-.79.307-1.459.717-2.126 1.384-.667.667-1.077 1.336-1.384 2.126-.298.764-.501 1.637-.558 2.914-.058 1.28-.071 1.688-.071 4.947s.013 3.667.071 4.947c.057 1.277.26 2.15.558 2.914.307.79.717 1.459 1.384 2.126.667.667 1.336 1.077 2.126 1.384.764.298 1.637.501 2.914.558 1.28.058 1.688.071 4.947.071s3.667-.013 4.947-.071c1.277-.057 2.15-.26 2.914-.558.79-.307 1.459-.717 2.126-1.384.667-.667 1.077-1.336 1.384-2.126.298-.764.501-1.637.558-2.914.058-1.28.071-1.688.071-4.947s-.013-3.667-.071-4.947c-.057-1.277-.26-2.15-.558-2.914-.307-.79-.717-1.459-1.384-2.126-.667-.667-1.336-1.077-2.126-1.384-.764-.298-1.637-.501-2.914-.558-1.28-.057-1.688-.071-4.947-.071zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.441s-.645 1.441-1.441 1.441-1.441-.645-1.441-1.441.645-1.441 1.441-1.441z" /></svg>
                      </div>
                      <div>
                        <span className="block text-sm font-bold">Instagram</span>
                        <span className="text-xs text-gray-600">65k seguidores</span>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 group-hover/link:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                  <a href="#" className="flex items-center justify-between group/link">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover/link:bg-accent/20 transition-colors text-gray-500 group-hover/link:text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.931-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                      </div>
                      <div>
                        <span className="block text-sm font-bold">YouTube</span>
                        <span className="text-xs text-gray-600">Canal Oficial</span>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 group-hover/link:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Showcase Videos */}
          <section className="space-y-12">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <span className="text-accent text-sm font-black uppercase tracking-widest">Showcase</span>
                <h2 className="text-5xl font-black italic">Live Sessions <br /> <span className="text-white">& Music Videos.</span></h2>
              </div>
              <button className="text-accent text-sm font-black uppercase tracking-widest border-b-2 border-accent pb-2 hover:opacity-50 transition-opacity">Ver no YouTube</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { id: '1', title: 'Sunset Live Session', url: 'https://images.unsplash.com/photo-1549213821-4708d624e1d1?q=80&w=1932&auto=format&fit=crop' },
                { id: '2', title: 'Original: "Neon Thunder"', url: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2076&auto=format&fit=crop' }
              ].map(video => (
                <div key={video.id} className="group relative aspect-video rounded-[32px] overflow-hidden border border-white/10">
                  <img src={video.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={video.title} />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-accent text-dark rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <h4 className="text-2xl font-black text-white">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Pacotes de Performance */}
          <section className="space-y-16">
            <div className="max-w-3xl space-y-4">
              <span className="text-accent text-sm font-black uppercase tracking-widest">Pricing & Packages</span>
              <h2 className="text-5xl font-black italic">Escolha o formato ideal <br /> <span className="text-white">para o seu evento.</span></h2>
              <p className="text-xl text-gray-500 font-light">Valores transparentes e formatos validados para garantir a melhor experiência acústica e técnica.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {artists[0].packages.map((pkg) => (
                <div key={pkg.id} className="group relative glass p-8 rounded-[40px] border-white/5 hover:border-accent/40 transition-all hover:translate-y-[-8px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>
                  <div className="relative z-10 space-y-6">
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black text-white">{pkg.title}</h4>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent/60">{pkg.size}</p>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">Investimento</span>
                      <div className="text-4xl font-black text-white italic">{pkg.price}</div>
                    </div>
                    <ul className="space-y-3 pt-4">
                      {['Rider Técnico Incluso', 'Sonorização Própria', '2h de Performance'].map(item => (
                        <li key={item} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                          <div className="w-1 h-1 bg-accent rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark hover:border-accent transition-all">
                      Selecionar Pactote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Photo Masonry */}
          <section className="space-y-12">
            <div className="space-y-2">
              <span className="text-accent text-sm font-black uppercase tracking-widest">Estética</span>
              <h2 className="text-5xl font-black italic">Galeria <br /> <span className="text-white">Editorial.</span></h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="space-y-4 md:space-y-8">
                <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl border border-white/5 hover:border-accent/40 transition-colors" alt="Gallery" />
                <img src="https://images.unsplash.com/photo-1514525253361-bee8718a300a?q=80&w=1974&auto=format&fit=crop" className="rounded-3xl border border-white/5 hover:border-accent/40 transition-colors" alt="Gallery" />
              </div>
              <div className="pt-8 space-y-4 md:space-y-8">
                <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl border border-white/5 hover:border-accent/40 transition-colors" alt="Gallery" />
                <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl border border-white/5 hover:border-accent/40 transition-colors" alt="Gallery" />
              </div>
              <div className="space-y-4 md:space-y-8">
                <img src="https://images.unsplash.com/photo-1520529986993-34c702256da6?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl border border-white/5 hover:border-accent/40 transition-colors" alt="Gallery" />
                <img src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl border border-white/5 hover:border-accent/40 transition-colors" alt="Gallery" />
              </div>
              <div className="pt-12 space-y-4 md:space-y-8">
                <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop" className="rounded-3xl border border-white/5 hover:border-accent/40 transition-colors" alt="Gallery" />
              </div>
            </div>
          </section>

          {/* Section: Repertoire List */}
          <section className="py-24 px-10 md:px-20 bg-white/5 rounded-[60px] border border-white/5 relative overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px]"></div>

            <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <span className="text-accent text-sm font-black uppercase tracking-widest">Musicalidade</span>
                <h2 className="text-5xl font-black italic">Repertório de <span className="text-white">Elite.</span></h2>
                <p className="text-gray-500">Mais de 200 músicas selecionadas para cada tipo de atmosfera.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                {[
                  { cat: 'Rock Clássico', tracks: ['Sweet Child O Mine - GNR', 'Highway to Hell - AC/DC', 'Satisfaction - Rolling Stones', 'Under Pressure - Queen'] },
                  { cat: 'Indie & Modern', tracks: ['Mr. Brightside - Killers', 'Do I Wanna Know - Arctic Monkeys', 'Believer - Imagine Dragons', 'Radioactive - Imagine Dragons'] },
                  { cat: 'Pop Hits', tracks: ['Stay - Justin Bieber', 'Blinding Lights - The Weeknd', 'Flowers - Miley Cyrus', 'As It Was - Harry Styles'] },
                  { cat: 'Rock Nacional', tracks: ['Até Quando Esperar - Plebe Rude', 'Vital e sua Moto - Paralamas', 'Pro Dia Nascer Feliz - Barão', 'Tempo Perdido - Legião'] }
                ].map(block => (
                  <div key={block.cat} className="space-y-6">
                    <h4 className="text-accent text-xs font-black uppercase tracking-[0.2em] border-l-2 border-accent pl-4">{block.cat}</h4>
                    <ul className="space-y-4">
                      {block.tracks.map(track => (
                        <li key={track} className="flex items-center gap-3 text-gray-400 group/track cursor-default">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/track:bg-accent transition-colors"></div>
                          <span className="text-sm font-bold group-hover/track:text-white transition-colors">{track}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="pt-10 flex justify-center">
                <button className="px-10 py-4 border border-accent/20 rounded-2xl text-accent text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-dark transition-all">Baixar Setlist Completa (PDF)</button>
              </div>
            </div>
          </section>

          {/* Section: Contractor Reviews */}
          <section className="space-y-16">
            <div className="space-y-2">
              <span className="text-accent text-sm font-black uppercase tracking-widest">O Termômetro dos Palcos</span>
              <h2 className="text-5xl font-black italic">O que dizem os <br /> <span className="text-white">Contratantes.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { boss: 'Ricardo Mendes', venue: 'Biergarten BH', score: '5.0', msg: 'A performance do Jack foi impecável. Energia lá no alto e um profissionalismo difícil de encontrar. A casa lotou e o feedback foi 100% positivo.' },
                { boss: 'Leticia Alencar', venue: 'Cerimonial Lux', score: '5.0', msg: 'Contratamos para um casamento de alto padrão e a versatilidade dele nos surpreendeu. Pontual, educado e os convidados não queriam sair da pista.' },
                { boss: 'Fábio Silva', venue: 'Corporate Events', score: '5.0', msg: 'Equipamento de som de primeira, staff organizado e o repertório foi perfeito para o nosso público executivo. Recomendo sem ressalvas.' }
              ].map((rev, idx) => (
                <div key={idx} className="p-8 glass border-white/5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-accent"></div>)}
                      </div>
                      <span className="text-2xl font-black text-white/10 uppercase">“</span>
                    </div>
                    <p className="text-lg text-gray-400 leading-relaxed italic">"{rev.msg}"</p>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent font-black">{rev.boss[0]}</div>
                    <div>
                      <h5 className="text-sm font-black text-white">{rev.boss}</h5>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{rev.venue}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA Profile */}
          <section className="py-40 text-center space-y-12 border-t border-white/5">
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter">
              LEVE ESTA ENERGIA <br /> PARA O SEU <span className="text-accent underline decoration-white/20">EVENTO.</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <button className="px-16 py-8 bg-accent text-dark text-2xl font-black rounded-full shadow-[0_30px_60px_rgba(255,191,0,0.3)] hover:scale-105 active:scale-95 transition-all">
                SOLICITAR ORÇAMENTO
              </button>
              <div className="flex items-center gap-4 text-gray-500 font-black uppercase text-xs tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                Disponibilidade para Próximos 3 meses: Alta
              </div>
            </div>
          </section>

        </main>

        <footer className="p-10 border-t border-white/5 text-center text-gray-600 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2026 SOUNDSTAGE BLACK LABEL PORTAL - VERIFICAÇÃO #JW-4927</p>
        </footer>
      </div>
    )
  }

  if (view === 'dashboard-contractor') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-72 bg-white/5 border-r border-white/5 flex flex-col p-8 gap-12 shrink-0 overflow-y-auto max-h-screen">
          <div onClick={() => setView('landing')} className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-cyan-500/20 group-hover:rotate-12 transition-transform">S</div>
            PORTAL
          </div>

          <nav className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 block mb-6 px-4">Menu Business</span>
            {[
              { id: 'search', label: 'Buscar Talentos' },
              { id: 'bookings', label: 'Minhas Reservas' },
              { id: 'payments', label: 'Pagamentos' },
              { id: 'contracts', label: 'Contratos' },
              { id: 'venue', label: 'Meu Espaço' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setContractorSubView(item.id as any)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${contractorSubView === item.id ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <nav className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 block mb-6 px-4">Marketing Kit</span>
            <div className="px-4 py-6 bg-white/5 rounded-[32px] border border-white/5 space-y-4">
              <div className="aspect-square bg-white rounded-2xl flex items-center justify-center p-2">
                {/* Real QR Code placeholder would go here, using a placeholder image for now */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=soundstage-feedback-demo" className="w-full h-full object-contain" alt="QR Code" />
              </div>
              <p className="text-[9px] font-bold text-gray-500 uppercase text-center leading-relaxed">QR Code Exclusivo do Estabelecimento</p>
              <button
                onClick={() => setView('public-rating')}
                className="w-full py-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-500 hover:text-white transition-all"
              >
                Testar Feedback
              </button>
            </div>
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5">
            <button onClick={() => setView('landing')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sair do Portal
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>

          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500/80">Ambiente Business</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black italic">
                {contractorSubView === 'search' && <>Dashboard <span className="text-white">Business.</span></>}
                {contractorSubView === 'bookings' && <>Minhas <span className="text-white">Reservas.</span></>}
                {contractorSubView === 'payments' && <>Meus <span className="text-white">Pagamentos.</span></>}
                {contractorSubView === 'contracts' && <>Meus <span className="text-white">Contratos.</span></>}
                {contractorSubView === 'venue' && <>Meu <span className="text-white">Espaço.</span></>}
              </h1>
              <p className="text-gray-500 font-medium">Belo Horizonte, MG • {new Date().toLocaleDateString('pt-BR')}</p>
            </div>

            <div className="flex gap-4">
              <div className="relative group">
                <input type="text" placeholder="Buscar estilo ou nome..." className="bg-white/5 border border-white/10 px-12 py-5 rounded-[24px] w-full md:w-80 outline-none focus:border-cyan-500 transition-all font-bold text-xs uppercase tracking-widest placeholder:text-gray-700" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-cyan-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>
          </header>

          {contractorSubView === 'search' && (
            <>
              {/* Quick Filters */}
              <section className="mb-12 flex flex-wrap gap-4 relative z-10">
                {['Todos', 'Rock', 'Jazz', 'Pop', 'Sertanejo', 'MPB'].map((cat, i) => (
                  <button key={cat} className={`px-8 py-3 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 ${i === 0 ? 'bg-white text-dark border-white shadow-lg' : 'border-white/10 text-gray-500 hover:border-white/40'}`}>
                    {cat}
                  </button>
                ))}
              </section>

              {/* Artist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10 mb-20">
                {artists.map((artist) => (
                  <div key={artist.name} className="group relative glass p-2 rounded-[48px] border-white/5 hover:border-cyan-500/30 transition-all overflow-hidden bg-white/2 backdrop-blur-3xl shadow-2xl">
                    <div className="aspect-[4/3] rounded-[42px] overflow-hidden relative">
                      <img src={artist.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={artist.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <span className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-full">Artista Verificado</span>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 rounded-full shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 fill-white" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                          <span className="text-xs font-black text-white">5.0</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 space-y-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-3xl font-black italic tracking-tighter">{artist.name}</h3>
                          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">{artist.genre} • BH/MG</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 transition-colors cursor-pointer group/wish">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 group-hover/wish:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-[24px] border border-white/5 text-left group-hover:bg-white/10 transition-colors">
                          <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest block mb-2">Confiabilidade</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-black italic text-green-500">{artist.reliability}%</span>
                            <div className="flex-grow h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: `${artist.reliability}%` }}></div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-[24px] border border-white/5 text-left group-hover:bg-white/10 transition-colors">
                          <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest block mb-2">Setup Técnico</span>
                          <span className="text-[10px] font-bold text-white uppercase tracking-tighter truncate block">{artist.equipment}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-white/5 rounded-[24px] border border-white/5 text-center group-hover:bg-white/10 transition-colors">
                          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest block mb-2">A partir de</span>
                          <span className="text-2xl font-black italic text-cyan-500">{artist.packages[0].price}</span>
                        </div>
                        <div className="p-5 bg-white/5 rounded-[24px] border border-white/5 text-center group-hover:bg-white/10 transition-colors text-white">
                          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest block mb-1">Vibe</span>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {artist.vibes.slice(0, 2).map(v => (
                              <span key={v} className="bg-white/5 px-2 py-0.5 rounded text-[8px] font-black uppercase">{v}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setView('profile-artist')}
                        className="w-full py-5 bg-white text-dark font-black rounded-3xl shadow-xl shadow-cyan-500/5 hover:bg-cyan-500 hover:text-white hover:scale-[1.03] active:scale-95 transition-all text-[11px] uppercase tracking-[0.2em]"
                      >
                        Ver Perfil & Pacotes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {contractorSubView === 'bookings' && (
            <div className="space-y-8 relative z-10">
              <div className="glass p-1 rounded-[40px] border-white/5 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Artista</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Data</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Pacote</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Valor</th>
                      <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { artist: 'Jack Wild', date: '25 Fev, 2026', package: 'Banda Completa', price: 'R$ 4.500', status: 'Confirmado', color: 'green' },
                      { artist: 'Aurora Sky', date: '02 Mar, 2026', package: 'Duo Acústico', price: 'R$ 1.000', status: 'Pendente', color: 'yellow' },
                      { artist: 'The Bloom Trio', date: '15 Mar, 2026', package: 'Big Band', price: 'R$ 6.000', status: 'Confirmado', color: 'green' }
                    ].map((booking, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-8">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/20 overflow-hidden">
                              <img src={artists[i % 3].img} className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="font-black italic tracking-tighter text-lg">{booking.artist}</span>
                          </div>
                        </td>
                        <td className="px-8 py-8 text-xs font-bold text-gray-400">{booking.date}</td>
                        <td className="px-8 py-8 text-xs font-bold uppercase tracking-widest text-white">{booking.package}</td>
                        <td className="px-8 py-8 text-xs font-black text-accent">{booking.price}</td>
                        <td className="px-8 py-8">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border ${booking.color === 'green' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'}`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {contractorSubView === 'payments' && (
            <div className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Investido', value: 'R$ 11.500', icon: '💰' },
                  { label: 'Aguardando Pagamento', value: 'R$ 1.000', icon: '⏳' },
                  { label: 'Próximo Vencimento', value: '25 Fev', icon: '📅' }
                ].map(stat => (
                  <div key={stat.label} className="glass p-8 rounded-[32px] border-white/5 space-y-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-black italic">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="glass p-8 rounded-[40px] border-white/5">
                <h3 className="text-xs font-black uppercase tracking-widest mb-6 px-4">Histórico de Transações</h3>
                <div className="space-y-4">
                  {[
                    { desc: 'Show Jack Wild - Depósito 50%', date: '10 Jan, 2026', value: 'R$ 2.250', status: 'Pago' },
                    { desc: 'Reserva Aurora Sky - Taxa de Serviço', date: '12 Jan, 2026', value: 'R$ 150', status: 'Pago' }
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white/2 rounded-2xl hover:bg-white/5 transition-colors">
                      <div>
                        <p className="font-bold text-sm">{p.desc}</p>
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{p.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-white">{p.value}</p>
                        <span className="text-[9px] font-black uppercase text-green-500">{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {contractorSubView === 'contracts' && (
            <div className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { artist: 'Jack Wild', show: '25 Fev', file: 'CONTRATO_JW_2026_001.pdf' },
                  { artist: 'The Bloom Trio', show: '15 Mar', file: 'CONTRATO_BT_2026_015.pdf' }
                ].map((c, i) => (
                  <div key={i} className="glass p-8 rounded-[40px] border-white/5 flex items-center justify-between group hover:border-accent/40 transition-all">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center text-xl text-accent">📄</div>
                      <div>
                        <h4 className="font-black italic text-lg">{c.artist}</h4>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Show em {c.show}</p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest group-hover:bg-accent group-hover:text-dark transition-all">
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {contractorSubView === 'venue' && (
            <div className="space-y-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: 'Fachada do Local', type: 'façade', img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop' },
                  { label: 'Espaço Interno / Salão', type: 'interior', img: 'https://images.unsplash.com/photo-1551632432-c735e8273db8?q=80&w=2070&auto=format&fit=crop' },
                  { label: 'Área do Palco / Som', type: 'stage', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop' }
                ].map(slot => (
                  <div key={slot.type} className="group relative aspect-video rounded-[32px] overflow-hidden glass border-white/5 cursor-pointer">
                    <img src={slot.img} className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" alt={slot.label} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{slot.label}</span>
                      <p className="text-[9px] font-bold text-gray-500 mt-2 uppercase">Clique para alterar</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass p-10 md:p-12 rounded-[48px] border-white/5">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic uppercase tracking-tight">Ficha Técnica & Equipamentos</h3>
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">O que o artista encontrará ao chegar</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Mixer / Console</label>
                      <input type="text" placeholder="Ex: Yamaha MG12X / Digital 16 canais" className="w-full bg-white/5 border border-white/5 p-5 rounded-[24px] outline-none focus:border-cyan-500/40 transition-all font-medium text-sm" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sistema de P.A.</label>
                      <input type="text" placeholder="Ex: 2x JBL Ativas + Sub 12'" className="w-full bg-white/5 border border-white/5 p-5 rounded-[24px] outline-none focus:border-cyan-500/40 transition-all font-medium text-sm" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Monitoração</label>
                      <input type="text" placeholder="Ex: 2 Retornos de chão / In-ear disponível" className="w-full bg-white/5 border border-white/10 p-5 rounded-[24px] outline-none focus:border-cyan-500/40 transition-all font-medium text-sm" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Outros Detalhes</label>
                      <textarea placeholder="Ex: Iluminação básica inclusa, tomadas 220v no palco..." className="w-full bg-white/5 border border-white/10 p-5 rounded-[24px] h-32 outline-none focus:border-cyan-500/40 transition-all font-medium text-sm resize-none"></textarea>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-10 border-t border-white/5 flex justify-end">
                  <button className="px-12 py-5 bg-white text-dark font-black rounded-2xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all">Salvar Configurações</button>
                </div>
              </div>
            </div>
          )}

          <footer className="pt-20 border-t border-white/5 text-center">
            <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.5em]">Central de Negócios Soundstage • Versão 1.0.2</p>
          </footer>
        </main>
      </div>
    )
  }

  if (view === 'public-rating') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center p-6 pb-20 overflow-hidden relative">
        {/* Abstract Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] bg-accent/20 blur-[120px] rounded-full rotate-12"></div>
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-dark via-dark/40 to-transparent"></div>

        <nav className="relative z-10 w-full flex justify-center py-8">
          <div className="text-2xl font-black tracking-tighter">SOUNDSTAGE</div>
        </nav>

        <main className="relative z-10 w-full max-w-sm space-y-12 mt-10">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-accent to-white overflow-hidden shadow-2xl">
              <img src={artists[0].img} className="w-full h-full object-cover rounded-full" alt="Artist" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Tocando Agora</span>
              <h1 className="text-4xl font-black italic tracking-tighter">{artists[0].name}</h1>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{artists[0].genre} • @ {artists[0].track}</p>
            </div>
          </div>

          <div className="glass p-8 rounded-[40px] border-white/5 space-y-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>

            <div className="text-center space-y-6 relative z-10">
              <h2 className="text-xl font-black italic">O que achou do show?</h2>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-dark hover:scale-110 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 1L9 9H1L8 14L5 22L12 17L19 22L16 14L23 9H15L12 1Z" /></svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <textarea
                placeholder="Deixe um elogio ou peça sua música favorita..."
                className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl h-32 outline-none focus:border-accent/40 transition-all font-medium text-sm placeholder:text-gray-700"
              ></textarea>
              <button
                onClick={() => setView('dashboard-contractor')}
                className="w-full py-5 bg-white text-dark font-black rounded-[24px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
              >
                Enviar Avaliação
              </button>
            </div>
          </div>

          <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-gray-700">
            Powered by SOUNDSTAGE Experience
          </p>
        </main>

        <button
          onClick={() => setView('dashboard-contractor')}
          className="fixed bottom-8 px-8 py-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
        >
          ← Voltar ao Dashboard
        </button>
      </div>
    )
  }

  if (view === 'dashboard-artist') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-72 bg-white/5 border-r border-white/5 flex flex-col p-8 gap-12 shrink-0 overflow-y-auto max-h-screen">
          <div onClick={() => setView('landing')} className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-accent to-accent-dark rounded-xl flex items-center justify-center text-dark text-lg shadow-lg group-hover:rotate-12 transition-transform">S</div>
            ARTIST
          </div>

          <nav className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 block mb-6 px-4">Management</span>
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'schedule', label: 'Minha Agenda' },
              { id: 'finance', label: 'Financeiro' },
              { id: 'packages', label: 'Meus Pacotes' },
              { id: 'shop', label: 'Lojas Oficiais' },
              { id: 'marketplace', label: 'Desapego' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setArtistSubView(item.id as any)}
                className={`w-full text-left px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${artistSubView === item.id ? 'bg-accent text-dark shadow-lg shadow-accent/20' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <nav className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 block mb-6 px-4">Marketing Kit</span>
            <div className="px-4 py-6 bg-accent/5 rounded-[32px] border border-accent/10 space-y-4">
              <div className="aspect-square bg-white rounded-2xl flex items-center justify-center p-2">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=soundstage-mini-profile-demo" className="w-full h-full object-contain" alt="QR Code" />
              </div>
              <p className="text-[9px] font-bold text-gray-500 uppercase text-center leading-relaxed">Seu Cartão de Visitas Digital</p>
              <button
                onClick={() => setView('mini-profile')}
                className="w-full py-3 bg-accent text-dark text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-accent/20"
              >
                Ver Link na Bio
              </button>
            </div>
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5">
            <button onClick={() => setView('landing')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sair do Painel
            </button>
          </div>
        </aside>

        <main className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen relative">
          <header className="mb-16">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Painel de Controle Artístico</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic">
              Olá, <span className="text-accent underline decoration-white/10 underline-offset-8 decoration-8 uppercase not-italic">Jack Wild</span>
            </h1>
          </header>

          {artistSubView === 'overview' && (
            <div className="space-y-12 relative z-10">
              {/* Quick stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Ganhos no Mês', value: 'R$ 14.200', change: '+12%', color: 'accent' },
                  { label: 'Shows Realizados', value: '08', change: 'Evolução', color: 'white' },
                  { label: 'Novas Avaliações', value: '24', change: '5.0 ⭐', color: 'white' },
                  { label: 'Pessoas Alcançadas', value: '2.4k', change: '+450', color: 'white' }
                ].map(stat => (
                  <div key={stat.label} className="glass p-8 rounded-[32px] border-white/5 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">{stat.label}</p>
                    <p className={`text-3xl font-black italic ${stat.color === 'accent' ? 'text-accent' : 'text-white'}`}>{stat.value}</p>
                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{stat.change}</span>
                  </div>
                ))}
              </div>

              {/* Next Shows */}
              <div className="glass p-10 rounded-[48px] border-white/5">
                <h3 className="text-xs font-black uppercase tracking-widest mb-8 border-b border-white/5 pb-6">Próximos Shows Confirmados</h3>
                <div className="space-y-6">
                  {[
                    { venue: 'Pub Intergalactic', date: '25 Fev', time: '21:00', fee: 'R$ 4.500', type: 'Banda Completa' },
                    { venue: 'Sunset Rooftop', date: '28 Fev', time: '18:30', fee: 'R$ 1.200', type: 'Voz + Violão' },
                  ].map((show, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-white/2 rounded-[32px] hover:bg-white/5 transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-accent/20 rounded-3xl flex flex-col items-center justify-center">
                          <span className="text-xs font-black uppercase text-accent leading-none">{show.date.split(' ')[1]}</span>
                          <span className="text-2xl font-black italic text-accent">{show.date.split(' ')[0]}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-black italic tracking-tighter">{show.venue}</h4>
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{show.type} • {show.time}</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-right">
                        <p className="text-2xl font-black italic text-white">{show.fee}</p>
                        <button className="text-[9px] font-black uppercase tracking-widest text-accent underline underline-offset-4">Ver Detalhes do Rider</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {artistSubView === 'schedule' && (
            <div className="space-y-8 relative z-10">
              <div className="glass p-10 rounded-[48px] border-white/5">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-6">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter">
                      {monthNames[calendarDate.getMonth()]} <span className="text-accent">{calendarDate.getFullYear()}</span>
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                      >
                        →
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 text-[10px] font-black uppercase tracking-widest hidden md:flex">
                    <span className="animate-pulse flex items-center gap-2"><div className="w-1.5 h-1.5 bg-accent rounded-full"></div> Clique em um dia para gerenciar sua agenda</span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map(d => (
                    <div key={d} className="text-center text-[9px] font-black uppercase text-gray-700 py-4">{d}</div>
                  ))}

                  {/* Padding for first day of month */}
                  {Array.from({ length: new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay() }).map((_, i) => (
                    <div key={`pad-${i}`} className="aspect-square"></div>
                  ))}

                  {Array.from({ length: new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate() }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${calendarDate.getFullYear()}-${(calendarDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                    const blockType = blockedDates[dateStr];

                    return (
                      <div
                        key={day}
                        onClick={() => {
                          setSelectedAgendaDate(dateStr);
                          setAgendaModalStep('options');
                          setExternalCacheValue('');
                          setIsAgendaModalOpen(true);
                        }}
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-xs font-bold border transition-all cursor-pointer relative group
                          ${blockType === 'show' ? 'bg-accent border-accent text-dark shadow-lg shadow-accent/20' :
                            blockType === 'external' ? 'bg-gray-800 border-white/10 text-gray-400' :
                              blockType === 'vacation' ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' :
                                'bg-white/2 border-white/5 text-gray-500 hover:border-white/20 hover:bg-white/5'}`}
                      >
                        {day}
                        {blockType && (
                          <div className="flex flex-col items-center">
                            <span className="text-[9px] font-black uppercase opacity-100 transition-opacity">
                              {blockType === 'show' || blockType === 'external' ? (bookingDetails[dateStr]?.contractor || (blockType === 'show' ? 'Show' : 'Externo')) : 'Férias'}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-6 justify-center">
                  {[
                    { label: 'Indisponível (Férias)', color: 'bg-orange-500/20 border-orange-500/40 text-orange-400' },
                    { label: 'Vendido Externamente', color: 'bg-gray-800 border-white/10 text-gray-400' },
                    { label: 'Show SOUNDSTAGE', color: 'bg-accent/20 border-accent/40 text-accent' },
                    { label: 'Data Livre', color: 'bg-white/2 border-white/5 text-gray-600' }
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded ${item.color.split(' ')[0]} border ${item.color.split(' ')[1]}`}></div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-550">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Agenda Management Modal */}
          {isAgendaModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-dark/80 backdrop-blur-md" onClick={() => setIsAgendaModalOpen(false)}></div>
              <div className="relative w-full max-w-md glass p-10 border-white/10 shadow-2xl animate-in zoom-in duration-300">
                <button onClick={() => setIsAgendaModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white">✕</button>

                <header className="mb-10 text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">📅</div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Gerenciar Data</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mt-2">
                    {selectedAgendaDate?.split('-').reverse().join('/')}
                  </p>
                </header>

                {agendaModalStep === 'options' ? (
                  <div className="space-y-4">
                    {blockedDates[selectedAgendaDate!] ? (
                      <div className="space-y-4">
                        {blockedDates[selectedAgendaDate!] === 'show' && bookingDetails[selectedAgendaDate!] ? (
                          <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl space-y-2 text-left">
                            <p className="text-[9px] font-black uppercase text-accent tracking-widest">Reserva Soundstage Confirmada</p>
                            <p className="text-sm font-black italic text-white">Contratante: {bookingDetails[selectedAgendaDate!].contractor}</p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Horário: {bookingDetails[selectedAgendaDate!].time}</p>
                            <p className="text-[8px] text-gray-600 mt-4 leading-relaxed">* Reservas oficiais da plataforma não podem ser removidas pelo painel do artista.</p>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              const newBlocked = { ...blockedDates };
                              const newFinance = { ...financialRecords };
                              delete newBlocked[selectedAgendaDate!];
                              delete newFinance[selectedAgendaDate!];
                              setBlockedDates(newBlocked);
                              setFinancialRecords(newFinance);
                              setIsAgendaModalOpen(false);
                            }}
                            className="w-full py-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/20 transition-all"
                          >
                            Liberar Data e Excluir Lançamentos
                          </button>
                        )}
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => setAgendaModalStep('cache_input')}
                          className="w-full py-6 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all"
                        >
                          Venda Externa (Lançar Cache)
                        </button>
                        <button
                          onClick={() => {
                            setBlockedDates({ ...blockedDates, [selectedAgendaDate!]: 'vacation' });
                            setIsAgendaModalOpen(false);
                          }}
                          className="w-full py-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400 font-black uppercase text-[11px] tracking-widest hover:bg-orange-500/20 transition-all"
                        >
                          Marcar Férias / Folga
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-2">Quem é o contratante?</label>
                        <input
                          autoFocus
                          type="text"
                          value={externalContractorName}
                          onChange={(e) => setExternalContractorName(e.target.value)}
                          placeholder="Ex: Restaurante do Porto"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl font-black italic focus:border-accent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-2">Qual o valor do cachê (R$)?</label>
                        <input
                          type="number"
                          value={externalCacheValue}
                          onChange={(e) => setExternalCacheValue(e.target.value)}
                          placeholder="Ex: 2500"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-2xl font-black italic focus:border-accent outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setAgendaModalStep('options')}
                        className="flex-1 py-5 bg-white/5 border border-white/10 rounded-2xl text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={() => {
                          if (externalCacheValue && externalContractorName) {
                            setBlockedDates({ ...blockedDates, [selectedAgendaDate!]: 'external' });
                            setFinancialRecords({ ...financialRecords, [selectedAgendaDate!]: parseInt(externalCacheValue) });
                            setBookingDetails({ ...bookingDetails, [selectedAgendaDate!]: { contractor: externalContractorName, time: '20:00' } });
                            setIsAgendaModalOpen(false);
                            setExternalContractorName('');
                            setExternalCacheValue('');
                          }
                        }}
                        className="flex-[2] py-5 bg-accent text-dark rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent/20"
                      >
                        Confirmar Lançamento
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {artistSubView === 'finance' && (
            <div className="space-y-12 relative z-10">
              {/* Financial Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="glass p-10 rounded-[40px] border-white/5 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Faturamento No Período</span>
                  <p className="text-4xl font-black italic text-accent">
                    R$ {Object.values(financialRecords).reduce((a, b) => a + b, 0).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="glass p-10 rounded-[40px] border-white/5 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Disponível p/ Saque</span>
                  <p className="text-4xl font-black italic text-white">R$ 5.400</p>
                </div>
                <div className="glass p-10 rounded-[40px] border-white/5 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status Fiscal</span>
                  <p className="text-xl font-black italic text-green-500 uppercase tracking-tighter">Conta Verificada</p>
                </div>
              </div>

              {/* Launches List */}
              <div className="glass p-10 rounded-[48px] border-white/5">
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <h3 className="text-xs font-black uppercase tracking-widest">Extrato de Lançamentos</h3>
                  <button className="text-[9px] font-black uppercase tracking-widest text-accent hover:underline">Exportar PDF</button>
                </div>
                <div className="space-y-4">
                  {Object.keys(financialRecords).length > 0 ? (
                    Object.entries(financialRecords).sort().reverse().map(([date, value]) => (
                      <div key={date} className="flex items-center justify-between p-6 bg-white/2 rounded-2xl hover:bg-white/5 transition-all text-left">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-black text-accent">{date.split('-')[2]}</span>
                            <span className="text-[8px] font-black uppercase text-gray-600 tracking-tighter">{monthNames[parseInt(date.split('-')[1]) - 1].substring(0, 3)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-black italic text-white">
                              {blockedDates[date] === 'show' ? 'Show SOUNDSTAGE' : 'Evento Externo'}
                            </p>
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                              {bookingDetails[date]?.contractor || 'Contratante não informado'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black italic text-white">R$ {value.toLocaleString('pt-BR')}</p>
                          <span className="text-[8px] font-black uppercase text-green-500 tracking-widest">Creditado</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 py-10 font-medium">Nenhum lançamento financeiro registrado.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {artistSubView === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {artists[0].packages.map(pkg => (
                <div key={pkg.id} className="glass p-10 rounded-[40px] border-white/5 space-y-6 hover:border-accent/30 transition-all flex flex-col group">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent">Formato {pkg.id.toUpperCase()}</span>
                  <div className="flex-grow">
                    <h4 className="text-3xl font-black italic tracking-tighter leading-none mb-2">{pkg.title}</h4>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{pkg.size}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-2xl font-black italic text-white mb-4">{pkg.price}</p>
                    <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Editar Pacote</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {artistSubView === 'shop' && (
            <div className="space-y-12 relative z-10">
              <div className="glass p-12 rounded-[48px] border-white/5 text-center space-y-8">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-4xl">🛍️</div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter">Lojas Oficiais Soundstage</h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">Parceiros e fornecedores oficiais com condições exclusivas para artistas da plataforma.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Instrumentos', 'Estúdios', 'Luthieria'].map(cat => (
                    <div key={cat} className="p-8 bg-white/5 rounded-3xl border border-white/5 opacity-50">
                      <span className="text-xs font-black uppercase tracking-widest text-gray-550">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {artistSubView === 'marketplace' && (
            <div className="space-y-12 relative z-10">
              <header className="flex flex-col md:flex-row justify-between items-center bg-white/5 p-8 rounded-[32px] border border-white/5 gap-6">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase">Desapego Musical</h2>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Negocie equipamentos entre artistas da rede</p>
                </div>
                <button className="w-full md:w-auto px-8 py-5 bg-accent text-dark font-black rounded-2xl text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-accent/20">
                  Anunciar Equipamento
                </button>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {marketplaceItems.map(item => (
                  <div key={item.id} className="glass p-6 rounded-[40px] border-white/5 group hover:border-accent/30 transition-all flex flex-col bg-white/2">
                    <div className="aspect-square rounded-[32px] overflow-hidden mb-6 relative">
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                      <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-accent border border-accent/20">
                        {item.price}
                      </div>
                    </div>
                    <div className="px-2 space-y-6">
                      <div>
                        <h4 className="text-xl font-black italic tracking-tighter mb-1 uppercase leading-none">{item.name}</h4>
                        <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Anunciado por: {item.seller}</p>
                      </div>
                      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-accent hover:text-dark transition-all">
                        Tenho Interesse
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    )
  }

  if (view === 'checkout-booking') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle motion background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,191,0,0.05),transparent_50%)] animate-pulse"></div>

        <div className="max-w-2xl w-full glass p-10 md:p-16 border-white/5 relative z-10 space-y-12">
          {/* Progress Steps */}
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-accent -translate-y-1/2 transition-all"></div>
            {[1, 2, 3].map(s => (
              <div key={s} className={`relative w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border-2 transition-all ${s === 1 ? 'bg-accent border-accent text-dark' : 'bg-dark border-white/10 text-gray-500'}`}>
                {s}
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <header className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Reserva de Performance</span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter">Finalizar Contratação</h2>
              <p className="text-gray-500 font-medium">Você está reservando <span className="text-white">Jack Wild</span> para o seu próximo evento.</p>
            </header>

            {/* Step 1 Content: Review */}
            <div className="space-y-6">
              <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0">
                  <img src={artists[0].img} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-black italic">{artists[0].packages[0].title}</h3>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Formato: {artists[0].packages[0].size}</p>
                  <p className="text-accent text-2xl font-black mt-4">{artists[0].packages[0].price}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-550 ml-4">Data do Evento</label>
                  <input
                    type="date"
                    value={checkoutDate}
                    onChange={(e) => setCheckoutDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-accent outline-none font-bold text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-550 ml-4">Horário de Início</label>
                  <input
                    type="time"
                    value={checkoutTime}
                    onChange={(e) => setCheckoutTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-accent outline-none font-bold text-sm"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                <div className="flex justify-between items-center px-4">
                  <span className="text-xs font-bold text-gray-500 uppercase">Taxa de Serviço SOUNDSTAGE (10%)</span>
                  <span className="text-xs font-black text-white">R$ 450,00</span>
                </div>
                <div className="flex justify-between items-center px-4 pt-4 border-t border-white/5">
                  <span className="text-sm font-black text-white uppercase italic">Total do Investimento</span>
                  <span className="text-2xl font-black text-accent">R$ 4.950,00</span>
                </div>
              </div>

              <div className="pt-8 flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setView('profile-artist')}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-gray-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:text-white transition-all order-2 md:order-1"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    const priceNum = parseInt(artists[0].packages[0].price.replace(/[^0-9]/g, ''));
                    setBlockedDates({ ...blockedDates, [checkoutDate]: 'show' });
                    setFinancialRecords({ ...financialRecords, [checkoutDate]: priceNum });
                    setBookingDetails({ ...bookingDetails, [checkoutDate]: { contractor: 'Soundstage Client', time: checkoutTime } });
                    alert('Parabéns! Evento confirmado e registrado automaticamente na agenda do artista.');
                    setView('dashboard-contractor');
                  }}
                  className="flex-grow py-5 bg-white text-dark font-black rounded-2xl text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl order-1 md:order-2"
                >
                  Assinar Contrato & Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'mini-profile') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center px-6 py-12 relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-accent/20 to-transparent"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full"></div>

        <div className="w-full max-w-sm relative z-10 space-y-10 text-center">
          {/* Header/Avatar */}
          <div className="space-y-6">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
              <div className="relative w-full h-full rounded-full border-4 border-accent p-1 bg-dark">
                <img src={artists[0].img} className="w-full h-full object-cover rounded-full" alt="" />
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-dark rounded-full"></div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">{artists[0].name}</h1>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">{artists[0].genre} • DISPONÍVEL HOJE</p>
            </div>
          </div>

          {/* Core Action */}
          <button
            onClick={() => setView('checkout-booking')}
            className="w-full py-6 bg-accent text-dark font-black rounded-3xl text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,191,0,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            RESERVAR DATA AGORA
          </button>

          {/* Social Links */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { label: 'Ouvir no Spotify', icon: '🎧', color: 'bg-[#1DB954]' },
              { label: 'Instagram Oficial', icon: '📸', color: 'bg-white/5 border border-white/10' },
              { label: 'Assista no YouTube', icon: '📺', color: 'bg-white/5 border border-white/10' },
              { label: 'Rider Técnico / PDF', icon: '📄', color: 'bg-white/5 border border-white/10' }
            ].map(link => (
              <button key={link.label} className={`w-full py-5 rounded-2xl flex items-center justify-between px-8 group hover:scale-[1.02] transition-all ${link.color}`}>
                <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
                <span className="text-xl group-hover:rotate-12 transition-transform">{link.icon}</span>
              </button>
            ))}
          </div>

          {/* Mini Player Section */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] space-y-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">▶</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-0.5">Preview Track</p>
                <p className="text-xs font-bold text-white truncate">Sunset Boulevard - Original Mix</p>
              </div>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-accent w-1/3"></div>
            </div>
          </div>

          <footer className="pt-8 opacity-40">
            <div onClick={() => setView('landing')} className="text-[10px] font-black tracking-tighter cursor-pointer inline-flex items-center gap-2">
              <div className="w-5 h-5 bg-accent rounded flex items-center justify-center text-dark text-[8px]">S</div>
              SOUNDSTAGE EXPERIENCE
            </div>
          </footer>
        </div>

        {/* Floating Back Switch (Admin Only Simulation) */}
        <button
          onClick={() => setView('dashboard-artist')}
          className="fixed bottom-6 scale-90 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
        >
          ← Voltar ao Painel
        </button>
      </div>
    )
  }

  return null
}

export default App
