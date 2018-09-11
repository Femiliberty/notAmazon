const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

//create Schema
const ShoeSchema = new Schema({

    // ProductImage:{
    //     type:String,
    //     required: true
    // }, 
    name:{
        type:String,
        required: true
    }, 
    description:{
        type:String,
        required: true

    },
    sizes: {
        type:Array,
        required: true
    },
    price: {
        type:String,
        rewquired: true
    }

});
module.exports = mongoose.model('shoes', ShoeSchema)
