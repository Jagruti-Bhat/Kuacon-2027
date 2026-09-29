const Razorpay = require("razorpay");

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

  // Super Early Bird is available through the final day of KUACON 2026.
  if (indiaDate <= "2026-10-04") {
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
      "Trade Delegate": 11000,
    },

    early: {
      Member: 6500,
      "Non Member": 7500,
      "Post Graduate": 5000,
      "Trade Delegate": 11000,
    },

    regular: {
      Member: 7500,
      "Non Member": 8500,
      "Post Graduate": 6000,
      "Trade Delegate": 11000,
    },

    late: {
      Member: 8500,
      "Non Member": 9500,
      "Post Graduate": 7000,
      "Trade Delegate": 11000,
    },

    spot: {
      Member: 10000,
      "Non Member": 11000,
      "Post Graduate": 8000,
      "Trade Delegate": 11000,
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

function isEligibleForFreeMemberRegistration(dateOfBirth) {
  if (!dateOfBirth) return false;
  const birthDate = new Date(`${dateOfBirth}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age -= 1;
  return age > 70;
}


export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID?.trim();
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

    if (!keyId || !keySecret) {
      const missingVariables = [
        !keyId && "RAZORPAY_KEY_ID",
        !keySecret && "RAZORPAY_KEY_SECRET",
      ].filter(Boolean);

      return res.status(500).json({
        error: `Missing Vercel environment variable(s): ${missingVariables.join(", ")}`,
      });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const {
      category,
      accompanyingPerson,
      accompanyingPersonCount: requestedAccompanyingPersonCount,
      dateOfBirth,
      usiBenevolentFund,
    } = req.body;

    const accompanyingPersonCount = accompanyingPerson === "Yes"
      ? Number(requestedAccompanyingPersonCount)
      : 0;

    if (accompanyingPerson === "Yes" && (!Number.isInteger(accompanyingPersonCount) || accompanyingPersonCount < 1 || accompanyingPersonCount > 10)) {
      return res.status(400).json({ error: "Enter a number of accompanying persons from 1 to 10" });
    }


    // -----------------------------
    // 1. Determine registration stage
    // -----------------------------

    const stage = getRegistrationStage();


    // -----------------------------
    // 2. Get category fee
    // -----------------------------

    const isInternational = category === "International Delegate";
    if (isInternational && accompanyingPersonCount > 0) {
      return res.status(400).json({ error: "Accompanying persons are not available for International Delegate registrations" });
    }
    const currency = isInternational ? "USD" : "INR";
    const isFreeSeniorMember = category === "Member" && isEligibleForFreeMemberRegistration(dateOfBirth);
    const baseFee = isFreeSeniorMember
      ? 0
      : isInternational
        ? getInternationalFee(stage)
        : getBaseFee(category, stage);
    const accompanyingPersonBaseFee = getAccompanyingPersonFee(stage) * accompanyingPersonCount;


    // -----------------------------
    // 4. Add 18% GST
    // -----------------------------

    const subtotal = baseFee + accompanyingPersonBaseFee;
    const gst = isInternational ? 0 : Math.round(subtotal * GST_RATE);

    const amountBeforeDiscount = subtotal + gst;


    // -----------------------------
    // 5. Apply USI Benevolent Fund discount
    // -----------------------------

    const isUsiBenevolentMember =
      usiBenevolentFund === "Yes" &&
      category !== "International Delegate";

    const usiDiscount = isUsiBenevolentMember ? 500 : 0;

    const totalAmount = Math.max(
      0,
      amountBeforeDiscount - usiDiscount
    );


    // -----------------------------
    // 5. Create Razorpay order
    // -----------------------------

    const order = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency,
      receipt: `kuacon_${Date.now()}`,
    });

    console.log({totalAmount})


    // -----------------------------
    // 6. Send order information
    // -----------------------------

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,

      registrationStage: stage,

      baseFee,
      accompanyingPersonCount,
      accompanyingPersonBaseFee,
      subtotal,
      gst,
      usiDiscount,
      totalAmount,
    });

  } catch (error) {
    console.log("ERR", error)

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
