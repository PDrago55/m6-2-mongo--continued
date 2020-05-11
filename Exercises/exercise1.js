const { MongoClient } = require("mongodb");
const assert = require("assert");

const createDataBase = async (req, res) => {
  const seats = [];
  const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
  for (let r = 0; r < row.length; r++) {
    for (let s = 1; s < 13; s++) {
      const seat = {
        _id: `${row[r]}-${s}`,
        price: 225,
        isBooked: false,
      };
      seats.push(seat);
    }
  }
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log("connected");
    const db = await client.db("seats");
    const r = await db.collection("seating").insertMany(seats);
    assert.equal(1, r.insertedCount);
  } catch (err) {
    console.log(err.message);
  }
  client.close();
};

createDataBase();
module.exports = { createDataBase };
