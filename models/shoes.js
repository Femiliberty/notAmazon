const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

//create Schema
const ShoeSchema = new Schema({

    img:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required: false
    }, 
    description:{
        type:String,
        required: false
    },
    sizes: {
        type:Array,
        required: false
    },
    price: {
        type:Number,
        required: false
    }

});
module.exports = mongoose.model('shoes', ShoeSchema)
