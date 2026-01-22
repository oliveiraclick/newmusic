import type { ViewState } from '../types';

interface LandingContractorViewProps {
    setView: (view: ViewState) => void;
}

export const LandingContractorView: React.FC<LandingContractorViewProps> = ({ setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col selection:bg-cyan-500 selection:text-white overflow-x-hidden">
            {/* Nav Corporate */}
            <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-6 md:px-12 z-[100] transition-all duration-500 bg-dark/80 backdrop-blur-2xl border-b border-white/5">
                <div onClick={() => setView('landing')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">ALL MUSIC</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <div onClick={() => setView('features')} className="hover:text-cyan-400 transition-colors cursor-pointer">Funcionalidades</div>
                    <div onClick={() => setView('how-it-works')} className="hover:text-cyan-400 transition-colors cursor-pointer">Como Funciona</div>
                    <div onClick={() => setView('pricing')} className="hover:text-cyan-400 transition-colors cursor-pointer">Preços</div>
                </div>
                <button
                    onClick={() => setView('landing')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-white transition-all duration-500 font-bold tracking-widest text-xs uppercase"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Sair
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
                                            <p className="text-[10px] text-gray-500">Curadoria ALL MUSIC Platinum</p>
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
                                    <img src="/brand-icon.png" className="w-16 h-16 rounded-full" alt="Logo" />
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
                            Segurança 100% ALL MUSIC
                        </div>
                    </div>
                </section>

                {/* Final CTA Contractor */}
                <section className="py-60 px-6 text-center bg-dark relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)]"></div>
                    <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                        <h1 className="text-6xl md:text-[120px] font-black leading-[0.8] tracking-tighter">O SUCESSO DO <br /> SEU EVENTO <br /> <span className="text-cyan-400 italic">É CIÊNCIA.</span></h1>
                        <p className="text-2xl text-gray-400 max-w-2xl mx-auto">Pare de contar com a sorte. Tenha a curadoria ALL MUSIC cuidando de cada nota do seu palco.</p>
                        <button
                            onClick={() => setView('role-selection')}
                            className="px-20 py-8 bg-cyan-500 text-white text-2xl font-black rounded-full shadow-[0_30px_60px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all outline outline-offset-4 outline-cyan-500/30"
                        >
                            ACESSAR A PLATAFORMA
                        </button>
                    </div>
                </section>
            </main>

            <footer className="py-20 px-12 bg-dark border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
                <img src="/brand-logo-white.png" className="h-10 opacity-80" alt="ALL MUSIC" />
                <div className="text-gray-600 text-sm font-bold uppercase tracking-[0.2em]">© 2026 Inteligência Musical Aplicada</div>
                <div className="flex gap-6 text-gray-400">
                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">LinkedIn</span>
                    <span className="hover:text-cyan-400 cursor-pointer transition-colors">Instagram</span>
                </div>
            </footer>
        </div>
    );
};
