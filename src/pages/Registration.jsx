import React, { useState } from 'react'

const indianStates = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
const designations = ['Consultant', 'Professor', 'Associate Professor', 'Assistant Professor', 'Senior Resident', 'Tutor', 'Post Graduate', 'Other']
const superEarlyFees = [['KUA Members', 5000], ['Non-KUA Members', 6000], ['Post Graduates', 4000], ['Accompanying Person', 4000]]
const earlyFees = [['KUA Members', 6000], ['Non-KUA Members', 7000], ['Post Graduates', 4500], ['Accompanying Person', 4500]]
const standardFees = [
  ['KUA Members', 7000, 8000, 9500],
  ['Non-KUA Members', 8000, 9000, 10500],
  ['Post Graduates', 5500, 6500, 7500],
  ['Accompanying Person', 5500, 6500, 7500]
]
const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`
const totalWithGst = (amount) => Math.round(amount * 1.18)

function Field({ label, children }) {
  return <label className="registration-field"><span>{label}</span>{children}</label>
}

function Select({ name, options, value, onChange }) {
  return <select name={name} value={value} onChange={onChange} required><option value="">- Select -</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>
}

function TwoColumnFeeTable({ title, deadline, rows }) {
  return (
    <section className="fee-stage">
      <div className="fee-stage-heading"><h3>{title}</h3><p>{deadline}</p></div>
      <div className="fee-table-wrap"><table className="fee-table">
        <thead><tr><th>Category</th><th>Registration Fee</th><th>Fee incl. 18% GST</th></tr></thead>
        <tbody>{rows.map(([category, amount]) => <tr key={category}><th>{category}</th><td>{formatCurrency(amount)}</td><td>{formatCurrency(totalWithGst(amount))}</td></tr>)}</tbody>
      </table></div>
    </section>
  )
}

export default function Registration(){
  const [form, setForm] = useState({ name: '', medicalCouncilNumber: '', email: '', medicalCouncilState: '', whatsapp: '', category: '', membershipNumber: '', gender: '', accompanyingPerson: '', hospital: '', city: '', designation: '', mealPreference: '', state: '' })
  const handleChange = ({ target: { name, value } }) => setForm((current) => ({ ...current, [name]: value }))
  const handleSubmit = (event) => { event.preventDefault(); alert('Registration details saved. Payment integration will be enabled shortly.') }

  return (
    <section className="registration-page">
      <h1>KUACON 2027 Registration</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-column">
          <Field label="Enter Full Name"><input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" required /></Field>
          <Field label="Enter Email ID"><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email ID" required /></Field>
          <Field label="Enter WhatsApp Number"><input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="Enter mobile number" required /></Field>
          <Field label="Gender"><Select name="gender" value={form.gender} onChange={handleChange} options={['Male', 'Female', 'Other', 'Prefer not to say']} /></Field>
          <Field label="Enter Medical Institute / Hospital Name"><input name="hospital" value={form.hospital} onChange={handleChange} placeholder="Enter medical institute / hospital name" required /></Field>
          <Field label="Enter Designation"><Select name="designation" value={form.designation} onChange={handleChange} options={designations} /></Field>
        </div>
        <div className="registration-column">
          <Field label="Enter Medical Council Number"><input name="medicalCouncilNumber" value={form.medicalCouncilNumber} onChange={handleChange} placeholder="Enter medical council number" required /></Field>
          <Field label="Select Medical Council State"><Select name="medicalCouncilState" value={form.medicalCouncilState} onChange={handleChange} options={indianStates} /></Field>
          <Field label="Choose the Category"><Select name="category" value={form.category} onChange={handleChange} options={['Member', 'Non Member', 'Post Graduate']} /></Field>
          {form.category === 'Member' && (
            <div className="membership-field">
              <p>Enter State Membership Number</p>
              <Field label="Membership Number"><input name="membershipNumber" value={form.membershipNumber} onChange={handleChange} placeholder="Enter registration number" required /></Field>
            </div>
          )}
          <Field label="Accompanying Person"><Select name="accompanyingPerson" value={form.accompanyingPerson} onChange={handleChange} options={['No – Accompanying –', 'Yes']} /></Field>
          <Field label="Enter City"><input name="city" value={form.city} onChange={handleChange} placeholder="Enter city" required /></Field>
          <Field label="Meal Preference"><Select name="mealPreference" value={form.mealPreference} onChange={handleChange} options={['Vegetarian', 'Non-Vegetarian']} /></Field>
          <Field label="Select State"><Select name="state" value={form.state} onChange={handleChange} options={indianStates} /></Field>
        </div>
        <div className="registration-submit"><button className="pill-btn" type="submit">Submit &amp; Pay</button></div>
      </form>
      <section className="registration-fees">
        <header><p>Registrations are open!</p><h2>Registration fees for KUACON 2027</h2><span>All fees are subject to an additional 18% GST.</span></header>
        <TwoColumnFeeTable title="Super Early Bird" deadline="Till end of KUACON 2026" rows={superEarlyFees} />
        <TwoColumnFeeTable title="Early Bird" deadline="Till 15 May 2027" rows={earlyFees} />
        <section className="fee-stage">
          <div className="fee-table-wrap"><table className="fee-table fee-table-wide">
            <thead><tr><th>Cut-off Date</th><th>16 May 2027 to 15 August 2027</th><th>16 August 2027 to 15 October 2027</th><th>From 16 October 2027 &amp; Spot Registrations</th></tr></thead>
            <tbody>{standardFees.map(([category, ...amounts]) => <tr key={category}><th>{category}</th>{amounts.map((amount) => <td key={amount}><span>{formatCurrency(amount)}</span><small>{formatCurrency(totalWithGst(amount))} incl. GST</small></td>)}</tr>)}</tbody>
          </table></div>
        </section>
        <ul className="fee-notes"><li>KUA Members above 75 years of age have free registration, but must complete the registration form for logistical purposes.</li><li>Children above 10 years will be charged as an accompanying person.</li></ul>
      </section>
    </section>
  )
}
