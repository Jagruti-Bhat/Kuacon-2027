const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const GST_RATE = 0.18;

// Conference timezone: India
const IST_OFFSET = "+05:30";

function getRegistrationStage() {
  const now = new Date();

  // Convert current time to a date string in India
  const indiaDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  if (indiaDate <= "2026-12-31") {
    return "superEarly";
  }

  if (indiaDate <= "2027-05-15") {
    return "early";
  }

  if (indiaDate <= "2027-08-15") {
    return "regular";
  }

  if (indiaDate <= "2027-10-15") {
    return "late";
  }

  return "spot";
}


function getBaseFee(category, stage) {
  const fees = {
    superEarly: {
      Member: 5000,
      "Non Member": 6000,
      "Post Graduate": 4000,
    },

    early: {
      Member: 6000,
      "Non Member": 7000,
      "Post Graduate": 4500,
    },

    regular: {
      Member: 7000,
      "Non Member": 8000,
      "Post Graduate": 5500,
    },

    late: {
      Member: 8000,
      "Non Member": 9000,
      "Post Graduate": 6500,
    },

    spot: {
      Member: 9500,
      "Non Member": 10500,
      "Post Graduate": 7500,
    },
  };

  const fee = fees[stage]?.[category];

  if (!fee) {
    throw new Error("Invalid registration category");
  }

  return fee;
}


export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {

    const {
      category,
      accompanyingPerson,
    } = req.body;


    // -----------------------------
    // 1. Determine registration stage
    // -----------------------------

    const stage = getRegistrationStage();


    // -----------------------------
    // 2. Get category fee
    // -----------------------------

    let baseFee = getBaseFee(
      category,
      stage
    );


    // -----------------------------
    // 3. Add accompanying person
    // -----------------------------

    if (accompanyingPerson === "Yes") {
      baseFee += 5500;
    }


    // -----------------------------
    // 4. Add 18% GST
    // -----------------------------

    const gst = Math.round(
      baseFee * GST_RATE
    );

    const totalAmount = baseFee + gst;


    // -----------------------------
    // 5. Create Razorpay order
    // -----------------------------

    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `kuacon_${Date.now()}`,
    });


    // -----------------------------
    // 6. Send order information
    // -----------------------------

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,

      registrationStage: stage,

      baseFee,
      gst,
      totalAmount,
    });

  } catch (error) {

    console.error(
      "RAZORPAY ORDER ERROR:",
      error
    );

    return res.status(500).json({
      error:
        error.message ||
        "Unable to create Razorpay order",
    });
  }
}