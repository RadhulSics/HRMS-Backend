
const mongoose=require('mongoose')

const jobSchema=require('./jobSchema')

//add job 

const addJob=(req,res)=>{

let date=new Date()
    const job=new jobSchema({
      
      title:req.body.title,
      date:date,
      sal:req.body.sal,
      experience:req.body.experience,
      skills:req.body.skills,
      
        qualification:req.body.qualification,
        description:req.body.description,
        category:req.body.category
    })
    job.save().then(data=>{
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
  



//View all employer

const viewJobs=(req,res)=>{

  jobSchema.find().sort({date: -1}).exec()
  .then(data=>{
   
    if(data.length>0){
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
  console.log(err);
    res.json({
        status:500,
        msg:"No Data obtained",
        Error:err
    })
})

}

// view jobs finished


//View  Job by ID

const viewJobById=(req,res)=>{
  jobSchema.findOne({_id:req.params.id}).exec()
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


const viewJobByCat=(req,res)=>{
  jobSchema.find({category:req.params.category}).exec()
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




const deleteJobById=(req,res)=>{

  jobSchema.findByIdAndDelete({_id:req.params.id}).exec()
  .then(data=>{
   
    res.json({
        status:200,
        msg:"Data removed successfully",
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

module.exports={addJob,viewJobById,viewJobs,deleteJobById,viewJobByCat}