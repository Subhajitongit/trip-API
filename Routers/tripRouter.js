const express = require("express");
const { protectedRoute } = require("../Controllers/authController");
const {
  createPlan,
  searchPlan,
  allPlans,
  savePlan,
  getSavedPlans,
  deleteSavedPlans,
  modifySavedPlan,
} = require("../Controllers/tripController");

const tripRouter = express.Router();

tripRouter.use(protectedRoute);
tripRouter.route("/create").post(createPlan); //create a plan
tripRouter.route("/save").post(savePlan); // save a new plan
tripRouter.route("/all").get(allPlans); // see all plans
tripRouter.route("/:place").get(searchPlan); //search for a plan 
tripRouter.route("/saved/:id").get(getSavedPlans).patch(modifySavedPlan); // get all saved plans or modify saved plan
tripRouter.route("/remove").post(deleteSavedPlans); // remove a saved plan from profile

module.exports = tripRouter;
