import { google } from 'googleapis'

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID

const SHEET_NAME = 'Registrations'

// KUACON 2027 starts on 6 November 2027
const CONFERENCE_DATE = new Date(
  '2027-11-06T00:00:00+05:30'
)

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

    // --------------------------------
    // Validate registration details
    // --------------------------------

    if (!form || !paymentId || !orderId || !amount) {
      return res.status(400).json({
        success: false,
        error:
          'Missing registration or payment details',
      })
    }

    // --------------------------------
    // Google environment variables
    // --------------------------------

    const clientEmail =
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL

    const privateKeyBase64 =
      process.env.GOOGLE_PRIVATE_KEY_BASE64

    console.log('GOOGLE SHEETS ENV CHECK:', {
      sheetId: !!process.env.GOOGLE_SHEET_ID,
      serviceAccountEmail: !!clientEmail,
      privateKey: !!privateKeyBase64,
    })

    if (
      !SPREADSHEET_ID ||
      !clientEmail ||
      !privateKeyBase64
    ) {
      return res.status(500).json({
        success: false,
        error:
          'Google Sheets environment variables are missing',
      })
    }

    // --------------------------------
    // Decode private key
    // --------------------------------

    const privateKey = Buffer.from(
      privateKeyBase64,
      'base64'
    ).toString('utf8')

    // --------------------------------
    // Google authentication
    // --------------------------------

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },

      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })

    const sheets = google.sheets({
      version: 'v4',
      auth,
    })

    // --------------------------------
    // Generate Registration ID
    // --------------------------------

    const registrationId =
      `KUACON-${Date.now()}`

    // --------------------------------
    // Registration date/time
    // --------------------------------

    const registrationDate =
      new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date())

    // --------------------------------
    // Calculate age as of
    // 6 November 2027
    // --------------------------------

    const calculateAge = (dateOfBirth) => {
      if (!dateOfBirth) return ''

      const birthDate = new Date(dateOfBirth)

      if (isNaN(birthDate.getTime())) {
        return ''
      }

      let age =
        CONFERENCE_DATE.getFullYear() -
        birthDate.getFullYear()

      const monthDifference =
        CONFERENCE_DATE.getMonth() -
        birthDate.getMonth()

      if (
        monthDifference < 0 ||
        (
          monthDifference === 0 &&
          CONFERENCE_DATE.getDate() <
            birthDate.getDate()
        )
      ) {
        age--
      }

      return age
    }

    const age = calculateAge(
      form.dateOfBirth
    )

    // --------------------------------
    // Prepare row
    // --------------------------------

    const row = [
      registrationId,

      registrationDate,

      form.name || '',
      form.email || '',
      form.whatsapp || '',

      form.medicalCouncilNumber || '',
      form.medicalCouncilState || '',

      form.category || '',
      form.membershipNumber || '',

      form.gender || '',

      form.dateOfBirth || '',
      age,

      form.accompanyingPerson || '',

      form.hospital || '',
      form.city || '',
      form.designation || '',

      form.mealPreference || '',
      form.state || '',

      amount,

      paymentId,
      orderId,
    ]

    console.log(
      'Saving registration:',
      registrationId
    )

    // --------------------------------
    // Append to Google Sheet
    // --------------------------------

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,

      range: `'${SHEET_NAME}'!A:U`,

      valueInputOption: 'USER_ENTERED',

      insertDataOption: 'INSERT_ROWS',

      requestBody: {
        values: [row],
      },
    })

    console.log(
      'Registration saved successfully:',
      registrationId
    )

    return res.status(200).json({
      success: true,
      registrationId,
    })

  } catch (error) {
    console.error(
      'GOOGLE SHEETS ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        'Unable to save registration',
    })
  }
}