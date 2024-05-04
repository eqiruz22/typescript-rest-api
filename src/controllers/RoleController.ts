import { Request,Response } from "express";
import Role from "../db/models/Role";

const GetRoles = async(req:Request,res:Response):Promise<Response> => {
    try {
        const roles = await Role.findAll({
            where:{
                active:true
            }
        })
        return res.status(200).json({
            message:"Show all",
            data:roles
        })
    } catch (error:any) {
        console.log(error)
        if (error != null && error instanceof Error){
            return res.status(500).json({
                error:"true",
                message:error
            })
        }
        return res.status(500).send({
            status:false,
            message:"Internal server error",
            errors:error
        })
    }
}

export default {
    GetRoles
}