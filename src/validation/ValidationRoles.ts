import {Request,Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator'

const bodyRoles = [
    body('roleName').notEmpty().withMessage('Field Role name is required'),
    body('active').notEmpty().withMessage("Field status active is required"),
    (req:Request,res:Response,next:NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({status:false,errors:errors.array()})
        }
        next()
    }
]

const paramRoles = [
    param("id").isInt().withMessage("ID must be an integer"),
    (req:Request,res:Response,next:NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                status:false,
                errors:errors.array()
            })
        }
        next()
    }
]

const bodyAndParamRoles = [
    body('roleName').notEmpty().withMessage('Field Role name is required'),
    body('active').notEmpty().withMessage("Field status active is required"),
    param('id').isInt().withMessage("ID must be an integer"),
    (req:Request,res:Response,next:NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({status:false,errors:errors.array()})
        }
        next()
    }
]

export default {
    bodyRoles,
    paramRoles,
    bodyAndParamRoles
}