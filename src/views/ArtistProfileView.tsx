import { useState } from 'react';
import type { Artist, ViewState } from '../types';

interface ArtistProfileViewProps {
    artists: Artist[];
    setView: (view: ViewState) => void;
}

export const ArtistProfileView: React.FC<ArtistProfileViewProps> = ({ artists, setView }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-dark text-white font-sans selection:bg-accent selection:text-dark">
            {/* Dynamic Header with Scroll Effect Mockup */}
            <header className="relative h-[80vh] flex items-end pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253361-bee1a27e7430?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-transparent"></div>

                <nav className="absolute top-0 w-full p-8 md:px-20 flex justify-between items-center z-20">
                    <div onClick={() => setView('landing')} className="flex items-center gap-3 cursor-pointer group">
                        <img src="/brand-icon.png" className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                        <span className="text-2xl font-black tracking-tighter">ALL MUSIC</span>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setView('landing')} className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all font-bold text-sm">Explorar Mais</button>
                        <button onClick={() => setView('login')} className="px-6 py-2 rounded-full bg-accent text-dark hover:bg-white transition-all font-black text-sm uppercase tracking-widest">Contratar</button>
                    </div>
                </nav>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="space-y-8">
                            <div className="space-y-4">
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
                                    <span className="text-lg font-bold text-white">{artists[0].genre}</span>
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
                            {artists[0].bio || 'Nenhuma biografia disponível no momento. Jack Wild é um dos artistas mais requisitados da plataforma, conhecidos pela performance impecável e carisma único.'}
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.475 1.382.897.422.422.681.822.897 1.382.163.422.358 1.057.412 2.227.059 1.266.071 1.645.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.475.96-.897 1.382-.422.422-.822.681-1.382.897-.422.163-1.057.358-2.227.412-1.266.059-1.645.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.475-1.382-.897-.422-.422-.822-.681-.897-1.382-.163-.422-.358-1.057-.412-2.227-.059-1.266-.071-1.645-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.475-.96.897-1.382.422-.422.822-.681 1.382-.897.422-.163 1.057-.358 2.227-.412 1.266-.059 1.645-.071 4.85-.071zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.057-2.15.26-2.914.557-.79.307-1.459.717-2.126 1.384-.667.667-1.077 1.336-1.384 2.126-.298.764-.501 1.637-.558 2.914-.058 1.28-.071 1.688-.071 4.947s-.013 3.667-.071 4.947c.057 1.277.26 2.15.558 2.914.307.79.717 1.459 1.384 2.126.667.667 1.336 1.077 2.126 1.384.764.298 1.637.501 2.914.558 1.28.058 1.688.071 4.947.071s3.667-.013 4.947-.071c1.277-.057 2.15-.26 2.914-.558.79-.307 1.459-.717 2.126-1.384.667-.667 1.077-1.336 1.384-2.126.298-.764.501-1.637.558-2.914.058-1.28.071-1.688.071-4.947s-.013-3.667-.071-4.947c-.057-1.277-.26-2.15-.558-2.914-.307-.79-.717-1.459-1.384-2.126-.667-.667-1.336-1.077-2.126-1.384-.764-.298-1.637-.501-2.914-.558-1.28-.057-1.688-.071-4.947-.071zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.441s-.645 1.441-1.441 1.441-1.441-.645-1.441-1.441.645-1.441 1.441-1.441z" /></svg>
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
                        {(artists[0].videos && artists[0].videos.length > 0) ? artists[0].videos.map((videoUrl, idx) => {
                            const videoId = videoUrl.includes('v=') ? videoUrl.split('v=')[1]?.split('&')[0] : videoUrl.split('/').pop()?.split('?')[0];
                            const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedVideo(videoUrl)}
                                    className="group relative aspect-video rounded-[32px] overflow-hidden border border-white/10 cursor-pointer"
                                >
                                    <img src={thumbUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                        <div className="w-20 h-20 bg-accent text-dark rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            [
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
                            ))
                        )}
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
                                        {['2 horas de show', 'Equip. Som Incluso', 'Check-in Digital'].map(feat => (
                                            <li key={feat} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => setView('checkout-booking')}
                                        className="w-full py-4 bg-white text-dark font-black rounded-2xl text-[10px] uppercase tracking-widest group-hover:bg-accent transition-colors shadow-lg"
                                    >
                                        Reservar Agora
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: Reviews / Feedback */}
                <section className="space-y-12">
                    <div className="max-w-xl space-y-4">
                        <span className="text-accent text-sm font-black uppercase tracking-widest">Feedback</span>
                        <h2 className="text-5xl font-black italic">Últimos Palcos <br /> <span className="text-white">& Depoimentos.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { place: 'The Night Club', text: 'Jack é sinônimo de casa cheia. Performance nota 10.', user: 'Ricardo, Gerente' },
                            { place: 'Sunset Rooftop', text: 'Melhor voz e violão que já contratamos. Recomendadíssimo.', user: 'Ana, Eventos' },
                            { place: 'Blue Note BH', text: 'Impecável no horário e no repertório. Um artista completo.', user: 'Leo, Curador' }
                        ].map((review, i) => (
                            <div key={i} className="glass p-10 rounded-[40px] border-white/5 space-y-6">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent"></div>)}
                                </div>
                                <p className="text-lg text-white font-medium italic leading-relaxed">"{review.text}"</p>
                                <div className="pt-6 border-t border-white/5">
                                    <p className="text-xs font-black uppercase tracking-widest text-white">{review.place}</p>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase mt-1">{review.user}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="p-20 border-t border-white/5 text-center">
                <div className="max-w-md mx-auto space-y-8 flex flex-col items-center">
                    <img src="/brand-logo-white.png" className="h-10 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setView('landing')} alt="ALL MUSIC" />
                    <p className="text-gray-500 text-sm font-medium">A plataforma definitiva para a elite musical de Minas Gerais.</p>
                    <div className="flex justify-center gap-6">
                        {['Instagram', 'Spotify', 'YouTube', 'Facebook'].map(s => (
                            <a key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-700 hover:text-white transition-colors">{s}</a>
                        ))}
                    </div>
                </div>
            </footer>

            {/* Video Lightbox Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
                    <div onClick={() => setSelectedVideo(null)} className="absolute inset-0 bg-dark/95 backdrop-blur-3xl"></div>
                    <div className="relative w-full max-w-5xl aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,191,0,0.2)] animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center z-20 backdrop-blur-md transition-colors"
                        >
                            ✕
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={selectedVideo.replace('watch?v=', 'embed/') + '?autoplay=1'}
                            title="Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};
