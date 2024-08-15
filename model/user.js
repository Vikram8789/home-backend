import mongoose from "mongoose"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        
    },
    regNo: {
        type: String,
        required:true,

    },
    password: {
        type: String,
        required: true,
    },
    hostelName: {
        type: String,
        enum:["CV Raman","APJ","Mother Tresa"],
        default:"CV Raman",
    },
    floor: {
        type: String,
        enum:["0","1","2","3"],
        default:"3",
    },
    
    roomType: {
        type: String,
        enum: ['Single', 'Triple'],  
       
    },
    roomNo: {
        type: String,
      
    },
    userRole: {
        type: String,
        enum: ['student', 'teacher'],
        default:"student"
    }
}, {
    timestamps: true
});
userSchema.methods.getToken = function() {
    const token = jwt.sign(
        {
            _id: this._id,
        },
        process.env.JWT_SECRET,  
        { expiresIn: '1h' }       
    );
    return token;
};
export const User = mongoose.model('User', userSchema);


