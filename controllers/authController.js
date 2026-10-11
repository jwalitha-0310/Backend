const bcrypt = require("bcryptjs");
const user = require("../models/User");
const {makeToken} = require("../utils/makeToken");

exports.register=async(req,res,next)=>{
    try{
        const{name, email, password, confirmPassword}=req.body;

        if(!name){
            return res.status(400).json({
                message:"Name not found"
            })
        }
        if(!email){
            return res.status(400).json({
                message:"email not found"
            })
        }
        if(!password || !confirmPassword){
            return res.status(400).json({
                message:"enter password or confirm password"
            })
        }
        if(password!=confirmPassword){
            return res.status(400).json({
                message:"password and confirm password are not same"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const User =await user.create({
            name,email,password:hashedPassword
        })

        return res.status(201).json({
            id:User.id,
            name:User.name,
            email:User.email
        });
    }catch(err){
        next(err);
    }  
}

exports.login=async(req,res,next)=>{
    try
    {
        const {email,password}=req.body;

        if(!email){
            return res.status(401).json({
                message:"Email not found"
            })
        }

        if(!password){
            return res.status(401).json({
                message:"Password not found"
            })
        }
        
        const User =await user.findOne({email}).select("+password");
        if(!User){
            return res.status(401).json({
                message:"User not found"
            });
        }

        const ok=await bcrypt.compare(password,User.password);
        if(!ok){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        res.status(200).json({
            token:await makeToken(User)
        });
    }
    catch(err){
        next(err);
    }
}