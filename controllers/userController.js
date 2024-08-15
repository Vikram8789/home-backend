import { User } from "../model/user.js";
import { SendToken } from "../utils/sendToken.js";

export const userGet = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            success: true,
            message: "User get",
            user
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "someting went wrong",
            error: e,
        })
    }
}
export const userPost = async (req, res) => {
    try {
        const { userName, regNo, password, hostelName, floor
            , roomType, roomNo,userRole


        } = req.body;
        const user = await User.findOne({ regNo: regNo });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "regestration no already exist",

            })
        }
        const isAdminUser=userRole==="teacher"?"teacher":"student"
        const userInfo = await User.create({
            userName, regNo, password, hostelName, floor
            , roomType, roomNo,userRole:isAdminUser
        });
        SendToken(201, "regestration success", res, userInfo);


    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "someting went wrong",
            error: e,
        })
    }
}
export const userLogin = async (req, res) => {
    try {
const {regNo,password}=req.body;
const user=await User.findOne({regNo:regNo});
if(!user){
    return res.status(404).json({
        success: false,
        message: "incorrect username or password",
        
    })
}

if(user.password!==password){
    return res.status(404).json({
        success: false,
        message: "incorrect username or password",
        
    })
}
SendToken(201, `welcome back`, res, user);

    } catch (e) {
        res.status.json({
            success: false,
            message: "someting went wrong",
            error: e,
        })
    }
}
export const userPut = async (req, res) => {
    try {

    } catch (e) {
        res.status.json({
            success: false,
            message: "someting went wrong",
            error: e,
        })
    }
}
export const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User delete",
            user
        })
    } catch (e) {
        res.status.json({
            success: false,
            message: "someting went wrong",
            error: e,
        })
    }
}
export const userCurrent = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.find(_id);
        res.status(200).json({
            success: true,
            message: "current user",
            user
        })
    } catch (e) {
        res.status.json({
            success: false,
            message: "someting went wrong",
            error: e,
        })
    }
}


export const userSingleGet = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({
            success: true,
            message: "User get",
            user
        })
    } catch (e) {
        res.status.json({
            success: false,
            message: "someting went wrong",
            error: e,
        })
    }
}   