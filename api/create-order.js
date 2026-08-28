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
      Member: 5500,
      "Non Member": 6500,
      "Post Graduate": 4500,
      "Trade Delegate": 10000,
    },

    early: {
      Member: 6500,
      "Non Member": 7500,
      "Post Graduate": 5000,
      "Trade Delegate": 10000,
    },

    regular: {
      Member: 7500,
      "Non Member": 8500,
      "Post Graduate": 6000,
      "Trade Delegate": 10000,
    },

    late: {
      Member: 8500,
      "Non Member": 9500,
      "Post Graduate": 7000,
      "Trade Delegate": 10000,
    },

    spot: {
      Member: 10000,
      "Non Member": 11000,
      "Post Graduate": 8000,
      "Trade Delegate": 10000,
    },
  };

  const fee = fees[stage]?.[category];

  if (!fee) {
    throw new Error("Invalid registration category");
  }

  return fee;
}

function getInternationalFee(stage) {
  const fees = {
    superEarly: 120,
    early: 130,
    regular: 150,
    late: 180,
    spot: 200,
  };

  return fees[stage];
}

function getAccompanyingPersonFee(stage) {
  const fees = {
    superEarly: 4500,
    early: 5000,
    regular: 6000,
    late: 7000,
    spot: 8000,
  };

  return fees[stage];
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

    const isInternational = category === "International Delegate" && accompanyingPerson !== "Yes";
    const currency = isInternational ? "USD" : "INR";
    const baseFee = accompanyingPerson === "Yes"
      ? getAccompanyingPersonFee(stage)
      : isInternational
        ? getInternationalFee(stage)
        : getBaseFee(category, stage);


    // -----------------------------
    // 4. Add 18% GST
    // -----------------------------

    const gst = isInternational ? 0 : Math.round(baseFee * GST_RATE);

    const totalAmount = baseFee + gst;


    // -----------------------------
    // 5. Create Razorpay order
    // -----------------------------

    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency,
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