const express = require("express")
const router = express.Router();
const {resume,
     addeducation, editeducation,deleteeducation,
     addjobs,editjobs,deletejobs,
     addinternship,editinternship,deleteinternship,
     addresp,editresp,deleteresp,
     addcours,editcours,deletecours,
     addproj, editproj,deleteproj,
     addskil,editskil,deleteskil,
     addacomp, editacomp, deleteacomp,} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET /
router.get("/",isAuthenticated, resume) 

// ----------------education---------------
// POST deleteinternship
router.post("/add-edu", isAuthenticated, addeducation)

// post
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)

// post
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)

// ----------------jobs---------------
// POST 
router.post("/add-job", isAuthenticated, addjobs)

// post
router.post("/edit-job/:jobid", isAuthenticated, editjobs)

// post
router.post("/delete-job/:jobid", isAuthenticated, deletejobs)


// ----------------internships----------------------
// POST 
router.post("/add-internship", isAuthenticated, addinternship)

// POST
router.post("/edit-internship/:internid", isAuthenticated, editinternship)

// POST
router.post("/delete-internship/:internid", isAuthenticated, deleteinternship)

// -------------------responsibilities---------------
// POST 
router.post("/add-resp", isAuthenticated, addresp)

// POST
router.post("/edit-resp/:respid", isAuthenticated, editresp)

// POST
router.post("/delete-resp/:respid", isAuthenticated, deleteresp)

// -------------------courses---------------
// POST 
router.post("/add-cours", isAuthenticated, addcours)

// POST
router.post("/edit-cours/:coursid", isAuthenticated, editcours)

// POST
router.post("/delete-cours/:coursid", isAuthenticated, deletecours)

// -------------------projects---------------
// POST 
router.post("/add-proj", isAuthenticated, addproj)

// POST
router.post("/edit-proj/:projid", isAuthenticated, editproj)

// POST
router.post("/delete-proj/:projid", isAuthenticated, deleteproj)

// -------------------skills---------------
// POST 
router.post("/add-skil", isAuthenticated, addskil)

// POST
router.post("/edit-skil/:skilid", isAuthenticated, editskil)

// POST
router.post("/delete-skil/:skilid", isAuthenticated, deleteskil)

// -------------------accomplishments---------------
// POST 
router.post("/add-acomp", isAuthenticated, addacomp)

// POST
router.post("/edit-acomp/:acompid", isAuthenticated, editacomp)

// POST
router.post("/delete-acomp/:acompid", isAuthenticated, deleteacomp)



module.exports = router;