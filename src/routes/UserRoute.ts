import express from 'express'
import UserController from '../controllers/UserController'
import ValidationRules from '../validation/ValidationRules'

const router = express.Router()

router.get("/users", UserController.GetUsers)
router.get("/user/:id", ValidationRules.params,UserController.GetUser)
router.post("/register",ValidationRules.bodyUserRegister,UserController.Register)
router.post("/signin",ValidationRules.signinRules,UserController.SignInUser)
router.patch("/user/:id", ValidationRules.bodyAndParamUserUpdate,UserController.UpdateUser)
router.patch("/user/passwd/:id", ValidationRules.passwordRules,UserController.UpdateUserPassword)
router.delete("/user/:id", ValidationRules.params,UserController.DeleteUser)

export default router