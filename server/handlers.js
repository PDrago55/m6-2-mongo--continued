"use strict";
const { MongoClient } = require("mongodb");
const assert = require("assert");

const getSeats = async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  try {
    client.connect();
    const db = await client.db("seats");
    const newArray = await db.collection("seating").find().toArray();

    let seats = {};

    newArray.forEach((seat) => {
      seats = { ...seats, [seat._id]: seat };
    });
    return res.status(200).json({
      status: 200,
      seats: seats,
      numOfRows: 8,
      seatsPerRow: 12,
    });
  } catch (err) {
    res.status(404).json({ status: 404, _id, data: "ZERO" });
    console.log(err);
  } finally {
    client.close();
  }
};

module.exports = { getSeats };
