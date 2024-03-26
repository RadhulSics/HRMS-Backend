const mongoose= require("mongoose");

const Schema=mongoose.Schema({
empid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'employees'
  },
   
    date:{
        type:Date
        
    },from:
    {
        type:Date,
        required:true
    },
    to:
    {
        type:Date,
        required:true
    },
    type:
    {
        type:String,
        required:true
    }
   ,comments:
   {
    type:String
   }
  ,month:{
    type:Number
  }
   

});
module.exports=mongoose.model('leaves',Schema)