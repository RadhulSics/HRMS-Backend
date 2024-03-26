const mongoose= require("mongoose");

const Schema=mongoose.Schema({
jid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'jobs'
  },
   aid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'applicants'
   },
   
    date:{
        type:Date
        
    },time:
    {
        type:String,
        required:true
    },
    venue:
    {
        type:String,
        required:true
    }
   ,comments:
   {
       type:String
   }
  
   

});
module.exports=mongoose.model('interviews',Schema)