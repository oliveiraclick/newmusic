import React, { useState } from 'react';
import type { ViewState } from '../types';

interface FeaturesViewProps {
    setView: (view: ViewState) => void;
}

export const FeaturesView: React.FC<FeaturesViewProps> = ({ setView }) => {
    const [role, setRole] = useState<'artist' | 'contractor'>('artist');

    const artistFeatures = [
        { title: 'Gestão de Carreira', desc: 'Sua agenda, contratos e material promocional em um só lugar.', icon: '📈' },
        { title: 'Cachê Blindado', desc: 'Recebimento garantido. O valor é retido e liberado automaticamente após o show.', icon: '🛡️' },
        { title: 'Marketing de Elite', desc: 'Seu perfil é impulsionado para contratantes com alto poder de investimento.', icon: '🚀' },
        { title: 'Relatórios de Performance', desc: 'Entenda seu engajamento e feedback do público com dados reais.', icon: '📊' },
    ];

    const contractorFeatures = [
        { title: 'Busca Inteligente', desc: 'Filtre por gênero, avaliação, preço e disponibilidade em segundos.', icon: '🔍' },
        { title: 'Contratante Protegido', desc: 'Garantia de substituição em caso de imprevistos do artista.', icon: '🛡️' },
        { title: 'Dashboard de Eventos', desc: 'Gerencie múltiplos palcos e datas com total controle financeiro.', icon: '🏢' },
        { title: 'Artistas Verificados', desc: 'Portfólios reais, sem filtros de estúdio, validados por outros curadores.', icon: '✅' },
    ];

    const currentFeatures = role === 'artist' ? artistFeatures : contractorFeatures;

    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col">
            <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-6 md:px-12 z-[100] bg-dark/80 backdrop-blur-2xl border-b border-accent/20">
                <div onClick={() => setView('landing')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                    <span className="text-2xl font-black tracking-tighter">ALL MUSIC</span>
                </div>
                <button
                    onClick={() => setView('landing')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-accent hover:text-dark transition-all duration-500 font-bold tracking-widest text-xs uppercase"
                >
                    Voltar
                </button>
            </nav>

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-6xl mx-auto space-y-20">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Funcionalidades</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">Tudo o que você precisa para profissionalizar seu negócio musical em um só lugar.</p>

                        <div className="flex justify-center p-1 bg-white/5 rounded-full w-fit mx-auto border border-white/10">
                            <button
                                onClick={() => setRole('artist')}
                                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${role === 'artist' ? 'bg-accent text-dark' : 'text-gray-500 hover:text-white'}`}
                            >
                                Sou Artista
                            </button>
                            <button
                                onClick={() => setRole('contractor')}
                                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${role === 'contractor' ? 'bg-cyan-500 text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                Sou Contratante
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {currentFeatures.map((f, i) => (
                            <div key={i} className={`p-10 rounded-[40px] border border-white/5 bg-white/5 group hover:border-${role === 'artist' ? 'accent' : 'cyan-500'}/40 transition-all hover:bg-white/[0.07]`}>
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                                <h3 className="text-2xl font-black mb-4 italic">{f.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="pt-20 text-center">
                        <button
                            onClick={() => setView('role-selection')}
                            className={`px-12 py-6 rounded-full font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 ${role === 'artist' ? 'bg-accent text-dark shadow-accent/20' : 'bg-cyan-500 text-white shadow-cyan-500/20'}`}
                        >
                            Começar agora como {role === 'artist' ? 'Artista' : 'Contratante'}
                        </button>
                    </div>
                </div>
            </main>

            <footer className="py-20 border-t border-white/5 flex flex-col items-center gap-6">
                <img src="/brand-logo-white.png" className="h-10 opacity-50" alt="ALL MUSIC" />
                <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px]">© 2026 ALL MUSIC - O Palco da Elite</p>
            </footer>
        </div>
    );
};
