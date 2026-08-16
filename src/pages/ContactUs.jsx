import React from 'react'

function Icon({ type }) {
  const paths = {
    person: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="M7.5 3.5 5.2 5.8c-1 1 1.7 6.7 5.8 10.8s9.8 6.8 10.8 5.8l2.3-2.3-4.3-4.3-2.5 2.1c-1.7-.8-3.4-2.2-4.8-3.7-1.5-1.5-2.8-3.1-3.7-4.8l2.1-2.5Z" />
  }

  return <span className="contact-icon"><svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg></span>
}

function ContactItem({ icon, title, children }) {
  return (
    <div className="contact-item">
      <Icon type={icon} />
      <div>
        <h2>{title}</h2>
        <div className="contact-detail">{children}</div>
      </div>
    </div>
  )
}

export default function ContactUs(){
  return (
    <section className="contact-page">
      <div className="contact-details">
        <ContactItem icon="person" title="Conference Secretariat:">
          <p>Dr. Gajanan Bhat</p>
          <p>Organizing Secretary</p>
        </ContactItem>
        <ContactItem icon="pin" title="Our Address:">
          <p>TSS Hospital, Shanthi Nagar, Chipgi,</p>
          <p>Karnataka 581402, India.</p>
        </ContactItem>
        <ContactItem icon="mail" title="Email Address:">
          <a href="mailto:kuacon2027@gmail.com">kuacon2027@gmail.com</a>
        </ContactItem>
        <ContactItem icon="phone" title="Call us:">
          <a href="tel:+919448068350">+91 9448068350</a>
        </ContactItem>
      </div>

      <div className="contact-map-wrap">
        <iframe className="contact-map" title="TSS Hospital location" src="https://www.google.com/maps?q=TSS%20Hospital%2C%20Shanthi%20Nagar%2C%20Chipgi%2C%20Karnataka%20581402&output=embed" loading="lazy" />
        <a className="map-link" href="https://maps.app.goo.gl/gyCaBR8PaptPF8WQ8" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a>
      </div>
    </section>
  )
}
