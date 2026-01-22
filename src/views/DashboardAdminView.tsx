import React, { useState } from 'react';
import type { ViewState, AdminSubView, PlatformUser, FinancialTransaction, SubscriptionPlan } from '../types';

interface DashboardAdminViewProps {
    setView: (view: ViewState) => void;
}

export const DashboardAdminView: React.FC<DashboardAdminViewProps> = ({ setView }) => {
    const [activeSubView, setActiveSubView] = useState<AdminSubView>('users');

    // Mock Data and Modals State
    const [users, setUsers] = useState<PlatformUser[]>([
        { id: '1', name: 'Jack Wild', email: 'jack@wild.com', role: 'artist', status: 'active', joinedAt: '2025-10-12' },
        { id: '2', name: 'Lia do Samba', email: 'lia@samba.br', role: 'artist', status: 'active', joinedAt: '2025-11-05' },
        { id: '3', name: 'Pub Intergalactic', email: 'contato@pub-inter.com', role: 'contractor', status: 'active', joinedAt: '2025-08-20' },
        { id: '4', name: 'Spam Artist', email: 'bad@fake.com', role: 'artist', status: 'blocked', joinedAt: '2026-01-01' },
    ]);

    const [transactions, setTransactions] = useState<FinancialTransaction[]>([
        { id: 'TX001', user: 'Jack Wild', amount: 4500, type: 'payable', dueDate: '2026-02-15', status: 'pending' },
        { id: 'TX002', user: 'Sunset Rooftop', amount: 12000, type: 'receivable', dueDate: '2026-02-10', status: 'paid' },
        { id: 'TX003', user: 'Lia do Samba', amount: 2800, type: 'payable', dueDate: '2026-02-28', status: 'pending' },
    ]);

    const [plans, setPlans] = useState<SubscriptionPlan[]>([
        { id: 'P1', name: 'Artist Pro', price: 49.90, interval: 'month', target: 'artist', features: ['Agenda ilimitada', 'Destaque na busca'] },
        { id: 'P2', name: 'Business Elite', price: 199.00, interval: 'month', target: 'contractor', features: ['Taxa zero de reserva', 'Suporte 24/7'] },
    ]);

    // Modal & Form States
    const [editingUser, setEditingUser] = useState<PlatformUser | null>(null);
    const [isFinModalOpen, setIsFinModalOpen] = useState(false);
    const [newTransaction, setNewTransaction] = useState<Partial<FinancialTransaction>>({ type: 'receivable', status: 'pending' });
    const [newPlan, setNewPlan] = useState<Partial<SubscriptionPlan>>({ target: 'artist', interval: 'month' });
    const [systemAssets, setSystemAssets] = useState<Record<string, string>>({
        'bg-login': 'Padrao',
        'hero-main': 'Padrao',
        'bg-artist': 'Padrao'
    });

    const toggleUserStatus = (id: string) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'blocked' : 'active' } : u));
    };

    const handleSaveUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
            setEditingUser(null);
        }
    };

    const handleAddTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        const tx = {
            ...newTransaction,
            id: `TX${Math.floor(Math.random() * 1000)}`,
        } as FinancialTransaction;
        setTransactions([tx, ...transactions]);
        setIsFinModalOpen(false);
        setNewTransaction({ type: 'receivable', status: 'pending' });
    };

    const handlePublishPlan = (e: React.FormEvent) => {
        e.preventDefault();
        const plan = {
            ...newPlan,
            id: `P${Math.floor(Math.random() * 1000)}`,
            features: ['Acesso Total', 'Suporte Premium']
        } as SubscriptionPlan;
        setPlans([plan, ...plans]);
        setNewPlan({ target: 'artist', interval: 'month' });
    };

    const handleAssetUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSystemAssets({ ...systemAssets, [key]: file.name });
            alert(`Imagem "${file.name}" carregada com sucesso para ${key}!`);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white font-sans flex flex-col md:flex-row">
            {/* Admin Sidebar */}
            <aside className="w-full md:w-72 bg-white/5 border-r border-white/5 flex flex-col p-8 gap-12 shrink-0">
                <div onClick={() => setView('landing')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-10 h-10 rounded-xl" alt="Logo" />
                    <div>
                        <span className="text-xl font-black tracking-tighter block">ALL MUSIC</span>
                        <span className="text-[10px] font-black uppercase text-accent tracking-[0.3em]">Command Center</span>
                    </div>
                </div>

                <nav className="space-y-4">
                    {[
                        { id: 'users', label: 'Gestão de Usuários', icon: '👥' },
                        { id: 'finance', label: 'Financeiro / Fluxo', icon: '💰' },
                        { id: 'plans', label: 'Planos & Assinaturas', icon: '💎' },
                        { id: 'settings', label: 'Assets do Sistema', icon: '⚙️' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSubView(item.id as AdminSubView)}
                            className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all group ${activeSubView === item.id ? 'bg-accent text-dark font-black' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-xs uppercase tracking-widest font-bold">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <button onClick={() => setView('login')} className="w-full p-4 rounded-xl border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition-all text-center">
                        Encerrar Sessão
                    </button>
                </div>
            </aside>

            {/* Admin Main Content */}
            <main className="flex-grow p-8 md:p-12 overflow-y-auto max-h-screen">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter">
                            {activeSubView === 'users' && 'Gestão de Usuários'}
                            {activeSubView === 'finance' && 'Painel Financeiro'}
                            {activeSubView === 'plans' && 'Modelos de Assinatura'}
                            {activeSubView === 'settings' && 'Configurações de Assets'}
                        </h1>
                        <p className="text-gray-500 text-sm mt-2">Visão geral e controle total da plataforma ALL MUSIC.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-center px-8">
                            <span className="block text-[8px] uppercase tracking-widest text-gray-500 mb-1">Status Interno</span>
                            <span className="text-green-500 font-bold flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Sistemas Online
                            </span>
                        </div>
                    </div>
                </header>

                {/* Sub-view Content */}
                {activeSubView === 'users' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex gap-4 mb-8">
                            <input type="text" placeholder="Filtrar por nome, email ou ID..." className="flex-grow bg-white/5 border border-white/5 p-4 rounded-2xl outline-none focus:border-accent/40 transition-all text-sm" />
                            <select className="bg-white/5 border border-white/5 p-4 rounded-2xl outline-none text-xs font-bold uppercase tracking-widest px-6">
                                <option>Todos</option>
                                <option>Artistas</option>
                                <option>Contratantes</option>
                            </select>
                        </div>

                        <div className="glass rounded-[32px] border-white/5 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/5">
                                    <tr>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Usuário</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Email</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Tipo</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(u => (
                                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <td className="p-6 font-bold">{u.name}</td>
                                            <td className="p-6 text-gray-500 text-sm">{u.email}</td>
                                            <td className="p-6">
                                                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${u.role === 'artist' ? 'bg-accent/10 text-accent outline outline-1 outline-accent/20' : 'bg-cyan-500/10 text-cyan-500 outline outline-1 outline-cyan-500/20'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <span className={`text-[9px] font-black uppercase tracking-widest ${u.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {u.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right space-x-2">
                                                <button
                                                    onClick={() => setEditingUser(u)}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all"
                                                    title="Editar"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() => toggleUserStatus(u.id)}
                                                    className={`p-2 rounded-lg transition-all ${u.status === 'active' ? 'text-red-400 hover:bg-red-400/10' : 'text-green-400 hover:bg-green-400/10'}`}
                                                    title={u.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                                                >
                                                    {u.status === 'active' ? '🚫' : '✅'}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Excluir permanentemente ${u.name}?`)) {
                                                            setUsers(users.filter(user => user.id !== u.id));
                                                        }
                                                    }}
                                                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-all"
                                                    title="Excluir Definitivamente"
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeSubView === 'finance' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="glass p-8 rounded-[32px] border-white/5 space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">Total a Receber (vence 30d)</span>
                                <div className="text-4xl font-black italic tracking-tighter text-cyan-500">R$ 42.500,00</div>
                                <div className="text-[10px] text-green-500 font-bold uppercase">+12% vs mês anterior</div>
                            </div>
                            <div className="glass p-8 rounded-[32px] border-white/5 space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">Total a Pagar (Artistas)</span>
                                <div className="text-4xl font-black italic tracking-tighter text-accent">R$ 18.200,00</div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase">78 contratos pendentes</div>
                            </div>
                            <div className="glass p-8 rounded-[32px] border-white/5 space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block">Lucro Operacional</span>
                                <div className="text-4xl font-black italic tracking-tighter text-white">R$ 24.300,00</div>
                                <div className="text-[10px] text-accent font-bold uppercase">Retenção de 20% média</div>
                            </div>
                        </div>

                        <div className="glass rounded-[32px] border-white/5 overflow-hidden">
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                                <h3 className="text-xl font-black italic">Movimentações Recentes</h3>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setIsFinModalOpen(true)}
                                        className="text-xs font-black uppercase tracking-widest bg-accent text-dark px-6 py-2 rounded-full hover:scale-105 transition-all"
                                    >
                                        + Novo Lançamento
                                    </button>
                                    <button className="text-xs font-black uppercase tracking-widest text-gray-500">Exportar CSV</button>
                                </div>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-white/[0.02] border-b border-white/5">
                                    <tr>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">ID</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Parceiro</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Valor</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Tipo</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map(t => (
                                        <tr key={t.id} className="border-b border-white/5">
                                            <td className="p-6 text-[10px] font-mono text-gray-400">{t.id}</td>
                                            <td className="p-6 font-bold">{t.user}</td>
                                            <td className="p-6 font-black tracking-tighter">R$ {t.amount},00</td>
                                            <td className="p-6">
                                                <span className={`text-[10px] font-bold uppercase ${t.type === 'payable' ? 'text-red-400' : 'text-cyan-400'}`}>
                                                    {t.type === 'payable' ? 'Saída' : 'Entrada'}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${t.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                                    {t.status === 'paid' ? 'Concluído' : 'Pendente'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeSubView === 'plans' && (
                    <div className="space-y-12 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Create Plan Form */}
                            <form onSubmit={handlePublishPlan} className="glass p-10 rounded-[48px] border-white/5 space-y-8">
                                <h3 className="text-2xl font-black italic">Novo Modelo</h3>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nome do Plano</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="Ex: Black Label Elite"
                                            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-accent"
                                            value={newPlan.name || ''}
                                            onChange={e => setNewPlan({ ...newPlan, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Preço (R$)</label>
                                            <input
                                                required
                                                type="number"
                                                placeholder="299.90"
                                                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-accent"
                                                value={newPlan.price || ''}
                                                onChange={e => setNewPlan({ ...newPlan, price: Number(e.target.value) })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Público</label>
                                            <select
                                                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none"
                                                value={newPlan.target}
                                                onChange={e => setNewPlan({ ...newPlan, target: e.target.value as any })}
                                            >
                                                <option value="artist">Artistas</option>
                                                <option value="contractor">Contratantes</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-5 bg-white text-dark font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-all">Publicar Plano</button>
                                </div>
                            </form>

                            {/* Plans List */}
                            <div className="space-y-6">
                                {plans.map(p => (
                                    <div key={p.id} className="glass p-8 rounded-[32px] border-accent/20 flex justify-between items-center group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full"></div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${p.target === 'artist' ? 'bg-accent/10 text-accent' : 'bg-cyan-500/10 text-cyan-500'}`}>{p.target}</span>
                                                <h4 className="text-xl font-black italic">{p.name}</h4>
                                            </div>
                                            <p className="text-gray-500 text-sm">R$ {p.price} / {p.interval}</p>
                                        </div>
                                        <div className="flex gap-2 relative z-10">
                                            <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">⚙️</button>
                                            <button className="p-3 bg-red-400/10 text-red-400 rounded-xl hover:bg-red-400/20 transition-colors">🗑️</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeSubView === 'settings' && (
                    <div className="space-y-12 animate-in fade-in duration-500 max-w-4xl">
                        <div className="glass p-10 rounded-[48px] border-white/5 space-y-10">
                            <div>
                                <h3 className="text-2xl font-black italic mb-2">Imagens Globais</h3>
                                <p className="text-gray-500 text-sm">Troque as imagens principais da plataforma em tempo real.</p>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { key: 'bg-login', label: 'Background Login' },
                                    { key: 'hero-main', label: 'Hero Landing Principal' },
                                    { key: 'bg-artist', label: 'Fundo Landing Artista' },
                                ].map((img) => (
                                    <div key={img.key} className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 block mb-1">{img.label}</span>
                                            <span className="text-sm font-bold text-white/80">{systemAssets[img.key]}</span>
                                        </div>
                                        <label className="cursor-pointer px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                            Upload Imagem
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleAssetUpload(img.key, e)} />
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <button className="px-8 py-4 bg-accent text-dark font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">Salvar Todas as Alterações</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Modals Layer */}
            {editingUser && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-dark/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <form onSubmit={handleSaveUser} className="glass p-10 max-w-lg w-full border-white/10 space-y-8">
                        <h3 className="text-2xl font-black italic">Editar Usuário</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Nome Completo</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none"
                                    value={editingUser.name}
                                    onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email de Contato</label>
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none"
                                    value={editingUser.email}
                                    onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => setEditingUser(null)} className="flex-1 py-4 border border-white/10 rounded-2xl font-bold uppercase text-[10px] tracking-widest">Cancelar</button>
                            <button type="submit" className="flex-1 py-4 bg-accent text-dark rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">Salvar Alterações</button>
                        </div>
                    </form>
                </div>
            )}

            {isFinModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-dark/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <form onSubmit={handleAddTransaction} className="glass p-10 max-w-lg w-full border-white/10 space-y-8">
                        <h3 className="text-2xl font-black italic">Novo Lançamento</h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Usuário/Empresa</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none"
                                    placeholder="Nome do artista ou contratante"
                                    onChange={e => setNewTransaction({ ...newTransaction, user: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Valor (R$)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none"
                                        placeholder="0.00"
                                        onChange={e => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Natureza</label>
                                    <select
                                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none"
                                        onChange={e => setNewTransaction({ ...newTransaction, type: e.target.value as any })}
                                    >
                                        <option value="receivable">Entrada (Receber)</option>
                                        <option value="payable">Saída (Pagar)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => setIsFinModalOpen(false)} className="flex-1 py-4 border border-white/10 rounded-2xl font-bold uppercase text-[10px] tracking-widest">Cancelar</button>
                            <button type="submit" className="flex-1 py-4 bg-cyan-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">Confirmar Lançamento</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
