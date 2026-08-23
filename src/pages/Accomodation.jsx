import React from 'react'

const stays = [
  ['Omkar Jungle Resort & Spa, Sirsi', '0 km'],
  ['Hotel Supriya International', '13.2 km'],
  ['Ibbani Resorts', '6 km'],
  ['Hotel Alekha Gateway', '16.2 km'],
  ['Hotel Panchavati', '12.2 km'],
  ['Hotel Madhuvan', '13.2 km'],
  ['Hotel Samrat', '13.2 km']
]

export default function Accomodation(){
  return (
    <section className="accommodation-page">
      <header className="accommodation-heading">
        <h1>Accommodation</h1>
        <span aria-hidden="true" />
        <p>A selection of convenient stays around Sirsi for KUACON 2027 delegates.</p>
      </header>

      <div className="accommodation-table-wrap">
        <table className="accommodation-table">
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Distance from Venue</th>
            </tr>
          </thead>
          <tbody>
            {stays.map(([hotel, distance]) => (
              <tr key={hotel}>
                <td>{hotel}</td>
                <td>{distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
