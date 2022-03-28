const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema({
    //dog_id, dog_name, dog_desc, dog_dob, dog_status, dog_img
    dog_id:{
        type: String, 
        unique: true,
        trim: true,
        required: true
    },
    dog_name:{ //title
        type: String, 
        trim: true,
        required: true
    },
    dog_desc:{
        type: String, 
        required: true
    },
    dog_dob:{
        type: String, 
        required: true
    },
    dog_status:{
        type: Boolean, 
        default: false
    },
    dog_img:{
        type: String//,required: true
    }
},{
    timestamps: true//important
})

module.exports = mongoose.model("Dogs", dogSchema)