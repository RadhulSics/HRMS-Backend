const mongoose= require("mongoose");

const Schema=mongoose.Schema({
aid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'applicants'
  },
    jid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'jobs'
    },
    
    date:{
        type:Date
        
    },status:
    {
        type:String,
        default:"pending"
    }
   

});
module.exports=mongoose.model('applications',Schema)