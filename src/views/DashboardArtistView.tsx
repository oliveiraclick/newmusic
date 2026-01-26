import React, { useState } from 'react';
import type { Artist, ViewState, ArtistSubView } from '../types';

interface DashboardArtistViewProps {
    artists: Artist[];
    setView: (view: ViewState) => void;
    artistSubView: ArtistSubView;
    setArtistSubView: (view: ArtistSubView) => void;
    calendarDate: Date;
    setCalendarDate: (date: Date) => void;
    blockedDates: Record<string, 'external' | 'vacation' | 'show'>;
    financialRecords: Record<string, number>;
    monthNames: string[];
    isAgendaModalOpen: boolean;
    setIsAgendaModalOpen: (open: boolean) => void;
    selectedAgendaDate: string | null;
    setSelectedAgendaDate: (date: string | null) => void;
    agendaModalStep: 'options' | 'cache_input';
    setAgendaModalStep: (step: 'options' | 'cache_input') => void;
    externalCacheValue: string;
    setExternalCacheValue: (val: string) => void;
    externalContractorName: string;
    setExternalContractorName: (val: string) => void;
    setBlockedDates: React.Dispatch<React.SetStateAction<Record<string, 'external' | 'vacation' | 'show'>>>;
    setFinancialRecords: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    bookingDetails: Record<string, { contractor: string, time: string }>;
    setBookingDetails: React.Dispatch<React.SetStateAction<Record<string, { contractor: string, time: string }>>>;
    balance: number;
    setBalance: (val: number) => void;
    setArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
    marketplaceItems: any[];
}

