import type { ViewState } from '../types';

interface LoginViewProps {
    setView: (view: ViewState) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Cinematic Background for Login - Music Focus */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 animate-slow-zoom"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/20 to-dark"></div>
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="absolute inset-0 bg-gradient-to-b from-dark via-transparent to-dark"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>

            <div className="relative z-10 w-full max-w-md space-y-8 flex flex-col items-center">
                <div className="flex flex-col items-center gap-4 mb-4">
                    <img src="/brand-icon.png" className="w-20 h-20 rounded-2xl shadow-[0_0_40px_rgba(255,251,0,0.3)] cursor-pointer hover:rotate-6 transition-all" onClick={() => setView('landing')} alt="Logo" />
                    <img src="/brand-logo-white.png" className="h-8 cursor-pointer hover:scale-105 transition-transform opacity-90" onClick={() => setView('landing')} alt="ALL MUSIC" />
                </div>

                <div className="w-full glass p-10 md:p-12 border-white/5 text-center">
                    <h2 className="text-3xl font-black mb-8 text-white">Bem-vindo de volta.</h2>

                    <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email Cadastrado</label>
                            <input type="email" placeholder="seu@email.com" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-primary focus:bg-white/10 outline-none transition-all placeholder:text-gray-700" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sua Senha</label>
                                <a href="#" className="text-[9px] font-bold text-primary uppercase">Esqueci a senha</a>
                            </div>
                            <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-primary focus:bg-white/10 outline-none transition-all placeholder:text-gray-700" />
                        </div>

                        <div className="pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setView('dashboard-contractor')}
                                    type="button"
                                    className="group relative py-5 bg-white text-dark font-black rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl text-center"
                                >
                                    <span className="relative z-10 text-[10px] uppercase font-black tracking-widest">Contratante</span>
                                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                                <button
                                    onClick={() => setView('dashboard-artist')}
                                    type="button"
                                    className="group relative py-5 bg-accent text-dark font-black rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl text-center"
                                >
                                    <span className="relative z-10 text-[10px] uppercase font-black tracking-widest">Sou Artista</span>
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4 text-center">
                                <p className="text-sm text-gray-500 font-medium tracking-tight">Novo por aqui? Viva a experiência ALL MUSIC.</p>
                                <div className="flex flex-col gap-4">
                                    <button
                                        onClick={() => setView('role-selection')}
                                        className="w-full py-5 bg-gradient-to-r from-accent to-accent-dark text-dark font-black rounded-2xl shadow-xl shadow-accent/10 hover:scale-[1.02] transition-all text-xs uppercase tracking-[0.2em]"
                                    >
                                        Criar Minha Conta Grátis
                                    </button>
                                    <button onClick={() => setView('profile-artist')} className="w-full py-4 text-[10px] font-black uppercase tracking-widest border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                                        Demo: Perfil Black Label
                                    </button>
                                    <button onClick={() => setView('dashboard-admin')} className="w-full py-4 text-[10px] font-black uppercase tracking-widest border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-accent hover:text-dark transition-all flex items-center justify-center gap-3">
                                        Acesso Master (Admin)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <button onClick={() => setView('landing')} className="mt-8 text-sm font-bold text-gray-500 hover:text-white transition-colors py-4">← Voltar para a Home</button>
            </div>
        </div>
    );
};
