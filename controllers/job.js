const jobModel = require("../models/job");

async function postJob(req, res) {
  const { title, description, company, location, salary } = req.body;
  if (!title || !description || !company || !location || !salary) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newJobs = await jobModel.create({
      title,
      description,
      company,
      location,
      salary,
    });

    return res.json({ status: "success", job: newJobs });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getJob(req, res) {
  const allJobs = await jobModel.find({});
  res.json({
    success: true,
    message: "All job are here",
    data: allJobs,
  });
}

async function updateJob(req, res) {
  const searchId = req.params.id;
  console.log(searchId);
  try {
    const fillerJob = await jobModel.findById(searchId);
    return res.json({
      success: true,
      data: fillerJob,
    });
  } catch (err) {
    console.log("Connection failed: ", err);
  }
}

async function deleteJob(req, res) {
  const searchId = req.params.id;

  try {
    const deletedJob = await jobModel.findByIdAndDelete(searchId);
    if (!deletedJob) {
      return res.status(404).send({ message: "Job not found" });
    }

    res
      .status(200)
      .send({ message: "Job successfully deleted", job: deletedJob });
  } catch (err) {
    console.log("Connection failed: ", err);
    res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = { postJob, getJob, updateJob, deleteJob };
