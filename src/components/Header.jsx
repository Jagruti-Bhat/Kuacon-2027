import React, { useState } from 'react'

export default function Header({ onNavigate }){
  return (
    <>
      <div className="topbar">
        <div className="container">
          <div>kuacon2027@gmail.com</div>
          <div>+91 9448068350</div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-content">
          <a className="brand" href="#" onClick={(e)=>{e.preventDefault();onNavigate('home')}}>KUACON 2027</a>
          <nav className="main-nav">
            <a href="#" onClick={(e)=>{e.preventDefault();onNavigate('organizing-committee')}}>Committee</a>
            <Dropdown />
            <a href="#" onClick={(e)=>{e.preventDefault();onNavigate('abstract-guidelines')}}>Abstracts</a>
            <a href="#" onClick={(e)=>{e.preventDefault();onNavigate('tourist-places')}}>Tourist Places</a>
            <a href="#" onClick={(e)=>{e.preventDefault();onNavigate('accommodation')}}>Accommodation</a>
            <a href="#" onClick={(e)=>{e.preventDefault();onNavigate('contact-us')}}>Contact</a>
            <a href="/terms-and-conditions.pdf" target="_blank" rel="noopener">Terms &amp; Conditions</a>
          </nav>
          <div className="nav-right">
            <button className="pill-btn" onClick={()=>onNavigate('registration')}>Register Now</button>
          </div>
        </div>
      </header>
    </>
  )
}

function Dropdown(){
  const [open, setOpen] = useState(false)
  return (
    <div className="dropdown" style={{position:'relative'}} onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <a href="#" onClick={(e)=>{e.preventDefault(); setOpen(o=>!o)}}>Brochure ▾</a>
      <div className="dropdown-menu" style={{position:'absolute',top:'28px',left:0,background:'#fff',boxShadow:'0 4px 12px rgba(0,0,0,.08)',padding:8,borderRadius:6,display: open ? 'block' : 'none',minWidth:180}}>
        <a href="/conference-brochure.pdf" target="_blank" rel="noopener">Conference Brochure</a>
        <a href="/trade-brochure.pdf" target="_blank" rel="noopener">Trade Brochure</a>
        <a href="/accommodation-brochure.pdf" target="_blank" rel="noopener">Accommodation Brochure</a>
        <a href="/trip-brochure.pdf" target="_blank" rel="noopener">Trip Brochure</a>
      </div>
    </div>
  )
}
