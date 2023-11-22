const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employe = require("../models/employeModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: " secure employe homepage " });
});

exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).populate(['jobs', 'internships']).exec();
  res.json({ employe });
});


exports.employesignup = catchAsyncErrors(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  // res.status(201).json(employe)
  sendtoken(employe, 201, res);
});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employe) return next(new ErrorHandler("user not found", 404));

  const isMatch = employe.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("wrong credentials", 500));

  sendtoken(employe, 200, res);

  //    res.json(employe)
});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "successfully signout" });
});

// -----------------------send-mail----------------
exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).exec();

  if (!employe) return next(new ErrorHandler("employe not found", 404));

  const url = Math.floor(Math.random() * 1000 - 1000);

  sendmail(req, res, next, url);
  employe.resetPasswordToken = `${url}`; 
  await employe.save();

  res.json({message: "mail sent successfully" });
});
// -----------------------forget-password-link ---------------

exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({email : req.body.email}).exec();

  if (!employe)
    return next(
      new ErrorHandler("employe not found with this email address", 404)
    );
  if (employe.resetPasswordToken == req.body.otp) {
    employe.resetPasswordToken = "0";
    employe.password = req.body.password;
    await employe.save();
  } else {
    return next(
      new ErrorHandler("invalid reset password link plz try again", 500)
    );
  }

  res.status(200).json({ message: "password has been successfully changed" });
});

// -----------------------reset password----------------

exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  employe.password = req.body.password;
  await employe.save();
  sendtoken(employe, 201, res);

  res.status(200).json({ message: "password has been successfully reset" });
});

// -----------------------employe-update----------------

exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
  await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "employe updated successfully",
  });
});

exports.employeavatar = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();
  const file = req.files.organizationlogo;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  if (employe.organizationlogo.fileId !== "") {
    await imagekit.deleteFile(employe.organizationlogo.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  employe.organizationlogo = { fileId, url };
  await employe.save();
  res.status(200).json({
    success: true,
    message: "profile updated",
  });
});

// ----------------------internship---------------------

exports.createinternship = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const internship = await new Internship(req.body);
  internship.employe = employe._id;
  employe.internships.push(internship._id);
  await internship.save();
  await employe.save();
  res.status(201).json({ success: true, internship });
});

exports.readinternship = catchAsyncErrors(async (req, res, next) => {
  // const internships = await Internship.find().exec();
  const { internships } = await Employe.findById(req.id)
    .populate("internships")
    .exec();
  res.status(200).json({ success: true, internships });
});

exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id).exec();
  if (!internship) return new ErrorHandler("Internship not found  ");
  res.status(200).json({ success: true, internship });
});

// ----------------------jobs---------------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const job = await new Job(req.body);
  job.employe = employe._id;
  employe.jobs.push(job._id);
  await job.save();
  await employe.save();
  res.status(201).json({ success: true, job });
});

exports.readjob = catchAsyncErrors(async (req, res, next) => {
  // const jobs = await job.find().exec();
  const { jobs } = await Employe.findById(req.id).populate("jobs").exec();
  res.status(200).json({ success: true, jobs });
});

exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id).exec();
  if (!job) return new ErrorHandler("job not found  ");
  res.status(200).json({ success: true, job });
});
