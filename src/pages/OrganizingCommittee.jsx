import React from 'react'

// Add an image path (for example, /committee/name.jpg) as photos become available.
const kuaCouncil = [
  {
    name: 'Dr. Gajanan Bhat',
    initials: 'GB',
    image: '/committee/gajanan-bhat.jpg',
    roles: ['President Elect, KUA', 'Organizing Secretary, KUACON 2027']
  },
  { name: 'Name to be added', initials: '+', image: '', roles: ['Council designation'] },
  { name: 'Name to be added', initials: '+', image: '', roles: ['Council designation'] },
  { name: 'Name to be added', initials: '+', image: '', roles: ['Council designation'] }
]

const organizingCommittee = [
  { name: 'Name to be added', initials: '+', image: '', roles: ['Organizing committee designation'] },
  { name: 'Name to be added', initials: '+', image: '', roles: ['Organizing committee designation'] },
  { name: 'Name to be added', initials: '+', image: '', roles: ['Organizing committee designation'] },
  { name: 'Name to be added', initials: '+', image: '', roles: ['Organizing committee designation'] }
]

function MemberCard({ member }) {
  return (
    <article className={`member-card${member.initials === '+' ? ' member-placeholder' : ''}`}>
      {member.image ? (
        <img className="member-photo" src={member.image} alt={member.name} />
      ) : (
        <div className="member-photo member-fallback" aria-hidden="true">{member.initials}</div>
      )}
      <h2>{member.name}</h2>
      <div className="member-roles">
        {member.roles.map((role) => <p key={role}>{role}</p>)}
      </div>
    </article>
  )
}

function CommitteeSection({ title, members }) {
  return (
    <section className="committee-section">
      <h1>{title}</h1>
      <span className="section-accent" aria-hidden="true" />
      <div className="member-grid">
        {members.map((member, index) => <MemberCard key={`${title}-${index}`} member={member} />)}
      </div>
    </section>
  )
}

export default function OrganizingCommittee(){
  return (
    <div className="committee-page">
      <CommitteeSection title="KUA Council" members={kuaCouncil} />
      <CommitteeSection title="Organizing Committee" members={organizingCommittee} />
    </div>
  )
}
