const { userInfo } = require("os");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid'); 

exports.resume = catchAsyncErrors(async(req, res, next)=>{
    const {resume} = await Student.findById(req.id).exec();
    res.json({message:"secure resume page", resume})
})

// --------------------------education---------------------

exports.addeducation = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"education added"})
})

exports.editeducation = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid)
   student.resume.education[eduIndex] = {...student.resume.education[eduIndex], ...req.body}
    await student.save();
    res.json({message:"education updated"})
})

exports.deleteeducation = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const filterededu = student.resume.education.filter((i) => i.id !== req.params.eduid)
   student.resume.education = filterededu;
    await student.save();
    res.json({message:"education deleted"})
})

// --=------------------------jobs--------------------------
exports.addjobs = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"job added"})
})

exports.editjobs = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const jobIndex = student.resume.jobs.findIndex((i) => i.id === req.params.jobid)
   student.resume.jobs[jobIndex] = {...student.resume.jobs[jobIndex], ...req.body}
    await student.save();
    res.json({message:"job updated"})
})

exports.deletejobs = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const filteredjob = student.resume.jobs.filter((i) => i.id !== req.params.jobid)
   student.resume.jobs = filteredjob;
    await student.save();
    res.json({message:"job deleted"})
})

// --=------------------------internships--------------------------
exports.addinternship = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"job added"})
})

exports.editinternship = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const internIndex = student.resume.internships.findIndex((i) => i.id === req.params.internid)
   student.resume.internships[internIndex] = {...student.resume.internships[internIndex], ...req.body}
    await student.save();
    res.json({message:"job updated"})
})

exports.deleteinternship = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const filteredintern = student.resume.internships.filter((i) => i.id !== req.params.internid)
   student.resume.internships = filteredintern;
    await student.save();
    res.json({message:"job deleted"})
})

// --------------------------responsibilities--------------------------
exports.addresp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"job added"})
})

exports.editresp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const respIndex = student.resume.responsibilities.findIndex((i) => i.id === req.params.respid)
   student.resume.responsibilities[respIndex] = {...student.resume.responsibilities[respIndex], ...req.body}
    await student.save();
    res.json({message:"job updated"})
})

exports.deleteresp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const filteredresp = student.resume.responsibilities.filter((i) => i.id !== req.params.respid)
   student.resume.responsibilities = filteredresp;
    await student.save();
    res.json({message:"job deleted"})
})

// --------------------------courses--------------------------
exports.addcours = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"project added"})
})

exports.editcours = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const coursIndex = student.resume.project.findIndex((i) => i.id === req.params.coursid)
   student.resume.courses[coursIndex] = {...student.resume.courses[coursIndex], ...req.body}
    await student.save();
    res.json({message:"project updated"})
})

exports.deletecours = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const filteredcours = student.resume.courses.filter((i) => i.id !== req.params.coursid)
   student.resume.courses = filteredcours;
    await student.save();
    res.json({message:"project deleted"})
})


// --------------------------projects--------------------------
exports.addproj = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"project added"})
})

exports.editproj = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const projIndex = student.resume.project.findIndex((i) => i.id === req.params.projid)
   student.resume.projects[projIndex] = {...student.resume.projects[projIndex], ...req.body}
    await student.save();
    res.json({message:"project updated"})
})

exports.deleteproj = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const filteredproj = student.resume.projects.filter((i) => i.id !== req.params.projid)
   student.resume.projects = filteredproj;
    await student.save();
    res.json({message:"project deleted"})
})

// --------------------------skills--------------------------
exports.addskil = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"skill added"})
})

exports.editskil = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const skilIndex = student.resume.skills.findIndex((i) => i.id === req.params.skilid)
   student.resume.skills[skilIndex] = {...student.resume.skills[skilIndex], ...req.body}
    await student.save();
    res.json({message:"skill updated"})
})

exports.deleteskil = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const filteredskil = student.resume.skills.filter((i) => i.id !== req.params.skilid)
   student.resume.skills = filteredskil;
    await student.save();
    res.json({message:"skill deleted"})
})

// --------------------------accomplishments--------------------------
exports.addacomp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id:uuidv4()});
    await student.save();
    res.json({message:"accomplishments added"})
})

exports.editacomp = catchAsyncErrors(async(req, res, next)=>{
    const student = await Student.findById(req.id).exec();
   const acompIndex = student.resume.accomplishments.findIndex((i) => i.id === req.params.acompid)
   student.resume.accomplishments[acompIndex] = {...student.resume.accomplishments[acompIndex], ...req.body}
    await student.save();
    res.json({message:"accomplishments updated"})
})

exports.deleteacomp = catchAsyncErrors(async(req, res, next)=>{ 
    const student = await Student.findById(req.id).exec();
   const filteredacomp = student.resume.accomplishments.filter((i) => i.id !== req.params.acompid)
   student.resume.accomplishments = filteredacomp;
    await student.save();
    res.json({message:"accomplishments deleted"})
})

