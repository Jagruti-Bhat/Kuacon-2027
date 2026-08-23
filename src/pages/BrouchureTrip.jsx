import React from 'react'

export default function BrouchureTrip(){
  return (
    <section className="document-page">
      <div className="document-heading">
        <div>
          <p className="eyebrow">KUACON 2027</p>
          <h1>Trip Brochure</h1>
          <p>Read the trip plan brochure.</p>
        </div>
        <a className="pill-btn" href="/trip-brochure.pdf" download>Download PDF</a>
      </div>
      <iframe className="pdf-viewer" title="Places around Sirsi" src="/trip-brochure.pdf" />
    </section>
  )
}
