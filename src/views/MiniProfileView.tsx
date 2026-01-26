import { useState } from 'react';
import type { Artist, ViewState } from '../types';

interface MiniProfileViewProps {
    artists: Artist[];
    setView: (view: ViewState) => void;
    blockedDates: Record<string, 'external' | 'vacation' | 'show'>;
}

export const MiniProfileView: React.FC<MiniProfileViewProps> = ({ artists, setView, blockedDates }) => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const today = new Date();
    const dStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const isBusyToday = blockedDates[dStr];

    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col items-center px-6 py-12 relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-accent/20 to-transparent"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full"></div>

            <div className="w-full max-w-sm relative z-10 space-y-10 text-center">
                {/* Header/Avatar */}
                <div className="space-y-6">
                    <div className="relative w-32 h-32 mx-auto translate-y-0 hover:-translate-y-2 transition-transform duration-500 group">
                        <div className={`absolute inset-0 ${isBusyToday ? 'bg-red-500' : 'bg-accent'} rounded-full animate-ping opacity-20`}></div>
                        <div className={`relative w-full h-full rounded-full border-4 ${isBusyToday ? 'border-red-500' : 'border-accent'} p-1 bg-dark shadow-[0_0_50px_rgba(255,191,0,0.2)]`}>
                            <img src={artists[0].img} className="w-full h-full object-cover rounded-full" alt="" />
                        </div>
                        <div className={`absolute bottom-1 right-1 w-6 h-6 ${isBusyToday ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]'} border-4 border-dark rounded-full`}></div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">{artists[0].name}</h1>
                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${isBusyToday ? 'text-red-500' : 'text-accent'}`}>
                            {artists[0].genre} • {isBusyToday ? 'OCUPADO HOJE' : 'DISPONÍVEL HOJE'}
                        </p>
                        {artists[0].bio && (
                            <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-[280px] mx-auto italic">
                                "{artists[0].bio.substring(0, 120)}{artists[0].bio.length > 120 ? '...' : ''}"
                            </p>
                        )}
                    </div>
                </div>

                {/* Core Action */}
                <button
                    onClick={() => setView('checkout-booking')}
                    className={`w-full py-6 ${isBusyToday ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-accent text-dark shadow-[0_20px_40px_rgba(255,191,0,0.3)] hover:scale-105'} font-black rounded-3xl text-sm uppercase tracking-[0.2em] active:scale-95 transition-all`}
                    disabled={!!isBusyToday}
                >
                    {isBusyToday ? 'AGENDA FECHADA' : 'RESERVAR DATA AGORA'}
                </button>

                {/* Agenda de Shows Section */}
                <div className="glass p-8 rounded-[40px] border-white/5 space-y-6 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl"></div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        Próximas Datas
                    </h3>

                    <div className="space-y-4">
                        {Object.keys(blockedDates)
                            .filter(d => blockedDates[d] === 'show' || blockedDates[d] === 'external')
                            .sort()
                            .slice(0, 3)
                            .map(d => {
                                const dateObj = new Date(d);
                                return (
                                    <div key={d} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/5 group-hover:border-accent/40 transition-colors">
                                            <span className="text-sm font-black italic">{dateObj.getDate() + 1}</span>
                                            <span className="text-[8px] font-black text-accent uppercase">FEV</span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-[11px] font-black text-white uppercase tracking-tighter">Show Confirmado</p>
                                            <p className="text-[9px] font-medium text-gray-500 italic">Belo Horizonte, MG</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black text-accent/60">SOLD OUT</span>
                                        </div>
                                    </div>
                                );
                            })}
                        {Object.keys(blockedDates).filter(d => blockedDates[d] === 'show' || blockedDates[d] === 'external').length === 0 && (
                            <p className="text-xs font-medium text-gray-600 italic">Nenhuma data ocupada por enquanto.</p>
                        )}
                    </div>
                </div>

                {/* Video Showcase Section */}
                {artists[0].videos && artists[0].videos.length > 0 && (
                    <div className="glass p-8 rounded-[40px] border-white/5 space-y-6 text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            Vídeos em Destaque
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {artists[0].videos.slice(0, 2).map((videoUrl, idx) => {
                                const videoId = videoUrl.includes('v=') ? videoUrl.split('v=')[1]?.split('&')[0] : videoUrl.split('/').pop()?.split('?')[0];
                                const thumbUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedVideo(videoUrl)}
                                        className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 cursor-pointer group"
                                    >
                                        <img src={thumbUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="w-10 h-10 bg-accent text-dark rounded-full flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Social Links */}
                <div className="grid grid-cols-1 gap-4">
                    {[
                        { label: 'Ouvir no Spotify', icon: '🎧', color: 'bg-[#1DB954] shadow-[0_10px_20px_rgba(29,185,84,0.2)]' },
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

                <footer className="pt-8 opacity-40">
                    <div onClick={() => setView('landing')} className="text-[10px] font-black tracking-tighter cursor-pointer inline-flex items-center gap-2 hover:opacity-100 transition-opacity">
                        <img src="/brand-icon.png" className="w-5 h-5 rounded hover:rotate-12 transition-transform" alt="" />
                        ALL MUSIC EXPERIENCE
                    </div>
                </footer>
            </div>

            {/* Floating Back Switch */}
            <button
                onClick={() => setView('dashboard-artist')}
                className="fixed bottom-6 scale-90 px-8 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:border-accent/40 shadow-2xl transition-all z-20"
            >
                ← Voltar ao Painel
            </button>

            {/* Video Lightbox Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div onClick={() => setSelectedVideo(null)} className="absolute inset-0 bg-dark/95 backdrop-blur-3xl"></div>
                    <div className="relative w-full max-w-lg aspect-video rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,191,0,0.2)] animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center z-20 backdrop-blur-md transition-colors"
                        >
                            ✕
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={selectedVideo.replace('watch?v=', 'embed/') + '?autoplay=1'}
                            title="Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};
