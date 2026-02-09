import { Router } from 'express';
import teamController from '../controller/User/team.controller.js';
import authentication from '../middleware/authentication.js';
import { checkPermission } from '../middleware/authorization.js';
import validator from '../middleware/validator.js';
import { addTeamMemberSchema, updateTeamMemberSchema } from '../schemas/team.schema.js';

const router = Router();


router.use(authentication);


router.get('/members', checkPermission('teamManagement', 'read'), teamController.getTeamMembers);


router.post('/member', checkPermission('teamManagement', 'edit'), validator(addTeamMemberSchema, "body"), teamController.addTeamMember);


router.put('/member/:memberId', checkPermission('teamManagement', 'edit'), validator(updateTeamMemberSchema, "body"), teamController.updateTeamMember);


router.delete('/member/:memberId', checkPermission('teamManagement', 'edit'), teamController.deleteTeamMember);

export default router;
