export function getPrice({ attendeeType, date }){
  // Placeholder dynamic pricing rules
  // attendeeType: 'student' | 'professional' | 'foreign'
  // date: JS Date instance
  const base = attendeeType === 'student' ? 1000 : attendeeType === 'professional' ? 3000 : 5000
  // early bird before 2027-03-01
  const earlyCutoff = new Date('2027-03-01')
  const multiplier = date < earlyCutoff ? 0.8 : 1
  return Math.round(base * multiplier)
}
