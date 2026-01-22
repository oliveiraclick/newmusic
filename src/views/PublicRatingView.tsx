import type { Artist, ViewState } from '../types';

interface PublicRatingViewProps {
    artists: Artist[];
    setView: (view: ViewState) => void;
}

export const PublicRatingView: React.FC<PublicRatingViewProps> = ({ artists, setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center p-6 pb-20 overflow-hidden relative">
            {/* Abstract Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] bg-accent/20 blur-[120px] rounded-full rotate-12"></div>
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-dark via-dark/40 to-transparent"></div>

            <nav className="relative z-10 w-full flex justify-center py-8">
                <div className="flex flex-col items-center gap-2">
                    <img src="/brand-icon.png" className="w-8 h-8 rounded-lg shadow-lg shadow-accent/20" alt="Logo" />
                    <div className="text-2xl font-black tracking-tighter uppercase">ALL MUSIC</div>
                </div>
            </nav>

            <main className="relative z-10 w-full max-w-sm space-y-12 mt-10">
                <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-accent to-white overflow-hidden shadow-2xl">
                        <img src={artists[0].img} className="w-full h-full object-cover rounded-full" alt="Artist" />
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Tocando Agora</span>
                        <h1 className="text-4xl font-black italic tracking-tighter">{artists[0].name}</h1>
                        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">{artists[0].genre} • @ {artists[0].track}</p>
                    </div>
                </div>

                <div className="glass p-8 rounded-[40px] border-white/5 space-y-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>

                    <div className="text-center space-y-6 relative z-10">
                        <h2 className="text-xl font-black italic">O que achou do show?</h2>
                        <div className="flex justify-center gap-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:text-dark hover:scale-110 transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 1L9 9H1L8 14L5 22L12 17L19 22L16 14L23 9H15L12 1Z" /></svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <textarea
                            placeholder="Deixe um elogio ou peça sua música favorita..."
                            className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl h-32 outline-none focus:border-accent/40 transition-all font-medium text-sm placeholder:text-gray-700"
                        ></textarea>
                        <button
                            onClick={() => setView('dashboard-contractor')}
                            className="w-full py-5 bg-white text-dark font-black rounded-[24px] shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-[0.2em]"
                        >
                            Enviar Avaliação
                        </button>
                    </div>
                </div>

                <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-gray-700">
                    Powered by ALL MUSIC Experience
                </p>
            </main>

            <button
                onClick={() => setView('dashboard-contractor')}
                className="fixed bottom-8 px-8 py-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
                ← Voltar ao Dashboard
            </button>
        </div>
    );
};
