import React from 'react'

export default function BrouchureTrade(){
  return (
    <section className="document-page">
      <div className="document-heading">
        <div>
          <p className="eyebrow">KUACON 2027</p>
          <h1>Trade Brochure</h1>
          <p>View the official KUACON 2027 trade appeal and partnership information.</p>
        </div>
        <a className="pill-btn" href="/trade-brochure.pdf" download>Download PDF</a>
      </div>
      <iframe className="pdf-viewer" title="KUACON 2027 Trade Brochure" src="/trade-brochure.pdf" />
    </section>
  )
}
