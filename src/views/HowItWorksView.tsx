import React, { useState } from 'react';
import type { ViewState } from '../types';

interface HowItWorksViewProps {
    setView: (view: ViewState) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ setView }) => {
    const [role, setRole] = useState<'artist' | 'contractor'>('artist');

    const artistSteps = [
        { title: 'Crie seu Perfil', desc: 'Preencha seus dados artísticos, adicione fotos, vídeos e defina seus pacotes de show.', step: '01' },
        { title: 'Nossa Curadoria Analisa', desc: 'Nossa equipe valida suas informações para garantir o selo de qualidade ALL MUSIC.', step: '02' },
        { title: 'Receba Propostas', desc: 'Contratantes encontram você e fazem propostas diretas através do portal.', step: '03' },
        { title: 'Garanta o Cachê', desc: 'Assim que aceita, o dinheiro fica retido e garantido pela plataforma.', step: '04' },
        { title: 'Check-in e Pagamento', desc: 'Faça o show, dê o check-in pelo app e receba seu dinheiro em poucos dias.', step: '05' },
    ];

    const contractorSteps = [
        { title: 'Explore Talentos', desc: 'Use nossos filtros avançados para encontrar o artista perfeito para o seu evento.', step: '01' },
        { title: 'Veja Dados Reais', desc: 'Analise vídeos sem edição, feedbacks de outros locais e pontuação de pontualidade.', step: '02' },
        { title: 'Reserve com Segurança', desc: 'Faça o pagamento via plataforma. O valor só é liberado após o check-in do artista.', step: '03' },
        { title: 'Backup Garantido', desc: 'Se houver algum imprevisto, nossa IA escala um artista equivalente no mesmo instante.', step: '04' },
        { title: 'Avalie a Experiência', desc: 'Dê sua nota técnica e ajude a manter a excelência da rede.', step: '05' },
    ];

    const currentSteps = role === 'artist' ? artistSteps : contractorSteps;

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
                <div className="max-w-4xl mx-auto space-y-20">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Como Funciona</h1>
                        <p className="text-gray-400 text-lg">O caminho mais curto entre o talento e o grande evento.</p>

                        <div className="flex justify-center p-1 bg-white/5 rounded-full w-fit mx-auto border border-white/10">
                            <button
                                onClick={() => setRole('artist')}
                                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${role === 'artist' ? 'bg-accent text-dark' : 'text-gray-500 hover:text-white'}`}
                            >
                                Fluxo do Artista
                            </button>
                            <button
                                onClick={() => setRole('contractor')}
                                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${role === 'contractor' ? 'bg-cyan-500 text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                Fluxo do Contratante
                            </button>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {currentSteps.map((s, i) => (
                            <div key={i} className="flex gap-8 items-start group">
                                <div className={`text-6xl font-black italic opacity-20 group-hover:opacity-100 transition-opacity ${role === 'artist' ? 'text-accent' : 'text-cyan-500'}`}>
                                    {s.step}
                                </div>
                                <div className="pt-4 space-y-2 border-l-2 border-white/5 pl-8 group-hover:border-accent/40 transition-colors">
                                    <h3 className="text-2xl font-black italic">{s.title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-20 text-center">
                        <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-widest">Pronto para subir no próximo nível?</p>
                        <button
                            onClick={() => setView('role-selection')}
                            className={`px-12 py-6 rounded-full font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 ${role === 'artist' ? 'bg-accent text-dark shadow-accent/20' : 'bg-cyan-500 text-white shadow-cyan-500/20'}`}
                        >
                            Criar minha conta agora
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
