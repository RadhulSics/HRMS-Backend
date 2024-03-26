const mongoose = require("mongoose");

const desigSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,

        dropDups: true
    },
    deadline: {
        type: Date,
        required: true
    },
    percentage: {
        type: Number, default: 0
    },

    members: {
        type: [{

            type: mongoose.Schema.Types.ObjectId,
            ref: 'employees'
        }]
    }, technology: {
        type: String
    },
    pmid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'employees'
    }
});
module.exports = mongoose.model('projects', desigSchema)
