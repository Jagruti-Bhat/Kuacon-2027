import React from 'react'

const destinations = [
  {
    name: 'Marikamba Temple',
    image: 'https://www.holidify.com/images/cmsuploads/compressed/temple-745828_960_720_20180903015619.jpg',
    description: 'A landmark Hindu temple in Sirsi dedicated to Marikamba Devi. Founded in 1688, it is known for its Kaavi-art murals and striking red-and-white façade.'
  },
  {
    name: 'Sahasralinga',
    image: 'https://www.gosahin.com/go/p/b/1517779649_sahasralinga1.jpg',
    description: 'Set on the Shalmala River near Sirsi, Sahasralinga is famed for the many Shiva lingas carved on river rocks and along its banks.'
  },
  {
    name: 'Bheemanagudda Peak',
    image: 'https://4.bp.blogspot.com/-fEd0B0sLSOA/UyHFmxshnOI/AAAAAAAABEg/ajHbAscwZpI/s1600/Bheemanavare%2BGudda%2B-%2BSirsiToursim.Blogspot.com%2B%283%29.jpg',
    description: 'A rewarding local hill outing near Sirsi, ideal for visitors seeking a quiet scenic break amid the Western Ghats landscape.'
  },
  {
    name: 'Yana Caves',
    image: 'https://i.cdn.newsbytesapp.com/hn/images/l84720241230152754.jpeg',
    description: 'A forest destination in Uttara Kannada known for its striking black limestone pinnacles, Bhairaveshwara Shikhara and Mohini Shikhara, and a cave shrine below.'
  },
  {
    name: 'Unchalli Falls',
    image: '/tourist-places/unchalli-falls.jpg',
    description: 'Also called Lushington Falls, this dramatic 116-metre drop of the Aghanashini River lies in the forested Sirsi region.'
  }
]

export default function TouristPlaces(){
  return (
    <section className="tourist-page">
      <header className="tourist-heading">
        <h1>Discover Sirsi &amp; Beyond</h1>
        <p>Plan a memorable extension to your KUACON 2027 visit with these heritage, nature and pilgrimage destinations around Sirsi.</p>
      </header>

      <div className="destination-grid">
        {destinations.map((destination) => (
          <article className="destination-card" key={destination.name}>
            <img src={destination.image} alt={destination.name} />
            <div className="destination-copy">
              <h2>{destination.name}</h2>
              <p>{destination.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
