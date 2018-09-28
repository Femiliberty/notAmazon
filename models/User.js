const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({

    // ProductImage:{
    //     type:String,
    //     required: true
    // },
    
    name:{
        type:String,
        required:true
    },

    isAdmin:{
        type: Boolean, default: false, required:true
    },

    // UserLoginCount:{
    //   Type: number
    // },

    // UserLockoutCount:{
    //   Type:boolean
    // },
     

    email:{
        type:String,
        required: true
    }, 
    password:{
        type:String,
        required: true

    },
    
    
});
mongoose.model('users', UserSchema);