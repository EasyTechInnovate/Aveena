import { z } from "zod";
import mongoose from "mongoose";

export const createTicketSchema = z.object({
    subject: z.string({
        required_error: "Subject is required"
    }).min(3, "Subject must be at least 3 characters").max(200),
    message: z.string({
        required_error: "Message is required"
    }).min(1, "Message cannot be empty"),
    mediaUrls: z.array(z.string().url("Use valid URLs for media")).optional()
});

export const replyTicketSchema = z.object({
    message: z.string({
        required_error: "Message is required"
    }).min(1, "Message cannot be empty"),
    mediaUrls: z.array(z.string().url("Use valid URLs for media")).optional()
});

export const getTicketsSchema = z.object({
    page: z.preprocess(
        (val) => Number(val || 1),
        z.number({
            invalid_type_error: "Page must be a number"
        }).positive()
    ).optional(),
    limit: z.preprocess(
        (val) => Number(val || 10),
        z.number({
            invalid_type_error: "Limit must be a number"
        }).positive().max(100)
    ).optional(),
    status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
    search: z.string().optional()
});

export const getTicketByIdSchema = z.object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid ticket ID format"
    })
});

export const updateTicketStatusSchema = z.object({
    status: z.enum(['open', 'in_progress', 'resolved', 'closed'], {
        required_error: "Status is required"
    })
});

export const getMessagesSchema = z.object({
    page: z.preprocess(
        (val) => Number(val || 1),
        z.number({
            invalid_type_error: "Page must be a number"
        }).positive()
    ).optional(),
    limit: z.preprocess(
        (val) => Number(val || 20),
        z.number({
            invalid_type_error: "Limit must be a number"
        }).positive().max(100)
    ).optional()
});
