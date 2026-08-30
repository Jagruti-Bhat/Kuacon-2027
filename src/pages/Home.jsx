import React from 'react'
import Countdown from '../components/Countdown'

export default function Home({ onNavigate }) {
    // Conference begins on 6 November 2027 (India Standard Time).
    const start = '2027-11-06T00:00:00+05:30'

    const registrationTables = [
        {
            title: 'Super Early Bird',
            period: 'Till end of KUACON 2026',
            prices: {
                'KUA Members': 5500,
                'Non-KUA Members': 6500,
                'Post Graduates': 4500,
                'Accompanying Person': 4500,
                'Trade Delegate': 11000,
                'International Delegate': { amount: 120, currency: 'USD' },
            },
        },
        {
            title: 'Early Bird',
            period: 'Till 15th May 2027',
            prices: {
                'KUA Members': 6500,
                'Non-KUA Members': 7500,
                'Post Graduates': 5000,
                'Accompanying Person': 5000,
                'Trade Delegate': 11000,
                'International Delegate': { amount: 130, currency: 'USD' },
            },
        },
        {
            title: 'Regular Registration',
            period: '16th May 2027 to 15th August 2027',
            prices: {
                'KUA Members': 7500,
                'Non-KUA Members': 8500,
                'Post Graduates': 6000,
                'Accompanying Person': 6000,
                'Trade Delegate': 11000,
                'International Delegate': { amount: 150, currency: 'USD' },
            },
        },
        {
            title: 'Late Registration',
            period: '16th August 2027 to 15th October 2027',
            prices: {
                'KUA Members': 8500,
                'Non-KUA Members': 9500,
                'Post Graduates': 7000,
                'Accompanying Person': 7000,
                'Trade Delegate': 11000,
                'International Delegate': { amount: 180, currency: 'USD' },
            },
        },
        {
            title: 'Spot Registration',
            period: '16th October 2027 onwards',
            prices: {
                'KUA Members': 10000,
                'Non-KUA Members': 11000,
                'Post Graduates': 8000,
                'Accompanying Person': 8000,
                'Trade Delegate': 11000,
                'International Delegate': { amount: 200, currency: 'USD' },
            },
        },
    ]

    return (
        <section className="home-page">

            {/* HERO */}
            <div className="hero">
                <div className="hero-content">
                    <div className="kicker">Karnataka Urology Association</div>

                    <h1>KUACON 2027</h1>

                    <p className="lead">
                        32nd Annual Conference of the Karnataka Urology Association
                    </p>

                    <p className="meta">
                        5–7 November 2027 · Omkar Jungle Resort & Spa, Sirsi
                    </p>

                    <div className="hero-cta">
                        <button
                            className="pill-btn"
                            onClick={() => onNavigate?.('registration')}
                        >
                            Register Now
                        </button>
                    </div>

                    <div className="countdown-title">
                        Countdown to KUACON 2027
                    </div>

                    <Countdown targetDate={start} />
                </div>
            </div>

            {/* WELCOME */}
            <article className="welcome-card">
                <p className="welcome-kicker">
                    Welcome to KUACON 2027
                </p>

                <h2>Dear Esteemed Friends &amp; Colleagues,</h2>

                <div className="welcome-copy">
                    <p>
                        It gives us immense joy to extend a heartfelt invitation to the
                        32nd Annual Conference of the Karnataka Urology Association –
                        KUACON 2027, to be held in the beautiful city of Sirsi, Karnataka,
                        for the first time.
                    </p>

                    <p>
                        This year’s conference promises to be an inspiring gathering of
                        urology professionals, featuring cutting-edge scientific talks,
                        insightful lectures, interactive sessions, and the latest
                        advancements in urological surgeries and clinical practice.
                    </p>

                    <p>
                        Our host city, Sirsi, is known for its lush greenery, rich
                        cultural heritage, spiritual traditions, and warm hospitality.
                        Nestled in the Western Ghats, Sirsi offers a refreshing and serene
                        setting for academic exchange, professional networking, and
                        fellowship.
                    </p>

                    <p>
                        During your visit, we encourage you to explore the region’s
                        remarkable attractions, including the Marikamba Temple, Sahasralinga,
                        Unchalli Falls, Jog Falls, and the lush forests of the Western Ghats.
                        These natural and cultural treasures offer a memorable glimpse into
                        the unique spirit of Sirsi.
                    </p>

                    <p>
                        The Karnataka Urology Association is committed to delivering a
                        memorable and academically enriching conference, filled with
                        opportunities for learning, collaboration, and professional growth.
                        KUACON 2027 invites you to be part of this vibrant exchange of ideas,
                        where scientific excellence meets the beauty and culture of Sirsi.
                    </p>

                    <p>
                        We look forward to welcoming you all to KUACON 2027, Sirsi!
                    </p>
                </div>

                <p className="welcome-signoff">
                    With warm regards,
                    <br />
                    <strong>KUACON 2027 Organizing Committee</strong>
                </p>
            </article>

            {/* REGISTRATION FEES */}
            {/* REGISTRATION FEES */}

            <section className="home-registration-fees">

                <div className="home-registration-header">

                    <p className="section-kicker">
                        Registrations are Open!
                    </p>

                    <h2>Registration Fees for KUACON 2027</h2>

                    <p>
                        INR fees include an additional 18% GST; international delegate fees are in USD.
                    </p>

                </div>


                <div className="home-registration-tables">

                    {registrationTables.map((table) => (

                        <div
                            className="home-registration-table"
                            key={table.title}
                        >

                            {/* Header */}

                            <div className="home-registration-table-header">

                                <div>
                                    {table.title}
                                </div>

                                <div>
                                    {table.period}
                                </div>

                            </div>
                            <div className="home-registration-column-header">
                                <div>Category</div>
                                <div>Registration Fee</div>
                                <div>Fee + 18% GST</div>
                            </div>


                            {/* Rows */}

                           {Object.entries(table.prices).map(
  ([category, price]) => {

    const amount = typeof price === 'number' ? price : price.amount
    const isInternational = typeof price !== 'number'
    const gstAmount = isInternational ? 0 : amount * 0.18
    const total = amount + gstAmount
    const formatPrice = (value) => isInternational ? `$${value.toLocaleString('en-IN')} USD` : `₹${value.toLocaleString('en-IN')}`

    return (
      <div
        className="home-registration-row"
        key={category}
      >

        <div className="home-registration-category">
          {category}
        </div>

        <div className="home-registration-price">
          {formatPrice(amount)}
        </div>

        <div className="home-registration-price gst-price">
          {isInternational ? 'GST not applicable' : formatPrice(total)}
        </div>

      </div>
    )
  }
)}

                        </div>

                    ))}

                </div>


                {/* Notes */}

                <div className="home-registration-notes">

                    <p>
                        • KUA members above 70 years of age will have free
                        registration but need to fill the registration form for
                        logistic purposes.
                    </p>

                    <p>
                        • Children above 10 years will be charged as an
                        accompanying person.
                    </p>

                </div>


                {/* Register Button */}

                <div className="home-registration-cta">

                    <button
                        className="pill-btn"
                        onClick={() => onNavigate?.('registration')}
                    >
                        Register Now
                    </button>

                </div>

            </section>

        </section>
    )
}