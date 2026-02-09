import User from "../../models/user.model.js";
import httpResponse from "../../util/httpResponse.js";
import httpError from "../../util/httpError.js";
import quicker from "../../util/quicker.js";
import responseMessage from "../../constant/responseMessage.js";

export default {
    addTeamMember: async (req, res, next) => {
        try {
            const { firstName, lastName, email, password, permissions } = req.body;
            const ownerId = req.user.userId;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return httpError(next, new Error(responseMessage.ERROR.ALREADY_EXISTS('User with this email')), req, 400);
            }

            const hashedPassword = quicker.hashPassword(password);

            const newMember = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                teamId: ownerId,
                roleLabel: 'Team Member',
                permissions,
                isProfileComplete: true,
                type: 'team_member'
            });

            newMember.password = undefined;

            return httpResponse(req, res, 201, responseMessage.SUCCESS, newMember);

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    getTeamMembers: async (req, res, next) => {
        try {
            const ownerId = req.user.userId;

            const members = await User.find({ teamId: ownerId }).select('-password');

            return httpResponse(req, res, 200, responseMessage.SUCCESS, members);
        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    updateTeamMember: async (req, res, next) => {
        try {
            const { memberId } = req.params;
            const updates = req.body;
            const ownerId = req.user.userId;

            const member = await User.findOne({ _id: memberId, teamId: ownerId });

            if (!member) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Team member')), req, 404);
            }


            if (updates.firstName) member.firstName = updates.firstName;
            if (updates.lastName) member.lastName = updates.lastName;
            if (updates.permissions) member.permissions = updates.permissions;
            if (updates.permissions) member.permissions = updates.permissions;

            await member.save();

            return httpResponse(req, res, 200, responseMessage.customMessage('Team member updated successfully'), member);

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    },

    deleteTeamMember: async (req, res, next) => {
        try {
            const { memberId } = req.params;
            const ownerId = req.user.userId;

            const result = await User.deleteOne({ _id: memberId, teamId: ownerId });

            if (result.deletedCount === 0) {
                return httpError(next, new Error(responseMessage.ERROR.NOT_FOUND('Team member')), req, 404);
            }

            return httpResponse(req, res, 200, responseMessage.customMessage('Team member removed successfully'));

        } catch (error) {
            return httpError(next, error, req, 500);
        }
    }
}
