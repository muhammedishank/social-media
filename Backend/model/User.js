const mongoose = require("mongoose")
const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        require:[true,"please add a name"],
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:[true,"Please add an email"],
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        min:5
    },
    phone:{
        type:Number,
        required:[true,'Please add Phone Number'],
       
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},
{timestamps:true}
)

module.exports = mongoose.model("User",UserSchema)