export const DashboardArtistView: React.FC<DashboardArtistViewProps> = ({
    artists,
    setView,
    artistSubView,
    setArtistSubView,
    calendarDate,
    setCalendarDate,
    blockedDates,
    financialRecords,
    monthNames,
    isAgendaModalOpen,
    setIsAgendaModalOpen,
    selectedAgendaDate,
    setSelectedAgendaDate,
    agendaModalStep,
    setAgendaModalStep,
    externalCacheValue,
    setExternalCacheValue,
    externalContractorName,
    setExternalContractorName,
    setBlockedDates,
    setFinancialRecords,
    bookingDetails,
    setBookingDetails,
    balance,
    setBalance,
    setArtists,
    marketplaceItems
}) => {
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const parseDate = (dStr: string) => {
        const [year, month, day] = dStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-72 bg-white/5 border-r border-white/5 flex flex-col p-8 gap-12 shrink-0 overflow-y-auto max-h-screen">
                <div onClick={() => setView('landing')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                    <span className="text-2xl font-black tracking-tighter">ALL MUSIC</span>
                </div>

                <nav className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 block mb-6 px-4">Menu Principal</span>
                    {[
                        { id: 'overview', label: 'Visão Geral' },
                        { id: 'agenda', label: 'Minha Agenda' },
                        { id: 'marketplace', label: 'Mercado' },
                        { id: 'stats', label: 'Estatísticas' },
                        { id: 'config', label: 'Configurações' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setArtistSubView(item.id as ArtistSubView)}
                            className={`w-full text-left px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${artistSubView === item.id ? 'bg-accent text-dark' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-600">Visualização Pública</p>
                    <div className="space-y-2">
                        <button onClick={() => setView('profile-artist')} className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-accent transition-all">Ver Perfil Completo</button>
                        <button onClick={() => setView('mini-profile')} className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-accent transition-all">Página "Link na Bio"</button>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <button onClick={() => setView('landing')} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Sair do Painel
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen relative">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 relative z-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent/80">Monitoramento em Tempo Real</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic">
                            {artistSubView === 'overview' && <>Olá, <span className="text-white">{artists[0].name}.</span></>}
                            {artistSubView === 'agenda' && <>Minha <span className="text-white">Agenda.</span></>}
                            {artistSubView === 'marketplace' && <>Mercado de <span className="text-white">Serviços.</span></>}
                            {artistSubView === 'stats' && <>Minhas <span className="text-white">Métricas.</span></>}
                            {artistSubView === 'config' && <>Minha <span className="text-white">Conta.</span></>}
                        </h1>
                        <p className="text-gray-500 font-medium">Belo Horizonte, MG • {new Date().toLocaleDateString('pt-BR')}</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="p-4 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-6">
                            <div className="text-right">
                                <span className="block text-[8px] font-black uppercase tracking-widest text-gray-600">Saldo Disponível</span>
                                <span className="text-lg font-black text-accent italic">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <button className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-dark hover:scale-105 active:scale-95 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                            </button>
                        </div>
                    </div>
                </header>

                {artistSubView === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
                        {/* Left Column: Stats Cards */}
                        <div className="lg:col-span-2 space-y-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { label: 'Orcamentos Pendentes', val: '04', trend: '+12%', icon: '📄' },
                                    { label: 'Shows Confirmados', val: Object.keys(blockedDates).filter(d => blockedDates[d] === 'show' || blockedDates[d] === 'external').length.toString().padStart(2, '0'), trend: '+5%', icon: '🎸' },
                                    { label: 'Alcance do Perfil', val: '2.4k', trend: '+24%', icon: '🔥' },
                                    { label: 'Nota Geral', val: '5.0', trend: 'MAX', icon: '⭐' }
                                ].map((stat, i) => (
                                    <div key={i} className="glass p-8 rounded-[40px] border-white/5 space-y-4 hover:border-accent/40 transition-colors group">
                                        <div className="flex justify-between items-start">
                                            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{stat.trend === 'MAX' ? '✨' : stat.icon}</span>
                                            <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-md">{stat.trend}</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">{stat.label}</p>
                                            <h4 className="text-4xl font-black italic">{stat.val}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Activity */}
                            <div className="glass p-10 rounded-[48px] border-white/5 space-y-8">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Atividades Recentes</h3>
                                <div className="space-y-6">
                                    {[
                                        { type: 'Booking', msg: 'Novo pedido de reserva: Hotel Mercure Savassi', time: 'Há 2 horas', status: 'new' },
                                        { type: 'Payment', msg: 'Pagamento liberado: Show no Pub Intergalactic', time: 'Há 5 horas', status: 'done' },
                                        { type: 'Rating', msg: 'Você recebeu uma nova avaliação 5 estrelas', time: 'Ontem', status: 'star' }
                                    ].map((act, i) => (
                                        <div key={i} className="flex items-center gap-6 p-6 bg-white/2 rounded-3xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${act.status === 'new' ? 'bg-accent/20 text-accent' : 'bg-white/5 text-gray-500'}`}>
                                                {act.type === 'Booking' && '📅'}
                                                {act.type === 'Payment' && '💰'}
                                                {act.type === 'Rating' && '⭐'}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-sm font-bold text-white">{act.msg}</p>
                                                <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest">{act.time}</span>
                                            </div>
                                            <button className="text-[10px] font-black uppercase text-accent border-b border-accent pb-1">Ver Detalhes</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Mini Agenda & Quick Action */}
                        <div className="space-y-10">
                            <div className="glass p-8 rounded-[48px] border-white/20 bg-accent/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
                                <div className="relative z-10 space-y-6 text-center">
                                    <h4 className="text-lg font-black uppercase tracking-widest italic">Acelere sua Carreira</h4>
                                    <p className="text-gray-400 text-sm font-medium">Contrate nosso time de tráfego pago para destacar seu perfil nos fins de semana.</p>
                                    <button className="w-full py-5 bg-accent text-dark font-black rounded-3xl shadow-xl shadow-accent/20 hover:scale-[1.03] transition-all text-xs uppercase tracking-widest">Ativar Turbo Profile</button>
                                </div>
                            </div>

                            <div className="glass p-10 rounded-[48px] border-white/5 space-y-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Próximos Shows</h3>
                                    <button onClick={() => setArtistSubView('agenda')} className="text-[10px] font-black uppercase text-accent">Ver Agenda</button>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { date: '25 FEV', venue: 'Pub Intergalactic', time: '21:00' },
                                        { date: '28 FEV', venue: 'Sunset Rooftop', time: '18:30' }
                                    ].map((show, i) => (
                                        <div key={i} className="flex items-center gap-6">
                                            <div className="text-center w-12 shrink-0">
                                                <span className="block text-xl font-black italic leading-none">{show.date.split(' ')[0]}</span>
                                                <span className="text-[10px] font-black text-accent">{show.date.split(' ')[1]}</span>
                                            </div>
                                            <div className="h-10 w-px bg-white/10"></div>
                                            <div>
                                                <p className="text-sm font-black text-white">{show.venue}</p>
                                                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{show.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {artistSubView === 'agenda' && (
                    <div className="glass p-10 md:p-12 rounded-[60px] border-white/5 relative z-10">
                        {/* Header Calendário */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                            <div className="flex items-center gap-8">
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                                    {monthNames[calendarDate.getMonth()]} <span className="text-gray-600">{calendarDate.getFullYear()}</span>
                                </h2>
                                <div className="flex gap-2">
                                    <button onClick={() => setCalendarDate(new Date(calendarDate.setMonth(calendarDate.getMonth() - 1)))} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">←</button>
                                    <button onClick={() => setCalendarDate(new Date(calendarDate.setMonth(calendarDate.getMonth() + 1)))} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">→</button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Show Confirmado</span>
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Férias / Bloqueio</span>
                                </div>
                            </div>
                        </div>

                        {/* Grid Calendário */}
                        <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                                <div key={day} className="bg-dark p-6 text-center text-[10px] font-black uppercase tracking-widest text-gray-700 border-b border-white/5">{day}</div>
                            ))}
                            {Array.from({ length: getFirstDayOfMonth(calendarDate.getFullYear(), calendarDate.getMonth()) }).map((_, i) => (
                                <div key={`empty-${i}`} className="bg-dark/40 p-10"></div>
                            ))}
                            {Array.from({ length: getDaysInMonth(calendarDate.getFullYear(), calendarDate.getMonth()) }).map((_, i) => {
                                const day = i + 1;
                                const dStr = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const status = blockedDates[dStr];
                                const revenue = financialRecords[dStr];

                                return (
                                    <div
                                        key={day}
                                        onClick={() => {
                                            setSelectedAgendaDate(dStr);
                                            setAgendaModalStep('options');
                                            setIsAgendaModalOpen(true);
                                        }}
                                        className={`bg-dark p-6 md:p-8 min-h-[140px] border-b border-r border-white/5 cursor-pointer hover:bg-white/[0.02] transition-colors relative group`}
                                    >
                                        <span className={`text-xl font-black italic ${status ? 'text-white' : 'text-gray-800 group-hover:text-gray-600'}`}>{day}</span>

                                        {status === 'show' && (
                                            <div className="mt-4 space-y-2">
                                                <div className="w-full h-1 bg-accent rounded-full"></div>
                                                <p className="text-[9px] font-black uppercase tracking-tighter text-accent truncate">Show de Elite</p>
                                                {revenue && <p className="text-xs font-black text-white">R$ {revenue}</p>}
                                            </div>
                                        )}

                                        {status === 'vacation' && (
                                            <div className="mt-4 space-y-2">
                                                <div className="w-full h-1 bg-red-500 rounded-full"></div>
                                                <p className="text-[9px] font-black uppercase tracking-tighter text-red-500">Bloqueado</p>
                                            </div>
                                        )}

                                        {status === 'external' && (
                                            <div className="mt-4 space-y-2">
                                                <div className="w-full h-1 bg-gray-500 rounded-full"></div>
                                                <p className="text-[9px] font-black uppercase tracking-tighter text-gray-500 truncate">
                                                    {bookingDetails[dStr]?.contractor || 'Evento Externo'}
                                                </p>
                                                {revenue && <p className="text-xs font-black text-gray-500 whitespace-nowrap">R$ {revenue.toLocaleString('pt-BR')}</p>}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {artistSubView === 'marketplace' && (
                    <div className="space-y-12 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {marketplaceItems.map((item) => (
                                <div key={item.id} className="group glass p-2 rounded-[48px] border-white/5 hover:border-accent/40 transition-all overflow-hidden">
                                    <div className="aspect-[4/3] rounded-[42px] overflow-hidden relative">
                                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                                        <div className="absolute top-6 right-6">
                                            <span className="px-5 py-2 bg-accent text-dark text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">A partir de {item.price}</span>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">EQUIPAMENTO</span>
                                            <h4 className="text-2xl font-black italic">{item.name}</h4>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium leading-relaxed">Vendedor: {item.seller}</p>
                                        <button
                                            onClick={() => {
                                                const price = parseFloat(item.price.replace('R$', '').replace('.', '').trim());
                                                if (balance >= price) {
                                                    setBalance(balance - price);
                                                    setToast({ msg: `Serviço "${item.name}" contratado com sucesso!`, type: 'success' });
                                                    setTimeout(() => setToast(null), 3000);
                                                } else {
                                                    setToast({ msg: 'Saldo insuficiente para este serviço.', type: 'error' });
                                                    setTimeout(() => setToast(null), 3000);
                                                }
                                            }}
                                            className="w-full py-5 bg-white/5 border border-white/10 rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-accent hover:text-dark hover:border-accent transition-all"
                                        >
                                            Contratar Serviço
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {artistSubView === 'stats' && (
                    <div className="space-y-12 relative z-10 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    label: 'Faturamento Bruto',
                                    val: `R$ ${Object.values(financialRecords).reduce((a, b) => a + b, 0).toLocaleString('pt-BR')}`,
                                    sub: 'Total acumulado',
                                    color: 'text-white'
                                },
                                {
                                    label: 'Comissão Plataforma (10%)',
                                    val: `R$ ${(Object.values(financialRecords).reduce((a, b) => a + b, 0) * 0.1).toLocaleString('pt-BR')}`,
                                    sub: 'Taxa de serviço',
                                    color: 'text-red-500'
                                },
                                {
                                    label: 'Lucro Líquido Real',
                                    val: `R$ ${(Object.values(financialRecords).reduce((a, b) => a + b, 0) * 0.9).toLocaleString('pt-BR')}`,
                                    sub: 'Livre para saque',
                                    color: 'text-accent'
                                }
                            ].map((s, i) => (
                                <div key={i} className="glass p-10 rounded-[48px] border-white/5 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">{s.label}</p>
                                    <h3 className={`text-3xl font-black italic ${s.color}`}>{s.val}</h3>
                                    <p className="text-xs font-medium text-gray-500">{s.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div className="glass p-12 rounded-[60px] border-white/5 h-[400px] flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-black italic uppercase tracking-widest">Performance Financeira</h3>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase"><div className="w-2 h-2 rounded-full bg-accent"></div> Receita</span>
                                    <span className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase"><div className="w-2 h-2 rounded-full bg-red-500"></div> Despesas</span>
                                </div>
                            </div>

                            <div className="flex-grow flex items-end gap-4 mt-8">
                                {Object.keys(financialRecords).slice(-7).map((date, i) => {
                                    const height = (financialRecords[date] / 5000) * 100;
                                    return (
                                        <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                            <div className="w-full relative">
                                                <div
                                                    style={{ height: `${height}%` }}
                                                    className="w-full bg-gradient-to-t from-accent to-accent/40 rounded-2xl group-hover:brightness-125 transition-all"
                                                ></div>
                                                <div
                                                    style={{ height: `${height * 0.3}%` }}
                                                    className="w-full absolute bottom-0 bg-red-500/20 rounded-2xl border-t border-red-500/30"
                                                ></div>
                                            </div>
                                            <span className="text-[8px] font-black text-gray-600 uppercase">{date.split('-')[2]} FEV</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {artistSubView === 'config' && (
                    <div className="space-y-12 relative z-10 animate-in fade-in duration-500 pb-20">
                        <div className="glass p-10 md:p-14 rounded-[60px] border-white/5 space-y-10">
                            <header className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-accent/20 rounded-3xl flex items-center justify-center text-3xl">👤</div>
                                <div>
                                    <h3 className="text-2xl font-black italic uppercase">Configurações do Perfil</h3>
                                    <p className="text-sm font-medium text-gray-500">Mantenha seu perfil atualizado para atrair mais contratantes.</p>
                                </div>
                            </header>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Informações Básicas */}
                                <div className="space-y-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Informações de Carreira</h4>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nome Artístico</label>
                                        <input
                                            type="text"
                                            value={artists[0].name}
                                            onChange={(e) => {
                                                const newArtists = [...artists];
                                                newArtists[0] = { ...newArtists[0], name: e.target.value };
                                                setArtists(newArtists);
                                            }}
                                            className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl outline-none focus:border-accent transition-colors font-bold"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Gênero Musical</label>
                                        <input
                                            type="text"
                                            value={artists[0].genre}
                                            onChange={(e) => {
                                                const newArtists = [...artists];
                                                newArtists[0] = { ...newArtists[0], genre: e.target.value };
                                                setArtists(newArtists);
                                            }}
                                            className="w-full bg-white/5 border border-white/10 p-5 rounded-3xl outline-none focus:border-accent transition-colors font-bold"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Biografia / Release</label>
                                        <textarea
                                            value={artists[0].bio || ''}
                                            onChange={(e) => {
                                                const newArtists = [...artists];
                                                newArtists[0] = { ...newArtists[0], bio: e.target.value };
                                                setArtists(newArtists);
                                            }}
                                            placeholder="Conte sua história, conquistas e o que os contratantes podem esperar do seu show..."
                                            className="w-full bg-white/5 border border-white/10 p-6 rounded-[32px] h-48 outline-none focus:border-accent transition-colors font-medium text-sm resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Mídia e Links */}
                                <div className="space-y-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Mídia e Portfólio</h4>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">URL da Foto de Perfil</label>
                                        <div className="flex gap-4">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                                                <img src={artists[0].img} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <input
                                                type="text"
                                                value={artists[0].img}
                                                onChange={(e) => {
                                                    const newArtists = [...artists];
                                                    newArtists[0] = { ...newArtists[0], img: e.target.value };
                                                    setArtists(newArtists);
                                                }}
                                                className="flex-grow bg-white/5 border border-white/10 p-5 rounded-3xl outline-none focus:border-accent transition-colors font-mono text-[10px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4 block">Links de Vídeo (YouTube)</label>
                                        {(artists[0].videos || ['']).map((video, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={video}
                                                    placeholder="https://youtube.com/watch?v=..."
                                                    onChange={(e) => {
                                                        const newArtists = [...artists];
                                                        const videos = [...(newArtists[0].videos || [])];
                                                        videos[idx] = e.target.value;
                                                        newArtists[0] = { ...newArtists[0], videos };
                                                        setArtists(newArtists);
                                                    }}
                                                    className="flex-grow bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-accent transition-colors font-medium text-xs"
                                                />
                                                {idx === (artists[0].videos?.length || 1) - 1 && (
                                                    <button
                                                        onClick={() => {
                                                            const newArtists = [...artists];
                                                            newArtists[0] = { ...newArtists[0], videos: [...(newArtists[0].videos || []), ''] };
                                                            setArtists(newArtists);
                                                        }}
                                                        className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-dark hover:scale-105 transition-all"
                                                    >+</button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-8 bg-accent/5 border border-accent/10 rounded-[40px] space-y-4">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-accent">Dica de Sucesso</h5>
                                        <p className="text-xs font-medium text-gray-400 leading-relaxed">Artistas que possuem bio detalhada e pelo menos 2 vídeos de shows ao vivo convertem **85% mais reservas** na plataforma.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-white/5 flex justify-end">
                                <button
                                    onClick={() => {
                                        setToast({ msg: 'Alterações salvas com sucesso!', type: 'success' });
                                        setTimeout(() => setToast(null), 3000);
                                        setArtistSubView('overview');
                                    }}
                                    className="px-12 py-6 bg-accent text-dark font-black rounded-3xl shadow-xl shadow-accent/20 hover:scale-[1.03] active:scale-95 transition-all text-xs uppercase tracking-widest"
                                >
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Agenda Modal */}
            {isAgendaModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div onClick={() => setIsAgendaModalOpen(false)} className="absolute inset-0 bg-dark/80 backdrop-blur-xl"></div>
                    <div className="glass w-full max-w-lg rounded-[60px] border-white/10 relative z-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                        <div className="p-10 md:p-14 space-y-10">
                            <header className="flex justify-between items-start">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent block mb-2">Gerenciar Data</span>
                                    <h3 className="text-3xl font-black italic">{selectedAgendaDate && parseDate(selectedAgendaDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</h3>
                                </div>
                                <button onClick={() => setIsAgendaModalOpen(false)} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">✕</button>
                            </header>

                            {agendaModalStep === 'options' && (
                                <div className="space-y-4">
                                    {(blockedDates[selectedAgendaDate || ''] === 'external' || blockedDates[selectedAgendaDate || ''] === 'vacation') && (
                                        <button
                                            onClick={() => {
                                                if (selectedAgendaDate) {
                                                    setBlockedDates(prev => {
                                                        const next = { ...prev };
                                                        delete next[selectedAgendaDate];
                                                        return next;
                                                    });
                                                    setFinancialRecords(prev => {
                                                        const next = { ...prev };
                                                        delete next[selectedAgendaDate];
                                                        return next;
                                                    });
                                                    setBookingDetails(prev => {
                                                        const next = { ...prev };
                                                        delete next[selectedAgendaDate];
                                                        return next;
                                                    });
                                                    setIsAgendaModalOpen(false);
                                                }
                                            }}
                                            className="w-full p-8 bg-accent/10 hover:bg-white/10 border border-accent/20 rounded-[32px] text-left transition-all group"
                                        >
                                            <span className="block text-[10px] font-black uppercase tracking-widest text-accent mb-2">Ação Sugerida</span>
                                            <h4 className="text-xl font-black italic">Desbloquear / Liberar Data</h4>
                                            <p className="text-xs font-medium opacity-60 mt-2">Remove o bloqueio atual e torna a data disponível novamente.</p>
                                        </button>
                                    )}

                                    <button
                                        onClick={() => setAgendaModalStep('cache_input')}
                                        className="w-full p-8 bg-white/5 hover:bg-accent hover:text-dark border border-white/5 rounded-[32px] text-left transition-all group"
                                    >
                                        <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Opção 01</span>
                                        <h4 className="text-xl font-black italic">Bloquear Data Externamente</h4>
                                        <p className="text-xs font-medium opacity-60 mt-2">Registrar um show que não foi fechado pela plataforma.</p>
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (selectedAgendaDate) {
                                                setBlockedDates(prev => ({ ...prev, [selectedAgendaDate]: 'vacation' }));
                                                setIsAgendaModalOpen(false);
                                            }
                                        }}
                                        className="w-full p-8 bg-white/5 hover:bg-red-500 hover:text-white border border-white/5 rounded-[32px] text-left transition-all group"
                                    >
                                        <span className="block text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Opção 02</span>
                                        <h4 className="text-xl font-black italic">Indisponível / Folga</h4>
                                        <p className="text-xs font-medium opacity-60 mt-2">Bloqueia a data para novos orçamentos e consultas.</p>
                                    </button>
                                </div>
                            )}

                            {agendaModalStep === 'cache_input' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Nome do Evento / Contratante</label>
                                            <input
                                                type="text"
                                                value={externalContractorName}
                                                onChange={(e) => setExternalContractorName(e.target.value)}
                                                placeholder="Ex: Show Casamento Marina"
                                                className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-accent transition-colors font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4">Valor do Cache (R$)</label>
                                            <input
                                                type="text"
                                                value={externalCacheValue}
                                                onChange={(e) => setExternalCacheValue(e.target.value)}
                                                placeholder="0,00"
                                                className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl outline-none focus:border-accent transition-colors font-bold text-accent text-2xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setAgendaModalStep('options')} className="flex-1 py-6 bg-white/5 border border-white/10 rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Voltar</button>
                                        <button
                                            onClick={() => {
                                                if (selectedAgendaDate) {
                                                    setBlockedDates(prev => ({ ...prev, [selectedAgendaDate]: 'external' }));
                                                    setFinancialRecords(prev => ({ ...prev, [selectedAgendaDate]: parseFloat(externalCacheValue.replace(',', '.')) || 0 }));
                                                    setBookingDetails(prev => ({ ...prev, [selectedAgendaDate]: { contractor: externalContractorName, time: 'Show Externo' } }));
                                                    setIsAgendaModalOpen(false);
                                                    setExternalCacheValue('');
                                                    setExternalContractorName('');
                                                }
                                            }}
                                            className="flex-[2] py-6 bg-accent text-dark rounded-3xl text-xs font-black uppercase tracking-widest shadow-xl shadow-accent/20 hover:scale-[1.02] transition-all"
                                        >
                                            Confirmar Bloqueio
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Toast Notification */}
            {toast && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-8 fade-in duration-500">
                    <div className={`glass px-8 py-4 rounded-2xl border ${toast.type === 'success' ? 'border-accent/40 bg-accent/10' : 'border-red-500/40 bg-red-500/10'} backdrop-blur-2xl shadow-2xl flex items-center gap-4`}>
                        <div className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-accent' : 'bg-red-500'} animate-pulse`}></div>
                        <span className="text-xs font-black uppercase tracking-widest text-white">{toast.msg}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
