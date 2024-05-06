import { Request,Response } from "express";
import User from "../db/models/User";
import Helper from '../helpers/Helper'
import sequelizeConnect from "../config/connection";

const Register = async (req:Request,res:Response):Promise<Response> => {
    const transaction = await sequelizeConnect.transaction()
    try {
        const {name,email,password} = req.body
        const hash = await Helper.HashPassword(password)
        const data = await User.create({
            name,
            email,
            password:hash,
            active:true,
            verified:true,
            roleId:1
        },{transaction:transaction})
        const responseData = data.get({plain:true})
        await transaction.commit()
        delete responseData.password
        return res.status(201).send(Helper.ResponseData(201,"Created new user",null,responseData))
    } catch (error:any) {
        console.log(error)
        await transaction.rollback()
        delete error.errors[0]['instance']
        return res.status(500).send(Helper.ResponseData(500,"",error,null))
    }
}

const GetUsers = async (req:Request,res:Response):Promise<Response> => {
    try {
        const data = await User.findAll({
            attributes:["id","name","email","roleId","createdAt","updatedAt"]
        })
        return res.status(200).send(Helper.ResponseData(200,"Show all user",null,data))
    } catch (error:any) {
        console.log(error)
        delete error.errors[0]['instance']
        return res.status(500).send(Helper.ResponseData(500,"",error,null))
    }
}

const UpdateUser = async (req:Request,res:Response):Promise<Response> => {
    const transaction = await sequelizeConnect.transaction()
    try {
        const {id} = req.params
        const {name,email,roleId,verified,active} = req.body
        const data = await User.findOne({
            where:{id:id},
            attributes:["id","name","email","roleId","verified","active","createdAt","updatedAt"]
        })        
        if (!data){
            return res.status(404).send(Helper.ResponseData(404,"Not Found",null,null))
        }
        data.name = name
        data.email = email
        data.verified = verified
        data.active = active
        data.roleId = roleId
        await data.save()
        await transaction.commit()
        return res.status(200).send(Helper.ResponseData(200,"Update success",null,data))
    } catch (error:any) {
        console.log(error)
        await transaction.rollback()
        return res.status(500).send(Helper.ResponseData(500,"",error.errors,null))
    }
}

const UpdateUserPassword = async (req:Request,res:Response):Promise<Response> => {
    const transaction = await sequelizeConnect.transaction()
    try {
        const {id} = req.params
        const {password} = req.body
        const hash = await Helper.HashPassword(password)
        const data = await User.findByPk(id)
        if (!data){
            return res.status(404).send(Helper.ResponseData(404,"Not Found",null,null))
        }
        data.password = hash
        await data.save()
        await transaction.commit()
        return res.status(200).send(Helper.ResponseData(200,"Update Password success",null,null))
    } catch (error:any) {
        console.log(error)
        await transaction.rollback()
        return res.status(500).send(Helper.ResponseData(500,"",error.errors,null))
    }
}

const GetUser = async (req:Request,res:Response):Promise<Response> => {
    try {
        const {id} = req.params
        const data = await User.findOne({
            where:{id:id},
            attributes:["id","name","email","roleId","verified","active","createdAt","updatedAt"]
        })
        if (!data){
            return res.status(404).send(Helper.ResponseData(404,"Not Found",null,null))
        }
        return res.status(200).send(Helper.ResponseData(200,"Show user",null,data))
    } catch (error:any) {
        console.log(error)
        return res.status(500).send(Helper.ResponseData(500,"",error.errors,null))
    }
}

const DeleteUser = async (req:Request,res:Response):Promise<Response> => {
    const transaction = await sequelizeConnect.transaction()
    try {
        const {id} = req.params
        const data = await User.findByPk(id)
        if (!data){
            return res.status(404).send(Helper.ResponseData(404,"Not Found",null,null))
        }
        await data.destroy()
        await transaction.commit()
        return res.status(200).send(Helper.ResponseData(200,"Delete Success",null,null))
    } catch (error:any) {
        console.log(error)
        await transaction.rollback()
        return res.status(500).send(Helper.ResponseData(500,"",error.errors,null))
    }
}

const SignInUser = async (req:Request,res:Response):Promise<Response> => {
    try {
        const {email,password} = req.body
        const data = await User.findOne({
            where:{email:email}
        })
        if(!data){
            return res.status(401).send(Helper.ResponseData(401,"Unauthorized",null,null))
        }
        const match = await Helper.ComparePassword(password,data['password'])
        if(!match){
            return res.status(401).send(Helper.ResponseData(401,"Unauthorized",null,null))
        }
        
        const dataUser = {
            name: data.name,
            email: data.email,
            verified: data.verified,
            roleId: data.roleId,
            active: data.active,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }
        const token = Helper.GenerateToken(dataUser)
        const refreshToken = Helper.GenerateRefreshToken(dataUser)

        data.accessToken = refreshToken
        await data.save()
        res.cookie("refreshToken", refreshToken, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000
        })

        const responseData= {
            name: data.name,
            email: data.email,
            verified: data.verified,
            roleId: data.roleId,
            active: data.active,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            token:token
        }
        return res.status(200).send(Helper.ResponseData(200,"Success sign in",null,responseData))
    } catch (error:any) {
        console.log(error)
        return res.status(500).send(Helper.ResponseData(500,"",error.errors,null))
    }
}

export default {
    Register,
    GetUsers,
    GetUser,
    UpdateUser,
    DeleteUser,
    UpdateUserPassword,
    SignInUser
}