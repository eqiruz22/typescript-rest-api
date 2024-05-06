import express from 'express'
import RoleController from '../controllers/RoleController'
import ValidationRules from '../validation/ValidationRules'
const router = express.Router()

router.get('/roles',RoleController.GetRoles)
router.get("/role/:id", ValidationRules.params,RoleController.GetRole)
router.post('/role', ValidationRules.bodyRoles,RoleController.CreateRole)
router.patch("/role/:id", ValidationRules.bodyAndParamRoles,RoleController.UpdateRole)
router.delete("/role/:id", ValidationRules.params,RoleController.DeleteRole)

export default router