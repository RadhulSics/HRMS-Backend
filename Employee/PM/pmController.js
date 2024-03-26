
const proj=require('./projectSchema')
const mongoose=require('mongoose')
const employeeSchema=require('../employeeSchema')
//proj Registration
const addProject=(req,res)=>{
    const newdesig=new proj({
        title:req.body.title,
        members:req.body.members,
        technology:req.body.technology,
        deadline:req.body.deadline,
        
        pmid:req.params.id
       
    })
    newdesig.save().then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
        console.log(err);
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}
//proj Registration -- finished

// view all projs
const viewAllPrjs=(req,res)=>{

proj.find().populate('members').then(data=>{
   
    // console.log(desigs);
    res.json({
        status:200,
        data:data
    })
}).catch(err=>{
    res.json({
        status:500,
        msg:"no data",
        Error:err
    })
})
}


// view all proj for Admin
// const viewAllProjectforPm=(req,res)=>{

// proj.find({pmid:req.params.id}).then(data=>{
//     console.log(data);
    
//     res.json({
//         status:200,
//         data:data
//     })
// }).catch(err=>{
//     res.json({
//         status:500,
//         msg:"no data",
//         Error:err
//     })
// })
// }
const viewAllProjectforPm=(req,res)=>{

    proj.find({pmid:req.params.id}).populate('members').exec().then(data=>{
        console.log(data);
        
        res.json({
            status:200,
            data:data
        })
    }).catch(err=>{
        res.json({
            status:500,
            msg:"no data",
            Error:err
        })
    })
    }
    
    
    

// Update Proj
const editProjyId=(req,res)=>{

   
   
   
    proj.findByIdAndUpdate({_id:(req.params.id)},{
        title:req.body.title,
        members:req.body.members,
        technology:req.body.technology,
        deadline:req.body.deadline,
        percentage:req.body.percentage
   
      })
  .exec().then(data1=>{
    res.json({
        status:200,
        msg:"Updated successfully"
    })
  }).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }




//finished view


// remove Proj
const delProj=async(req,res)=>{
    

    proj.findByIdAndDelete({_id:(req.params.id)})
    .exec().then(data=>{
        res.json({
            status:200,
            msg:"Removed successfully"
        })
      }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Removed",
            Error:err
        })
      })
    
      }
// finished

//view ById
// const viewProjById=async(req,res)=>{
//     let datass=[]
//    await proj.findById({_id:req.params.id})
//     .exec().then(data=>{
//         data.members.map(x=>{
//             employeeSchema.findById(x).exec().then(data1=>{
//                 console.log(data1.name);
//                 datass.push(data1.name)
//             })
//         })
        
//       }).catch(err=>{
//         console.log(err);
//         res.json({
//             status:500,
//             msg:"Data not obtained",
//             Error:err
//         })
//       })
//       await proj.findById({_id:req.params.id})
//       .exec().then(data=>{
//         console.log(data,datass);
//         res.json({
//             status:200,
//             data:data,
//             members:datass
//         })
//       }).catch(err=>{
//         console.log(err);
//       })
//       }
//view ById
const viewProjById=async(req,res)=>{
 
    await proj.findById({_id:req.params.id})
    .populate('members')
    .exec().then(data=>{
  
      res.json({
          status:200,
          data:data
      })
    }).catch(err=>{
      console.log(err);
      res.json({
          status:500,
          msg:"Data not obtained",
          Error:err
      })
    })
    }
// finished
// finished



// finished



//viewproj by empId
const viewProjByEmpId=(req,res)=>{
  let  result=[]
    proj.find({})
    .exec().then(data=>{
        data.filter(x=>{
            x.members.filter(y=>{
                if(y==req.params.id)
                {
                    result.push(x)
                }
        })
    })
        res.json({
            status:200,
            data:result
        })
      }).catch(err=>{
        console.log(err);
        res.json({
            status:500,
            msg:"Data not obtained",
            Error:err
        })
      })
      }
// finished
// const updatePercentage=(req,res)=>{
//     proj.findById({_id:req.params.id}).then(resp=>{

 
//     proj.findByIdAndUpdate({_id:req.params.id},{percentage:(parseInt(resp.percentage)+parseInt(req.body.percentage))})
//     .exec().then(data=>{
//         res.json({
//             status:200,
//             msg:"Updated successfully"
//         })
//       }).catch(err=>{
//         res.json({
//             status:500,
//             msg:"Data not updtd",
//             Error:err
//         })
//       }) }).catch(err=>{
//         res.json({
//             status:500,
//             msg:"Data not updtd",
//             Error:err
//         })
//       }) 
    
//       }

// const updatePercentage = (req, res) => {
//     let per = 0
//     proj.findById({ _id: req.params.id }).then(resp => {
//         per = resp.percentage + req.body.percentage
//         console.log(per);
//         if (resp.percentage == 100) {
//             res.json({
//                 status: 500,
//                 msg: "Project Already Completed"

//             })
//         }

//         else if (per >100) {
//             res.json({
//                 status: 500,
//                 msg: `only ${100 - resp.percentage}% is need to be completed`

//             })
//         }
//         else {

//             console.log(per);
//             proj.findByIdAndUpdate({ _id: req.params.id }, { percentage: (resp.percentage + req.body.percentage) })
//                 .exec().then(data => {
//                     res.json({
//                         status: 200,
//                         msg: "Updated successfully"
//                     })
//                 }).catch(err => {
//                     res.json({
//                         status: 500,
//                         msg: "Data not updtd",
//                         Error: err
//                     })
//                 })
//         }
//     }).catch(err => {
//         res.json({
//             status: 500,
//             msg: "Data not updtd",
//             Error: err
//         })
//     })
// }

const updatePercentage = (req, res) => {
    let per = 0
    proj.findById({ _id: req.params.id }).then(resp => {
        per = resp.percentage +parseInt(req.body.percentage)
        console.log(per);
        if (resp.percentage == 100) {
            res.json({
                status: 500,
                msg: "Project Already Completed"

            })
        }

        else if (per >100) {
            res.json({
                status: 500,
                msg: `only ${100 - resp.percentage}% is need to be completed`

            })
        }
        else {

            console.log(per);
            proj.findByIdAndUpdate({ _id: req.params.id }, { percentage: (resp.percentage + parseInt(req.body.percentage)) })
                .exec().then(data => {
                    res.json({
                        status: 200,
                        msg: "Updated successfully"
                    })
                }).catch(err => {
                    res.json({
                        status: 500,
                        msg: "Data not updtd",
                        Error: err
                    })
                })
        }
    }).catch(err => {
        res.json({
            status: 500,
            msg: "Data not updtd",
            Error: err
        })
    })
}




module.exports={addProject,viewAllPrjs,viewAllProjectforPm,viewProjByEmpId,delProj,editProjyId,updatePercentage,viewProjById
}