import { Resend } from 'resend'

const resend = new Resend(
  process.env.RESEND_API_KEY
)

const ORGANIZER_EMAIL = 'jagrutibhat093@gmail.com'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    })
  }

  try {
    const {
      form,
      paymentId,
      orderId,
      amount,
    } = req.body || {}

    if (!form || !paymentId || !orderId) {
      return res.status(400).json({
        success: false,
        error: 'Missing registration or payment details',
      })
    }

    const {
      name,
      email,
      medicalCouncilNumber,
      medicalCouncilState,
      whatsapp,
      category,
      membershipNumber,
      gender,
      accompanyingPerson,
      hospital,
      city,
      designation,
      mealPreference,
      state,
    } = form

    // ----------------------------------
    // 1. Email organizer
    // ----------------------------------

    const organizerResult =
      await resend.emails.send({
        from: 'KUACON 2027 <onboarding@resend.dev>',

        to: [ORGANIZER_EMAIL],

        subject:
          `New KUACON 2027 Registration - ${name}`,

        html: `
          <h2>New KUACON 2027 Registration</h2>

          <h3>Participant Details</h3>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>WhatsApp:</strong>
            ${whatsapp}
          </p>

          <p>
            <strong>Gender:</strong>
            ${gender}
          </p>

          <p>
            <strong>Medical Council Number:</strong>
            ${medicalCouncilNumber}
          </p>

          <p>
            <strong>Medical Council State:</strong>
            ${medicalCouncilState}
          </p>

          <p>
            <strong>Category:</strong>
            ${category}
          </p>

          <p>
            <strong>Membership Number:</strong>
            ${membershipNumber || 'N/A'}
          </p>

          <p>
            <strong>Accompanying Person:</strong>
            ${accompanyingPerson}
          </p>

          <p>
            <strong>Hospital:</strong>
            ${hospital}
          </p>

          <p>
            <strong>Designation:</strong>
            ${designation}
          </p>

          <p>
            <strong>City:</strong>
            ${city}
          </p>

          <p>
            <strong>State:</strong>
            ${state}
          </p>

          <p>
            <strong>Meal Preference:</strong>
            ${mealPreference}
          </p>

          <hr />

          <h3>Payment Details</h3>

          <p>
            <strong>Amount Paid:</strong>
            ₹${Number(amount).toLocaleString('en-IN')}
          </p>

          <p>
            <strong>Payment ID:</strong>
            ${paymentId}
          </p>

          <p>
            <strong>Order ID:</strong>
            ${orderId}
          </p>

          <hr />

          <p>
            <strong>KUACON 2027</strong><br />
            6–8 November 2027<br />
            Essentia Resorts, Sirsi
          </p>
        `,
      })


    // ----------------------------------
    // 2. Email participant
    // ----------------------------------

    const participantResult =
      await resend.emails.send({
        from: 'KUACON 2027 <onboarding@resend.dev>',

        to: [email],

        subject:
          'KUACON 2027 Registration Confirmed',

        html: `
          <h2>Registration Successful!</h2>

          <p>
            Dear ${name},
          </p>

          <p>
            Thank you for registering for
            <strong>KUACON 2027</strong>.
          </p>

          <h3>Registration Details</h3>

          <p>
            <strong>Category:</strong>
            ${category}
          </p>

          <p>
            <strong>Accompanying Person:</strong>
            ${accompanyingPerson}
          </p>

          <h3>Payment Details</h3>

          <p>
            <strong>Amount Paid:</strong>
            ₹${Number(amount).toLocaleString('en-IN')}
          </p>

          <p>
            <strong>Payment ID:</strong>
            ${paymentId}
          </p>

          <p>
            <strong>Order ID:</strong>
            ${orderId}
          </p>

          <hr />

          <p>
            <strong>KUACON 2027</strong><br />
            6–8 November 2027<br />
            Essentia Resorts, Sirsi
          </p>

          <p>
            We look forward to welcoming you
            to KUACON 2027!
          </p>

          <p>
            Regards,<br />
            KUACON 2027 Organizing Committee
          </p>
        `,
      })


    console.log(
      'Organizer email:',
      organizerResult
    )

    console.log(
      'Participant email:',
      participantResult
    )


    return res.status(200).json({
      success: true,

      organizerEmailId:
        organizerResult.data?.id,

      participantEmailId:
        participantResult.data?.id,
    })

  } catch (error) {
    console.error(
      'EMAIL ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        'Unable to send registration emails',
    })
  }
}