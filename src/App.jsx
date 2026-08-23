import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import OrganizingCommittee from './pages/OrganizingCommittee'
import BrouchureConference from './pages/BrouchureConference'
import BrouchureTrade from './pages/BrouchureTrade'
import BrouchureAccomodation from './pages/BrouchureAccomodation'
import AbstartcGuidelines from './pages/AbstartcGuidelines'
import TouristPlaces from './pages/TouristPlaces'
import Accomodation from './pages/Accomodation'
import ContactUs from './pages/ContactUs'
import TermsAndCoditins from './pages/TermsAndCoditins'
import Registration from './pages/Registration'
import BrouchureTrip from './pages/BrouchureTrip'

const pages = {
  'home': Home,
  'organizing-committee': OrganizingCommittee,
  'brochure-conference': BrouchureConference,
  'brochure-trade': BrouchureTrade,
  'brochure-accomodation': BrouchureAccomodation,
  'brochure-trip': BrouchureTrip,
  'abstract-guidelines': AbstartcGuidelines,
  'tourist-places': TouristPlaces,
  'accommodation': Accomodation,
  'contact-us': ContactUs,
  'terms-and-conditions': TermsAndCoditins,
  'registration': Registration
}

export default function App(){
  const [route, setRoute] = useState('home')
  const Page = pages[route] || Home
  return (
    <div className="app-shell">
      <Header onNavigate={setRoute} />
      <main className="container">
        <Page onNavigate={setRoute} />
      </main>
      <Footer />
    </div>
  )
}
