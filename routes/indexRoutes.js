const express = require("express");
const router = express.Router();
const {
  homepage,
  studentsignup,
  studentsignin,
  studentsignout,
  currentUser,
  studentsendmail,
  studentforgetlink,
  studentresetpassword,
  studentupdate,
  studentavatar,
  applyinternship,
  applyjob,
  readalljobs,
  readallinternships,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const student = require("../models/studentModel");
// GET /
router.get("/", homepage);

// post /student
router.post("/student", isAuthenticated, currentUser);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// get /student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

// post /student/send-mail
router.post("/student/send-mail", studentsendmail);

// GET /student/forget-link/:studentid
router.post("/student/forget-link/", studentforgetlink);

// POST /student/reset-password/:studentid
router.post("/student/reset-password/:id",isAuthenticated, studentresetpassword);

// POST /student/update/:studentid
router.post("/student/update/:id",isAuthenticated, studentupdate);

// POST /student/avatar/:studentid
router.post("/student/avatar/:id",isAuthenticated, studentavatar);


router.post("/student/allinternships/" , isAuthenticated, readallinternships)

// -----------------apply internship----------------

// POST /student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid",isAuthenticated, applyinternship);


router.post("/student/alljobs/" , isAuthenticated, readalljobs)

// -----------------apply job----------------

// POST /student/apply/job/:jobid
router.post("/student/apply/job/:jobid",isAuthenticated, applyjob);


module.exports = router;
