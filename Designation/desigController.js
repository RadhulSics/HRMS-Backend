const employeeSchema = require('../Employee/employeeSchema')
const desig=require('./desigSchema')
const mongoose=require('mongoose')
//Desig Registration
const addDesig=(req,res)=>{
    const newdesig=new desig({
        title:req.body.title,
        bp:req.body.bp,
        leaves:req.body.leaves
       
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
//Desig Registration -- finished

// view all designations
const viewAllDesigs=(req,res)=>{
    let desigs=[]
desig.find().then(data=>{
    console.log(data);
    for(let i=0;i<data.length;i++)
        desigs.push(data[i].title)
    console.log(desigs);
    res.json({
        status:200,
        data:desigs
    })
}).catch(err=>{
    res.json({
        status:500,
        msg:"no data",
        Error:err
    })
})
}

// view all designations
const viewAllDesigNames=(req,res)=>{
    let desigs=[]
desig.find({},{_id:0,title:1}).then(data=>{
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



// view all designations for Admin
const viewAllDesigsforAdmin=(req,res)=>{

desig.find().then(data=>{
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

// Update designation
const editDesigById=(req,res)=>{

   
   
   
    desig.findByIdAndUpdate({_id:mongoose.Types.ObjectId(req.params.id)},{
        title:req.body.title,
        bp:req.body.bp,
        leaves:req.body.leaves
   
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


// remove Designation
const delDesig=async(req,res)=>{
    employeeSchema.find({designationid:mongoose.Types.ObjectId(req.params.id)}).exec()
    .then(data=>{
    console.log("stats ");
  if(data.length==0){
    desig.findByIdAndDelete({_id:mongoose.Types.ObjectId(req.params.id)})
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
      else{
        res.json({
            status:500,
            msg:"Data can't be removed",
            Error:err
        })
      }
    }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Removed",
            Error:err
        })
      })
      }
// finished

//viewDesigById
const viewDesigById=(req,res)=>{
    desig.findById({_id:mongoose.Types.ObjectId(req.params.id)})
    .exec().then(data=>{
        res.json({
            status:200,
            daa:data
        })
      }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not obtained",
            Error:err
        })
      })
      }
// finished

module.exports={addDesig,viewAllDesigs,viewDesigById,editDesigById,delDesig,viewAllDesigsforAdmin,
viewAllDesigNames
}