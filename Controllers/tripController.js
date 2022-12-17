const tripModel = require("../Models/tripModel");
const userModel = require("../Models/userModel");

module.exports.createPlan = async function createPlan(req, res) {
  try {
    let dataObj = req.body;
    let plan = await tripModel.create(dataObj);

    res.json({
      message: "Succesfully Created Plan",
      data: plan,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.searchPlan = async function searchPlan(req, res) {
  try {
    const place = req.params.place;
    const trip = await tripModel.find({ destination: place });

    if (trip.length > 0) {
      console.log(trip);
      res.json({
        message: "Succesfully Found",
        data: trip,
      });
    } else {
      res.json({
        message: "Trip not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.allPlans = async function allPlans(req, res) {
  try {
    const trips = await tripModel.find();

    if (trips.length > 0) {
      res.json({
        message: "Succesfully Found",
        data: trips,
      });
    } else {
      res.json({
        message: "No trips found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.savePlan = async function savePlan(req, res) {
  try {
    const body = req.body;
    const userId = body.userId;
    const tripId = body.tripId;
    const trip = await tripModel.findById(tripId);

    const user = await userModel.findByIdAndUpdate(userId, {
      $push: { savedPlans: trip },
    });

    res.json({
      message: "Plan saved",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getSavedPlans = async function getSavedPlans(req, res) {
  try {
    const userId = req.params.id;

    const user = await userModel.findById(userId);
    res.json({
      message: "Successfully found!",
      data: user.savedPlans,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteSavedPlans = async function deleteSavedPlans(req, res) {
  try {
    const body = req.body;
    const tripId = body.tripId;
    const userId = body.userId;

    const trip = await tripModel.findById(tripId);

    const user = await userModel.findByIdAndUpdate(userId, {
      $pull: { savedPlans: trip },
    });

    res.json({
      message: "Removed Successfully",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.modifySavedPlan = async function modifySavedPlan(req, res) {
  try {
    const userId = req.params.id;
    const body = req.body;
    const user = await userModel.findById(userId);

    const data = body.data;
    const tripId = body.tripId;
    for (let i = 0; i < user.savedPlans.length; i++) {
      if (user.savedPlans[i]._id.toHexString() === tripId) {
        let keys = [];
        for (let key in data) {
          keys.push(key);
        }
        let trip = await tripModel.findById(tripId);
        for (let i = 0; i < keys.length; i++) {
          trip[keys[i]] = data[keys[i]];
        }
        await trip.save();
        res.json({
          message: "Data updated successfully!",
        });
      } else {
        res.json({
          message: "Please save this intenary to modify it!",
        });
      }
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
