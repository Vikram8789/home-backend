import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization || req.headers.Authorization;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Access denied. No token provided."
            });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({
            success: false,
            message: "Invalid token."
        });
    }
};

export const isAdmin = async (req, res, next) => {


    try {
        const token = req.headers.authorization || req.headers.Authorization;
        if (!token) {
            return res.status(401).send("Access denied. No token provided.");
        }

        const formattedToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
        const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET);
        req.user = decoded;


        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send("User not found.");
        }


        if (user.userRole !== 'teacher') {
            return res.status(403).send("Access denied. Admins only.");
        }

        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};


