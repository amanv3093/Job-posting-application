const express = require("express");
const { postJob, getJob, updateJob,deleteJob } = require("../controllers/job");

const router = express.Router();
router.post("/", postJob);
router.get("/", getJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
