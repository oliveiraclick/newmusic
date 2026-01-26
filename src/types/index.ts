export type ViewState =
    | 'landing'
    | 'login'
    | 'register-artist'
    | 'register-contractor'
    | 'landing-artist'
    | 'landing-contractor'
    | 'profile-artist'
    | 'dashboard-contractor'
    | 'public-rating'
    | 'dashboard-artist'
    | 'mini-profile'
    | 'checkout-booking'
    | 'role-selection'
    | 'features'
    | 'how-it-works'
    | 'dashboard-admin'
    | 'pricing';

export type AdminSubView = 'users' | 'finance' | 'plans' | 'settings';

export interface PlatformUser {
    id: string;
    name: string;
    email: string;
    role: 'artist' | 'contractor';
    status: 'active' | 'blocked' | 'pending';
    joinedAt: string;
}

export interface FinancialTransaction {
    id: string;
    user: string;
    amount: number;
    type: 'payable' | 'receivable';
    dueDate: string;
    status: 'pending' | 'paid' | 'overdue';
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    interval: 'month' | 'year';
    target: 'artist' | 'contractor';
    features: string[];
}

export type ContractorSubView = 'search' | 'bookings' | 'payments' | 'contracts' | 'venue';
export type ArtistSubView = 'overview' | 'agenda' | 'marketplace' | 'stats' | 'config' | 'schedule' | 'finance' | 'packages' | 'shop';

export interface Package {
    id: string;
    title: string;
    size: string;
    price: string;
}

export interface Artist {
    name: string;
    track: string;
    genre: string;
    img: string;
    reliability: number;
    equipment: string;
    vibes: string[];
    packages: Package[];
    rating?: string;
    bio?: string;
    videos?: string[];
}

export interface MarketplaceItem {
    id: number;
    name: string;
    price: string;
    seller: string;
    img: string;
}
