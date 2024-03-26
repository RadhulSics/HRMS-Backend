const express=require('express')
const router=express.Router()
const employee=require('./Employee/employeeController')
const desig=require('./Designation/desigController')
const applicant=require('./Applicant/applicantController')
const jobs=require('./Employee/HR/jobController')
const hr=require('./Employee/HR/hrController')
const pm=require('./Employee/PM/pmController')


//employee routes
router.post('/registerEmployee',employee.registerEmp)//done
router.post('/loginEmployee',employee.login)//done
router.post('/viewEmployees',employee.viewEmps)//done
router.post('/viewEmpById/:id',employee.viewEmpById)//done
router.post('/editEmployeeById/:id',employee.editEmpById)//done
router.post('/forgotPwdEmployee',employee.forgotPwd)//done
router.post('/deleteEmployeeById/:id',employee.deleteUserById)//done
router.post('/viewComplaintStatus/:id',employee.viewComplaintStatus)//done
router.post('/addComplaint/:id',employee.registerComplaint)//done
router.post('/viewPayrollByEmpId/:id',employee.viewPayrollByEmpId)//done


//designation
router.post('/viewallDesignationforAdmin',desig.viewAllDesigsforAdmin)//done
router.post('/addDesignation',desig.addDesig)//done
router.post("/viewAllDesginayions",desig.viewAllDesigs)//done
router.post("/editDesignationById/:id",desig.editDesigById)//done
router.post("/deleteDesignationById/:id",desig.delDesig)//done
router.post("/viewDesignationById/:id",desig.viewDesigById)
router.post("/viewAllDesigNames",desig.viewAllDesigNames)


//applicant routes
router.post('/registerApplicant',applicant.registerApplicant)//done
router.post('/loginApplicant',applicant.login)//done
router.post('/viewApplicant/:id',applicant.viewApplicantById)//done
router.post('/editApplicantsById/:id',applicant.editApplicantById)//done
router.post('/forgotPwdApplicant',applicant.forgotPwd)//done
router.post('/deleteApplicantById/:id',applicant.deleteUserById)//done
router.post('/viewApplicants',applicant.viewApplicants)//done
router.post('/applyJob',applicant.applyJob)//done
router.post('/viewApplicantInterviewById/:id',applicant.viewApplicantInterviewById)//done

//job routes
router.post('/addJob',jobs.addJob)//done
router.post('/viewJobByCat/:category',jobs.viewJobByCat)//done
router.post('/viewJobById/:id',jobs.viewJobById)
router.post('/deleteJobById/:id',jobs.deleteJobById)//done

router.post('/viewJobs',jobs.viewJobs)//done

router.post('/viewPendingComplaints',hr.viewPendingComplaints)//done
router.post('/updateComplaintStatus/:id',hr.updateComplaintStatus)//done

router.post('/viewPendingApplns',hr.viewPendingApplns)//don
router.post('/viewInterviews',hr.viewInterviews)//done
router.post('/scheduleInterview',hr.scheduleInterview)//done
router.post('/generatPayroll/:id',hr.generatPayroll)//done
router.post('/searchBySkill',hr.searchBySkill)//--------------------------------nop
router.post('/viewLeavesByEmpid/:id',hr.viewLeavesByEmpid)


//leave and payroll
router.post('/applyLeave/:id',employee.applyLeave)//done

//projects
router.post('/addProject/:id',pm.addProject)//done
router.post('/viewAllPrjs',pm.viewAllPrjs)//---------admin
router.post('/viewAllProjectforPm/:id',pm.viewAllProjectforPm)//done
router.post('/viewProjByEmpId/:id',pm.viewProjByEmpId)
router.post('/editProjyId/:id',pm.editProjyId)//done
router.post('/delProj/:id',pm.delProj)//done
router.post('/viewProjById/:id',pm.viewProjById)//done
router.post('/updatePercentage/:id',pm.updatePercentage)//done

module.exports=router