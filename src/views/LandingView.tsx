import type { Artist, ViewState } from '../types';

interface LandingViewProps {
    setView: (view: ViewState) => void;
    artists: Artist[];
    currentArtistIndex: number;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleTouchEnd: (e: React.TouchEvent) => void;
    prevArtist: () => void;
    nextArtist: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
    setView,
    artists,
    currentArtistIndex,
    handleTouchStart,
    handleTouchEnd,
    prevArtist,
    nextArtist
}) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-6 py-6 md:px-20 border-b border-white/5 bg-dark/50 backdrop-blur-md sticky top-0 z-50">
                <div onClick={() => setView('landing')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                    <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">ALL MUSIC</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <div onClick={() => setView('features')} className="hover:text-primary transition-colors cursor-pointer">Funcionalidades</div>
                    <div onClick={() => setView('how-it-works')} className="hover:text-primary transition-colors cursor-pointer">Como Funciona</div>
                    <div onClick={() => setView('pricing')} className="hover:text-primary transition-colors cursor-pointer">Preços</div>
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
                            className="px-8 py-3 bg-primary hover:bg-primary-dark transition-all duration-300 rounded-full font-bold shadow-lg shadow-primary/30 hover:scale-105 group flex items-center justify-center gap-3"
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
                                <span>Rádio ALL MUSIC Live</span>
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
                        <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Curadoria ALL MUSIC</span>
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
                        <div className="mt-20">
                            <button
                                onClick={() => setView('how-it-works')}
                                className="px-10 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
                            >
                                Ver detalhes do processo →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="p-20 border-t border-white/10 flex flex-col items-center gap-10 bg-dark/50">
                <img src="/brand-logo-white.png" className="h-16 opacity-80 hover:opacity-100 transition-opacity" alt="ALL MUSIC" />
                <div className="flex flex-col items-center gap-4 text-gray-500">
                    <p className="text-sm">© 2026 ALL MUSIC - Transformando a cena musical brasileira.</p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                        <a href="#" className="hover:text-accent transition-colors">Termos</a>
                        <a href="#" className="hover:text-accent transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-accent transition-colors">Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
