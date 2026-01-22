import type { Artist, ViewState } from '../types';

interface MiniProfileViewProps {
    artists: Artist[];
    setView: (view: ViewState) => void;
}

export const MiniProfileView: React.FC<MiniProfileViewProps> = ({ artists, setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center px-6 py-12 relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-accent/20 to-transparent"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full"></div>

            <div className="w-full max-w-sm relative z-10 space-y-10 text-center">
                {/* Header/Avatar */}
                <div className="space-y-6">
                    <div className="relative w-32 h-32 mx-auto">
                        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-20"></div>
                        <div className="relative w-full h-full rounded-full border-4 border-accent p-1 bg-dark">
                            <img src={artists[0].img} className="w-full h-full object-cover rounded-full" alt="" />
                        </div>
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-dark rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">{artists[0].name}</h1>
                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">{artists[0].genre} • DISPONÍVEL HOJE</p>
                    </div>
                </div>

                {/* Core Action */}
                <button
                    onClick={() => setView('checkout-booking')}
                    className="w-full py-6 bg-accent text-dark font-black rounded-3xl text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,191,0,0.3)] hover:scale-105 active:scale-95 transition-all"
                >
                    RESERVAR DATA AGORA
                </button>

                {/* Social Links */}
                <div className="grid grid-cols-1 gap-4">
                    {[
                        { label: 'Ouvir no Spotify', icon: '🎧', color: 'bg-[#1DB954]' },
                        { label: 'Instagram Oficial', icon: '📸', color: 'bg-white/5 border border-white/10' },
                        { label: 'Assista no YouTube', icon: '📺', color: 'bg-white/5 border border-white/10' },
                        { label: 'Rider Técnico / PDF', icon: '📄', color: 'bg-white/5 border border-white/10' }
                    ].map(link => (
                        <button key={link.label} className={`w-full py-5 rounded-2xl flex items-center justify-between px-8 group hover:scale-[1.02] transition-all ${link.color}`}>
                            <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
                            <span className="text-xl group-hover:rotate-12 transition-transform">{link.icon}</span>
                        </button>
                    ))}
                </div>

                {/* Mini Player Section */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-[32px] space-y-4">
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent">▶</div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-0.5">Preview Track</p>
                            <p className="text-xs font-bold text-white truncate">Sunset Boulevard - Original Mix</p>
                        </div>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-1/3"></div>
                    </div>
                </div>

                <footer className="pt-8 opacity-40">
                    <div onClick={() => setView('landing')} className="text-[10px] font-black tracking-tighter cursor-pointer inline-flex items-center gap-2">
                        <img src="/brand-icon.png" className="w-5 h-5 rounded" alt="" />
                        ALL MUSIC EXPERIENCE
                    </div>
                </footer>
            </div>

            {/* Floating Back Switch (Admin Only Simulation) */}
            <button
                onClick={() => setView('dashboard-artist')}
                className="fixed bottom-6 scale-90 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all"
            >
                ← Voltar ao Painel
            </button>
        </div>
    );
};
