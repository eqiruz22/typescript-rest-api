import { Request,Response } from "express";
import Role from "../db/models/Role";

const GetRoles = async(req:Request,res:Response):Promise<Response> => {
    try {
        const roles = await Role.findAll({
            attributes:['id','roleName','active','createdAt','updatedAt']
        })
        return res.status(200).json({
            message:"Show all",
            data:roles
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status:false,
            message:"Internal server error",
            errors:error instanceof Error ? error.message : 'unknown error'
        })
    }
}

const CreateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { roleName, active } = req.body;
        const create = await Role.create({
            roleName,
            active
        });
        console.log(create)
        return res.status(201).json({
            status: true,
            message: 'Successfully created a new role'
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

const GetRole = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {id} = req.params
        const data = await Role.findByPk(id)
        if(!data){
            return res.status(404).json({
                status:true,
                message:'Not found',
                data:null
            })
        }
        return res.status(200).json({
            status:true,
            message:"show role by id",
            data:data
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

const UpdateRole = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {id} = req.params
        const {roleName,active} = req.body
        const data = await Role.findByPk(id)
        if(!data){
            return res.status(404).json({
                status:true,
                message:'Not found',
            })
        }
        data.roleName = roleName
        data.active = active
        await data.save()
        return res.status(200).json({
            status:true,
            message:"Success update"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

const DeleteRole = async(req:Request,res:Response):Promise<Response>=>{
    try {
        const {id} = req.params
        const data = await Role.findByPk(id)
        if(!data){
            return res.status(404).json({
                status:true,
                message:'Not found',
            })
        }
        await data.destroy()
        return res.status(200).json({
            status:true,
                message:"Success delete"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }

}
export default {
    GetRoles,
    GetRole,
    CreateRole,
    UpdateRole,
    DeleteRole
}