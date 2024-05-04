import express from 'express'
import RoleController from '../controllers/RoleController'
import ValidationRoles from '../validation/ValidationRoles'
const router = express.Router()



router.get('/roles',RoleController.GetRoles)
router.get("/role/:id", ValidationRoles.paramRoles,RoleController.GetRole)
router.post('/role', ValidationRoles.bodyRoles,RoleController.CreateRole)
router.patch("/role/:id", ValidationRoles.bodyAndParamRoles,RoleController.UpdateRole)
router.delete("/role/:id", ValidationRoles.paramRoles,RoleController.DeleteRole)
export default router