const { MongoClient } = require("mongodb");
const assert = require("assert");

///this is done to modify the booking seats database!

const bookSeat = async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const {
      fullName,
      email,
      creditCard,
      expiration,
      seatId,
      price,
      isBooked,
    } = req.body;
    if (!creditCard || !expiration) {
      return res.status(400).json({
        status: 400,
        message: "Please provide credit card information!",
      });
    }
    const item = { seatId, price, isBooked };
    console.log("THIS IS ITEM", item);
    console.log("this works?", req.body);
    console.log("connected ex-3");
    const db = await client.db("seats");
    const newValues = {
      $set: { isBooked: true, name: fullName, email: email },
    };
    const r = await db
      .collection("seating")
      .updateOne({ _id: seatId }, newValues);
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, success: true });
  } catch (err) {
    res.status(500).json({ message: err });
    console.log("this my error", err);
  }
};

module.exports = { bookSeat };
