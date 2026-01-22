import type { Artist, MarketplaceItem } from './types';

export const ARTISTS: Artist[] = [
    {
        name: 'Jack Wild',
        track: 'Sunset Boulevard',
        genre: 'Rock / Pop',
        img: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop',
        reliability: 98,
        equipment: 'Som + Luz Inclusos',
        vibes: ['Sunset', 'High Energy', 'Rock Night'],
        packages: [
            { id: 'p1', title: 'Voz + Violão', size: 'Até 20 pessoas', price: 'R$ 800' },
            { id: 'p2', title: 'Voz + Violão', size: 'Até 50 pessoas', price: 'R$ 1.200' },
            { id: 'p3', title: 'Voz + Violão', size: 'Até 100 pessoas', price: 'R$ 2.000' },
            { id: 'p4', title: 'Banda Completa', size: 'Ideal p/ Casamentos', price: 'R$ 4.500' }
        ],
        rating: '5.0'
    },
    {
        name: 'Aurora Sky',
        track: 'Night Memories',
        genre: 'Country / Folk',
        img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=2070&auto=format&fit=crop',
        reliability: 100,
        equipment: 'Apenas Som Acústico',
        vibes: ['Cozy', 'Acoustic', 'Intimate'],
        packages: [
            { id: 'p1', title: 'Solo Acústico', size: 'Até 20 pessoas', price: 'R$ 600' },
            { id: 'p2', title: 'Duo Acústico', size: 'Até 50 pessoas', price: 'R$ 1.000' },
            { id: 'p3', title: 'Duo + Percussão', size: 'Até 100 pessoas', price: 'R$ 1.800' },
            { id: 'p4', title: 'Banda Country', size: 'Palco Principal', price: 'R$ 3.800' }
        ]
    },
    {
        name: 'The Bloom Trio',
        track: 'Blue Velvet',
        genre: 'Jazz & Soul',
        img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070&auto=format&fit=crop',
        reliability: 95,
        equipment: 'Necessita P.A. Externo',
        vibes: ['Sophisticated', 'Dinner', 'Jazz Club'],
        packages: [
            { id: 'p1', title: 'Duo Instrumental', size: 'Até 20 pessoas', price: 'R$ 1.200' },
            { id: 'p2', title: 'Trio Jazz Standart', size: 'Até 50 pessoas', price: 'R$ 2.500' },
            { id: 'p3', title: 'Trio + Cantora', size: 'Até 100 pessoas', price: 'R$ 3.500' },
            { id: 'p4', title: 'Big Band/Sexteto', size: 'Eventos Corporativos', price: 'R$ 6.000' }
        ]
    },
];

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
    { id: 1, name: 'Microfone Shure SM58', price: 'R$ 850', seller: 'Leo Folk', img: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1974&auto=format&fit=crop' },
    { id: 2, name: 'Pedal Delay Boss DD-7', price: 'R$ 1.100', seller: 'Jack Wild', img: 'https://images.unsplash.com/photo-1541689592655-f5f52827a3b4?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, name: 'Interface Focusrite 2i2', price: 'R$ 1.400', seller: 'Aurora Sky', img: 'https://images.unsplash.com/photo-1598449334855-08197771746f?q=80&w=2070&auto=format&fit=crop' }
];

export const MONTH_NAMES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
