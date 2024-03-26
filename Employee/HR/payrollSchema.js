const mongoose= require("mongoose");

const Schema=mongoose.Schema({
empid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'employees'
  },
   
    date:{
        type:Date
        
    },
    sal:{
        type:Number

    },
    incentive:
    {
        type:Number

    }
   ,comments:
   {
    type:String
   },leave:Number
  ,lop:{
    type:Number
  }
   ,month:Number

});
module.exports=mongoose.model('payrolls',Schema)