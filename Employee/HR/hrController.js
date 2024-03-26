const complaintSchema = require("../complaintSchema");

const applicationSchema=require('../../Applicant/applicationSchema')
const payroll=require('./payrollSchema')
const leaves=require('../../Employee/leaveSchema')
const desig=require('../../Designation/desigSchema');
const desigSchema = require("../../Designation/desigSchema");
const emps=require('../../Employee/employeeSchema');
const applicantSchema = require("../../Applicant/applicantSchema");
const interviewSchema = require("../../Employee/HR/interviewSchema");
const leaveSchema = require("../../Employee/leaveSchema");

const viewPendingComplaints=(req,res)=>{
    complaintSchema.find({status:"pending"}).populate('empid').exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }



  //update complaint status
const updateComplaintStatus=(req,res)=>{
    console.log("in here");
    complaintSchema.findByIdAndUpdate({_id:req.params.id},{status:req.body.status}).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data updated successfully"
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }

  
//view all new applications 
const viewPendingApplns=(req,res)=>{

    applicationSchema.find({status:"pending"}).
    populate('jid').
    populate('aid').exec()
    .then(data1=>{
     
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data1
        
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
    
  
  }

  
  
  // schedule Interview
  const scheduleInterview=(req,res)=>{
  console.log(req.body);
     
  let interview= new interviewSchema({
    aid:req.body.aid,
    time:req.body.time,
    venue:req.body.venue,
    date:req.body.date,
    jid:req.body.jid  
  
  })
  interview.save().then(data=>{
     res.json({
         status:200,
         msg:"Inserted successfully",
         data:data
     })
  }).catch(err=>{
     
       res.json({
           status:500,
           msg:"Please enter all the mandatory fields",
           Error:err
       })
     
   })
  
  
    
 
    
  
  }
  
  //view all Interviesws 
  const viewInterviews=(req,res)=>{
  let date=new Date()
    interviewSchema.find({date:{$gt:date}}).populate('aid')
    .populate('jid').exec()
    .then(data1=>{
     
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data1
        
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  }) 
  }

  const generatPayroll=async (req,res)=>{
        let date=new Date()
        let month=date.getMonth() +1
        let design="",allowedLeaves=0,leavesTaken=0,lop=0,bp=0,update=0
     await   emps.findById({_id:req.params.id}).exec().then(emp=>{
        design=emp.designationid
        
     }).catch(err=>{
        res.json({
            status:500,
            msg:"emp not found 1"
        })
     })

     await   desigSchema.findById({_id:design}).exec().then(des=>{
        allowedLeaves=des.leaves
        bp=des.bp
        
     }).catch(err=>{
        res.json({
            status:500,
            msg:"emp not found 2"
        })
     })

     await   leaves.findOne({empid:req.params.id,month:month}).exec().then(empss=>{
     console.log(empss);
     if(!empss)
     leavesTaken=0
     else
     leavesTaken=(Math.floor((new Date(empss.to)-new Date(empss.from)) / (1000 * 60 * 60 * 24)))+1
       
        
     }).catch(err=>{
        res.json({
            status:500,
            msg:"emp not found 3"
          
        })
     })


     console.log("data",design);
     console.log("allowedLeaves",allowedLeaves);
     console.log("leavesTaken",leavesTaken);
    
await payroll.find({empid:req.params.id,month:month}).exec().then(data4=>{
    if(data4.length==0)
    update=0
    else
    update=1
}).catch(err=>{
    res.json({
        status:500,
        msg:"emp not found 4"
      
    })
})
if(update==0){
    if(allowedLeaves>leavesTaken)
    lop=0
    else
    lop = leavesTaken-allowedLeaves
    console.log("lop",lop);
let dailysal=bp/30
sal=bp-(dailysal*lop)+parseInt(req.body.incentive)
  let pyroll=await new payroll({
     empid:req.params.id,
     date:date,
     sal:sal,
     incentive:req.body.incentive,
     comments:req.body.comments,
     lop:lop,
     leave:leavesTaken,
     month:month
    })
    pyroll.save().then(data=>{
       res.json({
           status:200,
           msg:"Inserted successfully",
           data:data
       })
    }).catch(err=>{
       
         res.json({
             status:500,
             msg:"Please enter all the mandatory fields",
             Error:err
         })
       
     })
    }
    else{
        if(allowedLeaves>leavesTaken)
        lop=0
        else
        lop = leavesTaken-allowedLeaves
        console.log("lop",lop);
   let dailysal=bp/30
   sal=bp-(dailysal*lop)+parseInt(req.body.incentive)

      await  payroll.findOneAndUpdate({empid:req.params.id,month:month},{
            date:date,
            sal:sal,
            incentive:req.body.incentive,
            comments:req.body.comments,
            lop:lop,
            leave:leavesTaken,
            month:month
           })
          .exec().then(data=>{
              res.json({
                  status:200,
                  msg:"Updated successfully"
              })
           }).catch(err=>{
              
                res.json({
                    status:500,
                    msg:"Please enter all the mandatory fields",
                    Error:err
                })
              
            })
           }
           
                 
    
  }
  
//search by skill
const searchBySkill=async (req,res)=>{
    console.log(req.body.skill);
    let opids=[]
    await applicantSchema.find({}).exec().then(data=>{

data.forEach(element => {
    element.skills.filter(x=>{
    
        if(x==req.body.skill)
        opids.push(element._id)
    })
});
    })

    .catch(err=>{
        console.log(err);
  
})

const result = await applicantSchema.find({ _id: { $in: opids } });
if(result.length>0){
    res.json({
        status:200,
        data:result
    })
}
    else{
        res.json({
            status:500,
            msg:"No data"

        })  
    
}

}

// view leavbes for an employee by empid
const viewLeavesByEmpid=(req,res)=>{
    leaveSchema.find({empid:req.params.id}).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }




  module.exports={viewPendingComplaints,updateComplaintStatus,scheduleInterview,viewInterviews,viewPendingApplns,
    generatPayroll,searchBySkill,viewLeavesByEmpid}