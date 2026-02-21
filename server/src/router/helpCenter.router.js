import { Router } from 'express';
import helpCenterController from '../controller/HelpCenter/helpCenter.controller.js';
import authentication from '../middleware/authentication.js';
import validator from '../middleware/validator.js';
import {
    createTicketSchema,
    replyTicketSchema,
    getTicketsSchema,
    getTicketByIdSchema,
    updateTicketStatusSchema,
    getMessagesSchema
} from '../schemas/ticket.schema.js';

const router = Router();

router.use(authentication); // Protect all routes

router.post('/', validator(createTicketSchema, "body"), helpCenterController.create);
router.get('/', validator(getTicketsSchema, "query"), helpCenterController.getAll);
router.get('/:id', validator(getTicketByIdSchema, "params"), helpCenterController.getById);
router.get('/:id/messages', validator(getTicketByIdSchema, "params"), validator(getMessagesSchema, "query"), helpCenterController.getMessages);
router.post('/:id/reply', validator(getTicketByIdSchema, "params"), validator(replyTicketSchema, "body"), helpCenterController.reply);
router.patch('/:id/status', validator(getTicketByIdSchema, "params"), validator(updateTicketStatusSchema, "body"), helpCenterController.updateStatus);
router.patch('/:id/close', validator(getTicketByIdSchema, "params"), helpCenterController.close);

export default router;
