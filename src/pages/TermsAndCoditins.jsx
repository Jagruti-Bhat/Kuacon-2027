import React from 'react'

export default function TermsAndCoditins(){
  return (
    <section className="document-page">
      <div className="document-heading">
        <div>
          <p className="eyebrow">KUACON 2027</p>
          <h1>Terms &amp; Conditions</h1>
          <p>Please review the official terms and conditions before registering.</p>
        </div>
        <a className="pill-btn" href="/terms-and-conditions.pdf" download>Download PDF</a>
      </div>
      <iframe className="pdf-viewer" title="KUACON 2027 Terms and Conditions" src="/terms-and-conditions.pdf" />
    </section>
  )
}
