import { clerkClient } from '@clerk/express';

export const protectAdmin = async (req, res, next) => {
    try {
        // auth() là một method của clerk, lấy ra cái userId
        const { userId } = req.auth();

        const user = await clerkClient.users.getUser(userId);

        if (user.privateMetadata.role !== 'admin') {
            return res.json({ success: false, isAdmin: false });
        }

        next();
    } catch (error) {
        return res.json({ success: false, message: 'not authorized' });
    }
};
