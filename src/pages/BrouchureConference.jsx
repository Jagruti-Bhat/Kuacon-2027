import React from 'react'

export default function BrouchureConference(){
  return (
    <section className="document-page">
      <div className="document-heading">
        <div>
          <p className="eyebrow">KUACON 2027</p>
          <h1>Conference Brochure</h1>
          <p>Read the official KUACON 2027 conference brochure.</p>
        </div>
        <a className="pill-btn" href="/conference-brochure.pdf" download>Download PDF</a>
      </div>
      <iframe className="pdf-viewer" title="KUACON 2027 Conference Brochure" src="/conference-brochure.pdf" />
    </section>
  )
}
