const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://admin:8EXDVCFYROBAq5Hp@tripcluster.6kohicg.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Trip DB connected");
  })
  .catch(function (err) {
    console.error(err);
  });

const tripSchema = mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  when: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  activities: {
    type: [],
    required: false,
  },
});

const tripModel = mongoose.model("tripModel", tripSchema);

module.exports = tripModel;
