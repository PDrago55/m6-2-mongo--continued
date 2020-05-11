const router = require("express").Router();
const { getSeats } = require("./handlers");
const { bookSeat } = require("../Exercises/exercise3");
// Code that is generating the seats.
// ----------------------------------
// ----------------------------------

router.get("/api/seat-availability", getSeats);

router.post("/api/book-seat", bookSeat);

module.exports = router;
