import { useState } from 'react'

function App() {
  const [view, setView] = useState<'landing' | 'login' | 'register-artist' | 'register-bar' | 'landing-artist' | 'landing-bar'>('landing')

  const [currentArtistIndex, setCurrentArtistIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const artists = [
    { name: 'Cassidy Rae', track: 'Sunset Boulevard', genre: 'Country', img: '/country-bg.png' },
    { name: 'Jack Wild', track: 'Neon Thunder', genre: 'Rock', img: '/rock-thumb.png' },
    { name: 'Lia do Samba', track: 'Vibe Tropical', genre: 'Samba', img: '/samba-thumb.png' },
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
          <div className="text-2xl font-display font-extrabold tracking-tighter flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm">S</span>
            SOUNDSTAGE
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
          className="flex-grow flex flex-col md:flex-row items-center justify-between text-left px-6 md:px-20 py-20 relative overflow-hidden bg-cover bg-center gap-12 transition-all duration-700"
          style={{ backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.9)), url("${artists[currentArtistIndex].img}")` }}
        >
          {/* Animated backgrounds */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>

          {/* Left Column: Content */}
          <div className="flex-1 z-10 max-w-3xl">
            <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
              Onde o <span className="text-primary italic">Talento</span> encontra o <span className="text-accent underline decoration-primary">Palco</span> certo.
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-xl">
              A plataforma definitiva para conectar artistas e bares com transparência, segurança e gestão de ponta a ponta.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                onClick={() => setView('landing-artist')}
                className="btn-primary group flex items-center justify-center gap-3"
              >
                Sou Artista
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={() => setView('landing-bar')}
                className="btn-accent group flex items-center justify-center gap-3"
              >
                Tenho um Bar
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
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

                <div className="text-center text-xs text-primary font-bold tracking-widest uppercase opacity-70 flex flex-col gap-1">
                  <span>Rádio Soundstage Live</span>
                  <span className="text-[10px] text-gray-500">Deslize para trocar de estilo</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Social Proof Bar */}
        <section className="bg-primary/10 border-y border-white/5 py-8 overflow-hidden">
          <div className="flex items-center gap-12 animate-marquee whitespace-nowrap px-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-bold text-primary opacity-80 uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Show em Tempo Real: Jack Wild no 'Bar do Alemão' •
                <span className="text-white/40">Check-in há 5 min</span>
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
              <p className="text-gray-400 mt-4 text-lg">Os artistas mais requisitados pelos melhores bares da região.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Ver todos os artistas
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Lia do Samba', type: 'Samba / MPB', img: '/samba-thumb.png', rating: '4.9' },
              { name: 'Jack Wild', type: 'Rock / Pop', img: '/rock-thumb.png', rating: '5.0' },
              { name: 'Anya Sharma', type: 'Jazz / Soul', img: '/artist-jazz.png', rating: '4.8' },
              { name: 'Leo Folk', type: 'Folk / Indie', img: '/artist-folk.png', rating: '4.7' }
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

        {/* Exclusive Page Showcase */}
        <section className="py-24 px-6 md:px-20 bg-dark-lighter relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl"></div>
                <img
                  src="/exclusive-mockup.png"
                  alt="Exclusive Page Mobile"
                  className="relative rounded-[2.5rem] shadow-2xl border-4 border-white/5"
                />
              </div>
            </div>

            <div className="flex-1 order-1 md:order-2">
              <span className="text-accent font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Venda-se como uma Estrela</span>
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight">Sua página <span className="text-primary italic">Exclusiva</span> de divulgação.</h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 0l-1.102-1.101" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Um link na Bio, tudo resolvido</h4>
                    <p className="text-gray-400 text-lg">Pare de mandar PDFs pesados. Envie um link premium que abre rápido em qualquer celular.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Agenda em Tempo Real</h4>
                    <p className="text-gray-400 text-lg">O dono do bar já vê suas datas livres e solicita sua reserva ali mesmo.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Portfólio em Vídeo</h4>
                    <p className="text-gray-400 text-lg">Vídeos integrados do YouTube e Instagram para provar seu talento sem sair do seu perfil.</p>
                  </div>
                </div>

                <div className="pt-8">
                  <button onClick={() => setView('landing-artist')} className="btn-primary">Quero minha página agora</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works / Steps */}
        <section className="py-24 px-6 md:px-20 bg-dark">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl mb-20 text-center">Simples. <span className="text-primary italic">Veloz.</span> Seguro.</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { step: '01', title: 'Cadastre-se grátis', desc: 'Crie seu perfil profissional ou configure sua casa de shows em minutos.' },
                { step: '02', title: 'Conecte e Combine', desc: 'Busque talentos ou seja descoberto por bares de elite da sua região.' },
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
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col">
        {/* Nav Simplificada */}
        <nav className="p-6 flex justify-between items-center border-b border-white/5">
          <div onClick={() => setView('landing')} className="text-2xl font-display font-bold cursor-pointer">SOUNDSTAGE</div>
          <button onClick={() => setView('landing')} className="text-sm text-gray-400 hover:text-white transition-colors">← Voltar</button>
        </nav>

        <main className="flex-grow">
          {/* Hero Artista */}
          <section className="py-24 px-6 md:px-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10"></div>

            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-6 block">Para Cantores e Bandas</span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">Chega de depender de <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">sorte ou contatos.</span></h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">Profissionalize sua carreira, receba cachês em dia e tenha uma agenda lotada com a plataforma líder em booking musical.</p>

            <button onClick={() => setView('register-artist')} className="btn-primary text-xl px-12 py-5">Começar minha carreira de elite</button>
          </section>

          {/* Argumentos de Valor - Dashboard Preview */}
          <section className="py-24 px-6 md:px-20 bg-dark-lighter">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="text-left">
                <h2 className="text-4xl mb-8">Sua gestão no <span className="text-primary">piloto automático.</span></h2>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Cachê Blindado (Escrow)</h4>
                      <p className="text-gray-400">O contratante paga no ato da reserva. O dinheiro fica seguro e cai na sua conta 24h após o show.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Agenda Híbrida Inteligente</h4>
                      <p className="text-gray-400">Lance seus shows externos e bloqueie datas. Nunca mais aceite dois shows pro mesmo dia por engano.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Contratos Jurídicos Automáticos</h4>
                      <p className="text-gray-400">Geramos um contrato digital assinado para cada show. Segurança jurídica real para você e pro bar.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <img src="/artist-dashboard.png" className="relative rounded-2xl shadow-2xl border border-white/10" alt="Dashboard Artista" />
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-24 px-6 md:px-20 text-center bg-gradient-to-b from-dark to-primary/20">
            <h2 className="text-4xl md:text-6xl font-black mb-8">Pronto para o próximo nível?</h2>
            <button onClick={() => setView('register-artist')} className="btn-primary text-xl px-12 py-5 shadow-2xl shadow-primary/50">Criar meu perfil gratuito</button>
            <p className="mt-6 text-gray-500 text-sm italic">Não pedimos cartão de crédito para começar.</p>
          </section>
        </main>
      </div>
    )
  }

  if (view === 'landing-bar') {
    return (
      <div className="min-h-screen bg-dark text-white font-sans flex flex-col">
        {/* Nav Simplificada */}
        <nav className="p-6 flex justify-between items-center border-b border-white/5 bg-dark/50 backdrop-blur-md sticky top-0 z-50">
          <div onClick={() => setView('landing')} className="text-2xl font-display font-bold cursor-pointer">SOUNDSTAGE</div>
          <button onClick={() => setView('landing')} className="text-sm text-gray-400 hover:text-white transition-colors">← Voltar</button>
        </nav>

        <main className="flex-grow">
          {/* Hero Bar */}
          <section className="py-24 px-6 md:px-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/10 blur-[120px] rounded-full -z-10"></div>

            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-6 block">Para Bares e Restaurantes</span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">Sua casa sempre cheia, <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">sem riscos.</span></h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">Acesse os melhores artistas da região, gerencie agenda em segundos e garanta que o show nunca pare.</p>

            <button onClick={() => setView('register-bar')} className="btn-accent text-xl px-12 py-5 text-dark">Turbinar meu bar agora</button>
          </section>

          {/* Argumentos de Valor - Search Preview */}
          <section className="py-24 px-6 md:px-20 bg-dark-lighter">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="order-2 md:order-1 relative group text-left">
                <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <img src="/bar-dashboard.png" className="relative rounded-2xl shadow-2xl border border-white/10" alt="Busca de Artistas" />
              </div>

              <div className="order-1 md:order-2 text-left">
                <h2 className="text-4xl mb-8">O fim da <span className="text-accent">contratação no escuro.</span></h2>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Curadoria por Avaliação Real</h4>
                      <p className="text-gray-400">Contrate artistas validados por outros bares. Veja vídeos e repertório atualizado.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-red-400">Botão de Pânico</h4>
                      <p className="text-gray-400">O artista cancelou? Nosso sistema encontra músicos disponíveis próximos em minutos.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Central de Mídia</h4>
                      <p className="text-gray-400">Baixe o kit de divulgação pronto pro seu Instagram. Sem perder tempo editando post.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass p-12 max-w-md w-full text-center">
        <h2 className="text-3xl mb-4">Área em Construção</h2>
        <p className="text-gray-400 mb-8">Estamos preparando a tela de {view === 'login' ? 'Login' : 'Cadastro'} para você.</p>
        <button
          onClick={() => setView('landing')}
          className="btn-secondary"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  )
}

export default App
