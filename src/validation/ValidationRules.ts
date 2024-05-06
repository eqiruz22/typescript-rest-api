import {Request,Response, NextFunction } from 'express';
import { body, check, param, validationResult } from 'express-validator'

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

const params = [
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

const bodyUserRegister = [
    body("name").notEmpty().withMessage("Field name is required"),
    body("email").notEmpty().withMessage("Field email is required"),
    body("password").notEmpty().withMessage("Field password is required"),
    check("password").isLength({min:5}).withMessage("Password must be at least 5 character"),
    body("confirmPassword").custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error("Password confirmation does not match password")
        }
        return true
    }),
    (req:Request,res:Response,next:NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({status:false,errors:errors.array()})
        }
        next()
    }
]

const bodyAndParamUserUpdate = [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").notEmpty().withMessage("Field name is required"),
    body("email").notEmpty().withMessage("Field email is required"),
    body("password").notEmpty().withMessage("Field password is required"),
    check("password").isLength({min:5}).withMessage("Password must be at least 5 character"),
    body("confirmPassword").custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error("Password confirmation does not match password")
        }
        return true
    }),
    (req:Request,res:Response,next:NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({status:false,errors:errors.array()})
        }
        next()
    }
]

const passwordRules = [
    param("id").isInt().withMessage("ID must be an integer"),
    body("password").notEmpty().withMessage("Field password is required"),
    check("password").isLength({min:5}).withMessage("Password must be at least 5 character"),
    body("confirmPassword").custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error("Password confirmation does not match password")
        }
        return true
    }),
    (req:Request,res:Response,next:NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({status:false,errors:errors.array()})
        }
        next()
    }
]

const signinRules = [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
    (req:Request,res:Response,next:NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({status:false,errors:errors.array()})
        }
        next()
    }
]
export default {
    bodyRoles,
    params,
    bodyAndParamRoles,
    bodyUserRegister,
    bodyAndParamUserUpdate,
    passwordRules,
    signinRules
}