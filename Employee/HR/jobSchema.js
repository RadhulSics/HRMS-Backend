const mongoose= require("mongoose");
    
const Schema=mongoose.Schema({
   
    title:{
        type:String,
        required:true
    },
    date:Date,
    sal:String,
    experience:Number,
    
    skills:{
        type:Array,
        required:true
    },
    qualification:{
        type:Array,
        required:true
    },
  
    description:{
        type:String,
        required:true
    },
    isactive:{
        type:Boolean,
        default:false
    },category:{
        type:String,
        required:true
    }
});
module.exports=mongoose.model('jobs',Schema)

