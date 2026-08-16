import crypto from "crypto";

export default async function handler(req, res) {
  console.log('VERIFY PAYMENT FUNCTION CALLED')

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    })
  }

  try {
    const body =
      typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body || {}

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = body

    console.log('Payment ID:', razorpay_payment_id)
    console.log('Order ID:', razorpay_order_id)
    console.log(
      'Signature received:',
      !!razorpay_signature
    )

    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        error: 'Missing payment details',
      })
    }

    const secret = process.env.RAZORPAY_KEY_SECRET

    if (!secret) {
      return res.status(500).json({
        success: false,
        error: 'Razorpay secret is missing',
      })
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest('hex')

    const isValid =
      generatedSignature === razorpay_signature

    console.log('Signature valid:', isValid)

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    })

  } catch (error) {
    console.error('VERIFY ERROR:', error)

    return res.status(500).json({
      success: false,
      error: error.message || 'Payment verification failed',
    })
  }
}