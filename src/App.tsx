import { useState } from 'react'
import type { ViewState, ContractorSubView, ArtistSubView } from './types'
import { ARTISTS, MARKETPLACE_ITEMS, MONTH_NAMES } from './constants'
import { LandingView } from './views/LandingView'
import { LoginView } from './views/LoginView'
import { LandingArtistView } from './views/LandingArtistView'
import { LandingContractorView } from './views/LandingContractorView'
import { RoleSelectionView } from './views/RoleSelectionView'
import { RegisterArtistView } from './views/RegisterArtistView'
import { RegisterContractorView } from './views/RegisterContractorView'
import { ArtistProfileView } from './views/ArtistProfileView'
import { MiniProfileView } from './views/MiniProfileView'
import { CheckoutView } from './views/CheckoutView'
import { PublicRatingView } from './views/PublicRatingView'
import { DashboardArtistView } from './views/DashboardArtistView'
import { DashboardContractorView } from './views/DashboardContractorView'
import { FeaturesView } from './views/FeaturesView'
import { HowItWorksView } from './views/HowItWorksView'
import { DashboardAdminView } from './views/DashboardAdminView'
import { PricingView } from './views/PricingView'

function App() {
  const [view, setView] = useState<ViewState>('landing')
  const [contractorSubView, setContractorSubView] = useState<ContractorSubView>('search')
  const [artistSubView, setArtistSubView] = useState<ArtistSubView>('overview')

  const [currentArtistIndex, setCurrentArtistIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  // Advanced Agenda States
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 1, 1)) // Fevereiro 2026
  const [blockedDates, setBlockedDates] = useState<Record<string, 'external' | 'vacation' | 'show'>>({
    '2026-02-25': 'show',
    '2026-02-28': 'show',
    '2026-02-14': 'vacation',
    '2026-02-15': 'vacation',
    '2026-02-20': 'external'
  })
  const [financialRecords, setFinancialRecords] = useState<Record<string, number>>({
    '2026-02-25': 4500,
    '2026-02-28': 1200,
    '2026-02-20': 2000
  })

  // Agenda Modal States
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false)
  const [selectedAgendaDate, setSelectedAgendaDate] = useState<string | null>(null)
  const [agendaModalStep, setAgendaModalStep] = useState<'options' | 'cache_input'>('options')
  const [externalCacheValue, setExternalCacheValue] = useState('')
  const [externalContractorName, setExternalContractorName] = useState('')
  const [bookingDetails, setBookingDetails] = useState<Record<string, { contractor: string, time: string }>>({
    '2026-02-25': { contractor: 'Pub Intergalactic', time: '21:00' },
    '2026-02-28': { contractor: 'Sunset Rooftop', time: '18:30' }
  })
  const [marketplaceItems] = useState(MARKETPLACE_ITEMS)

  // Checkout flow inputs
  const [checkoutDate, setCheckoutDate] = useState('2026-03-15')
  const [checkoutTime, setCheckoutTime] = useState('20:00')

  const monthNames = MONTH_NAMES
  const artists = ARTISTS

  const nextArtist = () => setCurrentArtistIndex((prev) => (prev + 1) % artists.length)
  const prevArtist = () => setCurrentArtistIndex((prev) => (prev - 1 + artists.length) % artists.length)

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return
    const touchEnd = e.changedTouches[0].clientX
    if (touchStart - touchEnd > 70) nextArtist()
    if (touchStart - touchEnd < -70) prevArtist()
    setTouchStart(null)
  }

  if (view === 'landing') {
    return (
      <LandingView
        setView={setView}
        artists={artists}
        currentArtistIndex={currentArtistIndex}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
        prevArtist={prevArtist}
        nextArtist={nextArtist}
      />
    )
  }

  if (view === 'landing-artist') {
    return <LandingArtistView setView={setView} />
  }

  if (view === 'landing-contractor') {
    return <LandingContractorView setView={setView} />
  }

  if (view === 'role-selection') {
    return <RoleSelectionView setView={setView} />
  }

  if (view === 'register-artist') {
    return <RegisterArtistView setView={setView} />
  }

  if (view === 'register-contractor') {
    return <RegisterContractorView setView={setView} />
  }

  if (view === 'login') {
    return <LoginView setView={setView} />
  }

  if (view === 'profile-artist') {
    return <ArtistProfileView artists={artists} setView={setView} />
  }

  if (view === 'mini-profile') {
    return <MiniProfileView artists={artists} setView={setView} />
  }

  if (view === 'dashboard-contractor') {
    return (
      <DashboardContractorView
        artists={artists}
        setView={setView}
        contractorSubView={contractorSubView}
        setContractorSubView={setContractorSubView}
      />
    )
  }

  if (view === 'dashboard-artist') {
    return (
      <DashboardArtistView
        artists={artists}
        setView={setView}
        artistSubView={artistSubView}
        setArtistSubView={setArtistSubView}
        calendarDate={calendarDate}
        setCalendarDate={setCalendarDate}
        blockedDates={blockedDates}
        financialRecords={financialRecords}
        monthNames={monthNames}
        setIsAgendaModalOpen={setIsAgendaModalOpen}
        setSelectedAgendaDate={setSelectedAgendaDate}
        setAgendaModalStep={setAgendaModalStep}
        marketplaceItems={marketplaceItems}
      />
    )
  }

  if (view === 'checkout-booking') {
    return <CheckoutView setView={setView} />
  }

  if (view === 'public-rating') {
    return <PublicRatingView artists={artists} setView={setView} />
  }

  if (view === 'features') {
    return <FeaturesView setView={setView} />
  }

  if (view === 'how-it-works') {
    return <HowItWorksView setView={setView} />
  }

  if (view === 'dashboard-admin') {
    return <DashboardAdminView setView={setView} />
  }

  if (view === 'pricing') {
    return <PricingView setView={setView} />
  }

  return null
}

export default App
