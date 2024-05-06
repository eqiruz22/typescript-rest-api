import bcrypt from "bcrypt"
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

export default {ResponseData, HashPassword,ComparePassword}