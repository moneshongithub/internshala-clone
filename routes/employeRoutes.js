const express = require("express");
const router = express.Router();
const {
  homepage,
  employesignup,
  employesignin,
  employesignout,
  currentEmploye,
  employesendmail,
  employeforgetlink,
  employeresetpassword,
  employeupdate, 
  employeavatar,
  createinternship,
  readinternship,
  readsingleinternship,
  createjob,
  readjob,
  readsinglejob,
} = require("../controllers/employeController");
const { isAuthenticated } = require("../middlewares/auth");
const employe = require("../models/employeModel");

// GET /
router.get("/", homepage);

// post /employe
router.post("/current", isAuthenticated, currentEmploye);

// POST /employe/signup
router.post("/signup", employesignup);

// POST /employe/signin
router.post("/signin", employesignin);

// get /employe/signout
router.get("/signout", isAuthenticated, employesignout);

// post /employe/send-mail
router.post("/send-mail", employesendmail);

// GET /employe/forget-link/:employeid
router.post("/forget-link/", employeforgetlink);

// GET /employe/reset-password/:employeid
router.post("/reset-password/:id",isAuthenticated, employeresetpassword);

// GET /employe/update/:employeid
router.post("/update/:id",isAuthenticated, employeupdate);

// GET /employe/avatar/:employeid
router.post("/avatar/:id",isAuthenticated, employeavatar);


// ----------------------internships---------------------

// POST /employe/internship/create
router.post("/internship/create",isAuthenticated, createinternship);
 
// POST /employe/internship/read
router.post("/internship/read",isAuthenticated, readinternship);
 
// POST /employe/internship/read/:id 
router.post("/internship/read/:id",isAuthenticated, readsingleinternship);

// ----------------------jobs---------------------

// POST /employe/internship/create
router.post("/job/create",isAuthenticated, createjob);
 
// POST /employe/job/read
router.post("/job/read",isAuthenticated, readjob);
 
// POST /employe/job/read/:id 
router.post("/job/read/:id",isAuthenticated, readsinglejob);


module.exports = router; 
