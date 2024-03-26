const mongoose= require("mongoose");
const schema=mongoose.Schema({

    empid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'employees'
    },
    date:{
            type:Date,
            required:true
    },complaint:{
        type:String,
       required:true
    },
    // type:{
    //     type:String,
    //    required:true
    // },
    status:{
        type:String,
       default:"pending"
    }
 
});
    module.exports=mongoose.model('complaints',schema)
