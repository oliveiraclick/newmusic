import type { ViewState } from '../types';

interface LandingArtistViewProps {
    setView: (view: ViewState) => void;
}

export const LandingArtistView: React.FC<LandingArtistViewProps> = ({ setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col selection:bg-accent selection:text-dark overflow-x-hidden">
            {/* Nav Luxo */}
            <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-6 md:px-12 z-[100] transition-all duration-500 bg-dark/80 backdrop-blur-2xl border-b border-accent/20">
                <div onClick={() => setView('landing')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,191,0,0.3)]" alt="Logo" />
                    <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">ALL MUSIC</span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                    <div onClick={() => setView('features')} className="hover:text-accent transition-colors cursor-pointer">Funcionalidades</div>
                    <div onClick={() => setView('how-it-works')} className="hover:text-accent transition-colors cursor-pointer">Como Funciona</div>
                    <div onClick={() => setView('pricing')} className="hover:text-accent transition-colors cursor-pointer">Preços</div>
                </div>
                <button
                    onClick={() => setView('landing')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:text-dark transition-all duration-500 font-bold tracking-widest text-xs uppercase"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Sair
                </button>
            </nav>

            <main className="flex-grow pt-24">
                {/* Hero Cinematic Artist */}
                <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-dark"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay scale-110 animate-slow-zoom"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[160px] rounded-full opacity-50"></div>

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
                                ALL MUSIC não é um diretório. É um sistema de inteligência de carreira que coloca você no centro dos maiores palcos de Minas Gerais.
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
                                        {['Hub Business', 'Visual Premium', 'Dashboard Elite'].map(item => (
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
                <img src="/brand-logo-white.png" className="h-10 opacity-80" alt="ALL MUSIC" />
                <div className="text-gray-600 text-sm font-bold uppercase tracking-[0.2em]">© 2026 Interior de Minas Excellence</div>
                <div className="flex gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border border-white/10 hover:border-accent transition-colors flex items-center justify-center cursor-pointer opacity-50 hover:opacity-100"></div>)}
                </div>
            </footer>
        </div>
    );
};
