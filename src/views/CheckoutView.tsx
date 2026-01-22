import type { ViewState } from '../types';

interface CheckoutViewProps {
    setView: (view: ViewState) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ setView }) => {
    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] opacity-50"></div>

            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* Left Column: Summary */}
                <div className="space-y-10 order-2 md:order-1">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Resumo da <br /> <span className="text-accent underline decoration-white/10">Reserva.</span></h2>
                        <p className="text-gray-500 font-medium text-sm">Você está a um passo de garantir a melhor performance musical de Minas Gerais no seu palco.</p>
                    </div>

                    <div className="glass p-8 rounded-[40px] border-white/5 space-y-8">
                        <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent">
                                <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Artist" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black italic uppercase">Jack Wild</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-accent/60">Banda Completa • 2h de Show</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-gray-500">Cache Artístico</span>
                                <span className="text-white">R$ 4.500,00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold">
                                <span className="text-gray-500">Taxa ALL MUSIC (10%)</span>
                                <span className="text-white">R$ 450,00</span>
                            </div>
                            <div className="flex justify-between items-center pt-6 border-t border-white/5">
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total Garantido</span>
                                <span className="text-3xl font-black italic text-accent">R$ 4.950,00</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">✔</div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">Seu pagamento ficará retido pela ALL MUSIC e só será liberado ao artista após o check-in do show.</p>
                    </div>
                </div>

                {/* Right Column: Payment & Form */}
                <div className="glass p-10 md:p-12 rounded-[48px] border-white/10 order-1 md:order-2">
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-6">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-600 mb-8 px-2">Informações de Contato</h4>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">E-mail para Contrato</label>
                                <input type="email" placeholder="seu@email.com" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl focus:border-accent outline-none transition-all text-sm font-bold" />
                            </div>
                        </div>

                        <div className="space-y-6 pt-4">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gray-600 mb-8 px-2">Forma de Pagamento</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-6 bg-white/5 border border-accent rounded-3xl flex flex-col items-center gap-3 transition-all">
                                    <span className="text-2xl">⚡</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Pix Oficial</span>
                                </button>
                                <button className="p-6 bg-white/5 border border-white/5 rounded-3xl flex flex-col items-center gap-3 hover:border-white/20 transition-all opacity-40 grayscale">
                                    <span className="text-2xl">💳</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest">Cartão (Breve)</span>
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setView('dashboard-contractor')}
                            className="w-full py-6 bg-accent text-dark font-black rounded-3xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-[0.3em]"
                        >
                            Confirmar & Gerar Pix
                        </button>

                        <button
                            onClick={() => setView('profile-artist')}
                            className="w-full py-4 text-[9px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
                        >
                            ← Alterar Reserva
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
