import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()

interface UserData {
    name:string | null,
    email:string | null,
    roleId:number | null,
    verified:boolean | null,
    active:boolean | null
}

const ResponseData = (status:number,message:string | null,error:any | null, data:any | null) => {
    if (error != null && error instanceof Error){
        const response = {
            status:status,
            message:error.message,
            errors:error,
            data:null
        }
        return response
    }
    const res = {
        status,
        message,
        errors:error,
        data:data
    }
    return res;
}

const HashPassword = async(password:string):Promise<string> => {
        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const hash = await bcrypt.hash(password,salt)
        return hash
}

const ComparePassword = async(password:string,hashPassword:string):Promise<boolean> => {
    const match = await bcrypt.compare(password,hashPassword)
    return match
}

const GenerateToken = (data:any):string=>{
    const token = jwt.sign(data,process.env.TOKEN as string,{expiresIn:"10m"})
    return token;
}

const GenerateRefreshToken = (data:any):string => {
    const refreshToken = jwt.sign(data,process.env.REFRESH_TOKEN as string,{expiresIn:"1d"})
    return refreshToken
}

const ExtractToken = (token:string):UserData | null => {
    const secretKey:string = process.env.TOKEN as string
    let resData: any
    jwt.verify(token,secretKey,(err,decoded) => {
        if (err) {
            resData = null
        } else {
            resData = decoded
        }
    })
    if(resData){
        const result:UserData = <UserData>(resData)
        return result
    }
    return null
}

const ExtractRefreshToken = (token:string):UserData | null => {
    const secretKey:string = process.env.REFRESH_TOKEN as string
    let resData: any
    jwt.verify(token,secretKey,(err,decoded) => {
        if (err) {
            resData = null
        } else {
            resData = decoded
        }
    })
    if(resData){
        const result:UserData = <UserData>(resData)
        return result
    }
    return null
}

export default {ResponseData, HashPassword,ComparePassword,GenerateToken, GenerateRefreshToken, ExtractToken,ExtractRefreshToken}