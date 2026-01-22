import type { ViewState } from '../types';

interface RegisterContractorViewProps {
    setView: (view: ViewState) => void;
}

export const RegisterContractorView: React.FC<RegisterContractorViewProps> = ({ setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col selection:bg-cyan-500 selection:text-white">
            <nav className="p-6 md:px-12 flex justify-between items-center absolute top-0 w-full z-10">
                <div onClick={() => setView('role-selection')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-8 h-8 rounded group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                    <span className="text-2xl font-black tracking-tighter">ALL MUSIC</span>
                </div>
                <button onClick={() => setView('role-selection')} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">← Voltar</button>
            </nav>

            <div className="flex-grow flex items-center justify-center px-6 py-20 relative overflow-hidden">
                {/* Cinematic Background - Music Business Focused */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 scale-110 animate-slow-zoom"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-dark/95 via-transparent to-dark"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full"></div>

                <div className="max-w-md w-full glass p-10 md:p-12 border-cyan-500/20 relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black mb-2 text-white">Novo <span className="text-cyan-500">Contratante</span></h2>
                        <p className="text-gray-500 text-sm">Acesse a melhor inteligência musical de Minas Gerais.</p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2 col-span-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">Nome do Responsável</label>
                            <input type="text" placeholder="Nome completo" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                        </div>
                        <div className="space-y-2 col-span-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">Documento (CPF/RG)</label>
                            <input type="text" placeholder="000.000.000-00" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">Nome do Estabelecimento</label>
                            <input type="text" placeholder="Ex: Choperia Central" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                        </div>
                        <div className="space-y-2 col-span-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">CNPJ</label>
                            <input type="text" placeholder="00.000.000/0001-00" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                        </div>
                        <div className="space-y-2 col-span-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">WhatsApp</label>
                            <input type="tel" placeholder="(31) 97777-7777" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">E-mail Corporativo</label>
                            <input type="email" placeholder="contato@empresa.com.br" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 ml-1">Endereço Completo</label>
                            <input type="text" placeholder="Rua, número, bairro, cidade" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                        </div>
                        <div className="pt-4 md:col-span-2">
                            <button
                                onClick={() => setView('dashboard-contractor')}
                                type="button"
                                className="w-full py-5 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-2xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-widest"
                            >
                                CRIAR CONTA BUSINESS
                            </button>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-500">Já tem uma conta? <button onClick={() => setView('login')} className="text-cyan-500 font-bold hover:underline">Entrar</button></p>
                            </div>
                            <p className="text-[10px] text-center text-gray-600 mt-6 uppercase font-bold tracking-tighter">
                                Garantia de segurança e backup ALL MUSIC inclusos.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
