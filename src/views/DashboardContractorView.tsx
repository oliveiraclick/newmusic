import type { Artist, ViewState, ContractorSubView } from '../types';

interface DashboardContractorViewProps {
    artists: Artist[];
    setView: (view: ViewState) => void;
    contractorSubView: ContractorSubView;
    setContractorSubView: (view: ContractorSubView) => void;
}

export const DashboardContractorView: React.FC<DashboardContractorViewProps> = ({
    artists,
    setView,
    contractorSubView,
    setContractorSubView
}) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-72 bg-white/5 border-r border-white/5 flex flex-col p-8 gap-12 shrink-0 overflow-y-auto max-h-screen">
                <div onClick={() => setView('landing')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                    <span className="text-2xl font-black tracking-tighter">ALL MUSIC</span>
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
                            onClick={() => setContractorSubView(item.id as ContractorSubView)}
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
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=allmusic-feedback-demo`} className="w-full h-full object-contain" alt="QR Code" />
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
                        Sair da Plataforma
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen relative">
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
                        <section className="mb-12 flex flex-wrap gap-4 relative z-10">
                            {['Todos', 'Rock', 'Jazz', 'Pop', 'Sertanejo', 'MPB'].map((cat, i) => (
                                <button key={cat} className={`px-8 py-3 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 ${i === 0 ? 'bg-white text-dark border-white shadow-lg' : 'border-white/10 text-gray-500 hover:border-white/40'}`}>
                                    {cat}
                                </button>
                            ))}
                        </section>

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
            </main>
        </div>
    );
};
