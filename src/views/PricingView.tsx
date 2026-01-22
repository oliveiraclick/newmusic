import React, { useState } from 'react';
import type { ViewState } from '../types';

interface PricingViewProps {
    setView: (view: ViewState) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ setView }) => {
    const [role, setRole] = useState<'artist' | 'contractor'>('artist');

    const artistPlans = [
        {
            name: 'Starter',
            price: 'Grátis',
            desc: 'Para quem está começando a carreira.',
            features: ['Perfil básico', 'Aparecer na lista geral', 'Taxa de serviço de 25%'],
            cta: 'Começar Agora',
            highlight: false
        },
        {
            name: 'Pro',
            price: 'R$ 49,90',
            desc: 'O nível ideal para músicos profissionais.',
            features: ['Destaque nos resultados', 'Agenda Ilimitada', 'Taxa reduzida (15%)', 'Estatísticas básicas'],
            cta: 'Assinar Pro',
            highlight: true
        },
        {
            name: 'Elite',
            price: 'R$ 149,90',
            desc: 'A elite da música mineira.',
            features: ['Selo ALL MUSIC Platinum', 'Assessoria de Marketing', 'Taxa mínima (10%)', 'Dashboard Financeiro Pro'],
            cta: 'Seja Elite',
            highlight: false
        }
    ];

    const contractorPlans = [
        {
            name: 'Eventer',
            price: 'Grátis',
            desc: 'Para pequenos bares e eventos privados.',
            features: ['Busca de artistas', 'Reserva direta', 'Segurança de pagamento'],
            cta: 'Criar Perfil',
            highlight: false
        },
        {
            name: 'Business',
            price: 'R$ 199,00',
            desc: 'Para casas de show e organizadores.',
            features: ['Garantia de Backup IA', 'Multi-palcos', 'Contratos Personalizados', 'Suporte Prioritário'],
            cta: 'Upgrade Business',
            highlight: true
        },
        {
            name: 'Enterprise',
            price: 'Sob Consulta',
            desc: 'Para grandes redes e festivais.',
            features: ['API de Integração', 'Gestor de Contas Dedicado', 'Controles Financeiros em Massa', 'Seguro Cancelamento Full'],
            cta: 'Falar com Consultor',
            highlight: false
        }
    ];

    const currentPlans = role === 'artist' ? artistPlans : contractorPlans;

    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col">
            <nav className="fixed top-0 inset-x-0 h-24 flex items-center justify-between px-6 md:px-12 z-[100] bg-dark/80 backdrop-blur-2xl border-b border-white/5">
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
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">Planos para <br /><span className={role === 'artist' ? 'text-accent' : 'text-cyan-500'}>o seu Sucesso.</span></h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">Transparência total. Escalabilidade real para sua carreira ou evento.</p>

                        <div className="flex justify-center p-1 bg-white/5 rounded-full w-fit mx-auto border border-white/10 mt-12">
                            <button
                                onClick={() => setRole('artist')}
                                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${role === 'artist' ? 'bg-accent text-dark' : 'text-gray-500 hover:text-white'}`}
                            >
                                Perfil Artista
                            </button>
                            <button
                                onClick={() => setRole('contractor')}
                                className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all ${role === 'contractor' ? 'bg-cyan-500 text-white' : 'text-gray-500 hover:text-white'}`}
                            >
                                Perfil Contratante
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {currentPlans.map((p, i) => (
                            <div key={i} className={`p-10 rounded-[48px] border transition-all flex flex-col ${p.highlight ? (role === 'artist' ? 'border-accent bg-accent/5 ring-4 ring-accent/10 shadow-2xl shadow-accent/20' : 'border-cyan-500 bg-cyan-500/5 ring-4 ring-cyan-500/10 shadow-2xl shadow-cyan-500/20') : 'border-white/5 bg-white/5 opacity-80 hover:opacity-100 hover:border-white/20'}`}>
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">{p.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">{p.price}</span>
                                        {p.price !== 'Grátis' && p.price !== 'Sob Consulta' && <span className="text-gray-500 font-bold text-sm">/mês</span>}
                                    </div>
                                    <p className="text-gray-500 text-sm mt-4 leading-relaxed">{p.desc}</p>
                                </div>

                                <div className="space-y-4 mb-12 flex-grow">
                                    {p.features.map((f, fi) => (
                                        <div key={fi} className="flex gap-3 text-sm">
                                            <span className={role === 'artist' ? 'text-accent' : 'text-cyan-500'}>✓</span>
                                            <span className="text-gray-300 font-medium">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setView('role-selection')}
                                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${p.highlight ? (role === 'artist' ? 'bg-accent text-dark shadow-xl' : 'bg-cyan-500 text-white shadow-xl') : 'bg-white/10 hover:bg-white text-white hover:text-dark'}`}
                                >
                                    {p.cta}
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-[10px] text-gray-700 font-black uppercase tracking-[0.4em] pt-12">
                        Preços e taxas podem variar conforme a região e volume de contratos.
                    </p>
                </div>
            </main>

            <footer className="py-20 border-t border-white/5 flex flex-col items-center gap-6">
                <img src="/brand-logo-white.png" className="h-10 opacity-30" alt="ALL MUSIC" />
                <p className="text-gray-600 font-bold uppercase tracking-widest text-[9px]">© 2026 ALL MUSIC - O Ecossistema Musical de Elite</p>
            </footer>
        </div>
    );
};
