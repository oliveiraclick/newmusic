import type { ViewState } from '../types';

interface RoleSelectionViewProps {
    setView: (view: ViewState) => void;
}

export const RoleSelectionView: React.FC<RoleSelectionViewProps> = ({ setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/60 to-dark"></div>

            <nav className="p-8 md:px-12 flex justify-between items-center absolute top-0 w-full z-20">
                <div onClick={() => setView('landing')} className="flex items-center gap-4 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-10 h-10 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                    <span className="text-2xl font-black tracking-tighter uppercase">ALL MUSIC</span>
                </div>
                <button onClick={() => setView('landing')} className="text-sm font-bold text-gray-500 hover:text-white transition-colors">Voltar</button>
            </nav>

            <div className="relative z-10 w-full max-w-5xl space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Como você quer <br /> <span className="text-accent underline decoration-white/10">começar?</span></h1>
                    <p className="text-gray-400 text-lg font-medium">Escolha o seu perfil para acessar ferramentas exclusivas.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                        onClick={() => setView('register-artist')}
                        className="group relative glass p-10 rounded-[48px] border-accent/10 hover:border-accent/40 transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center space-y-6"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-20 h-20 bg-accent/20 rounded-3xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">🎸</div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black italic uppercase">Sou Artista</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Divulgue seu trabalho, gerencie sua agenda e receba pagamentos garantidos.</p>
                        </div>
                        <button className="px-8 py-4 bg-accent text-dark font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-accent/20 group-hover:translate-y-[-4px] transition-all">
                            CRIAR PERFIL ARTÍSTICO
                        </button>
                    </div>

                    <div
                        onClick={() => setView('register-contractor')}
                        className="group relative glass p-10 rounded-[48px] border-cyan-500/10 hover:border-cyan-500/40 transition-all cursor-pointer overflow-hidden flex flex-col items-center text-center space-y-6"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-20 h-20 bg-cyan-500/20 rounded-3xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">🏢</div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black italic uppercase">Sou Contratante</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Busque talentos, faça reservas seguras e profissionalize seu entretenimento.</p>
                        </div>
                        <button className="px-8 py-4 bg-cyan-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-cyan-500/20 group-hover:translate-y-[-4px] transition-all">
                            CRIAR CONTA BUSINESS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
