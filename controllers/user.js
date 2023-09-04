import { User } from "../models/user.js"
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";



export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) return next(new ErrorHandler("User Already Exist", 404));

        const hashPass = await bcrypt.hash(password, 10)

        user = await User.create({ name, email, password: hashPass });

        setCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }


}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");


        if (!user) return next(new ErrorHandler("Invalid Credentials", 404));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return next(new ErrorHandler("Invalid Credentials", 404));

        setCookie(user, res, "Login Successfull", 201);

    } catch (error) {
        next(error)

    }

}


export const getMyProfile = async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    });
}

export const logout = (req, res) => {
    res
        .status(200)
        .cookie("token", "", { 
            expires: new Date(Date.now()),
            sameSite : process.env.NODE_ENV === "development"? "lax": "none",
            secure : process.env.NODE_ENV === 'development'? false : true,  
         })
        .json({
            success: true,
            message: "Logout successfully"
        })
}