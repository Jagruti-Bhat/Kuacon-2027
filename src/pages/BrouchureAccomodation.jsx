import React from 'react'

export default function BrouchureAccomodation(){
  return (
    <section className="document-page">
      <div className="document-heading">
        <div>
          <p className="eyebrow">KUACON 2027</p>
          <h1>Accommodation Brochure</h1>
          <p>Explore the official accommodation information for KUACON 2027.</p>
        </div>
        <a className="pill-btn" href="/accommodation-brochure.pdf" download>Download PDF</a>
      </div>
      <iframe className="pdf-viewer" title="KUACON 2027 Accommodation Brochure" src="/accommodation-brochure.pdf" />
    </section>
  )
}
