import type { ViewState } from '../types';

interface RegisterArtistViewProps {
    setView: (view: ViewState) => void;
}

export const RegisterArtistView: React.FC<RegisterArtistViewProps> = ({ setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center justify-center px-6 relative overflow-hidden selection:bg-accent selection:text-dark">
            {/* Cinematic Background - Music Focused */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 animate-slow-zoom"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/20 to-dark"></div>
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <nav className="p-6 md:px-12 flex justify-between items-center absolute top-0 w-full z-20">
                <div onClick={() => setView('role-selection')} className="flex items-center gap-3 cursor-pointer group">
                    <img src="/brand-icon.png" className="w-8 h-8 rounded group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,251,0,0.3)]" alt="Logo" />
                    <span className="text-2xl font-black tracking-tighter uppercase">ALL MUSIC</span>
                </div>
                <button onClick={() => setView('role-selection')} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">← Voltar</button>
            </nav>

            <div className="max-w-md w-full glass p-10 md:p-12 border-accent/20 relative z-10 mt-12">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black mb-2 text-white italic">Inicie sua <span className="text-accent underline decoration-white/20">Genesis</span>.</h2>
                    <p className="text-gray-500 text-sm">Preencha os dados oficiais para pleitear sua vaga na elite mineira.</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2 col-span-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Nome Artístico</label>
                        <input type="text" placeholder="Ex: Jack Wild" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                    </div>
                    <div className="space-y-2 col-span-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">WhatsApp Oficial</label>
                        <input type="tel" placeholder="(31) 98888-8888" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Pitch / Bio Curta (150 caracteres)</label>
                        <textarea placeholder="Sua frase de impacto para convencer o contratante..." className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm h-20 resize-none"></textarea>
                    </div>

                    <div className="space-y-2 col-span-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Gênero Principal</label>
                        <select className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all text-gray-400 font-bold text-sm">
                            <option>Selecione seu estilo</option>
                            <option>Rock / Pop</option>
                            <option>Sertanejo / Country</option>
                            <option>Samba / Pagode</option>
                            <option>Jazz / Blues</option>
                        </select>
                    </div>
                    <div className="space-y-2 col-span-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Link de Vídeo (YouTube)</label>
                        <input type="url" placeholder="https://youtube.com/..." className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-accent ml-1">Rider Técnico (Equipamentos Necessários)</label>
                        <textarea placeholder="Ex: 2 canais XLR para mesa, 1 tomada 220v, espaço de 3x2m..." className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-accent focus:bg-white/10 outline-none transition-all placeholder:text-gray-700 text-sm h-24 resize-none"></textarea>
                    </div>

                    <div className="pt-4 md:col-span-2">
                        <button
                            onClick={() => setView('dashboard-artist')}
                            type="button"
                            className="w-full py-5 bg-accent hover:bg-accent-dark text-dark font-black rounded-2xl shadow-xl shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 text-xs uppercase tracking-widest"
                        >
                            CRIAR PERFIL ARTÍSTICO
                        </button>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-500">Já tem uma conta? <button onClick={() => setView('login')} className="text-accent font-bold hover:underline">Entrar</button></p>
                        </div>
                        <p className="text-[10px] text-center text-gray-600 mt-6 uppercase font-bold tracking-tighter">
                            Ao se inscrever, você aceita nossos termos de uso premium.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
