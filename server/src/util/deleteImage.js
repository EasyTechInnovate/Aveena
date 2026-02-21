import { imagekit } from "../controller/Media/media.controller.js";
import logger from "./logger.js";

export const deleteImageFromUrl = async (url) => {
    try {
        if (!url) return;

        const filename = url.split('/').pop();

        if (!filename) {
            logger.warn(`Could not extract filename from URL: ${url}`);
            return;
        }

        const files = await imagekit.listFiles({
            searchQuery: `name = "${filename}"`,
            limit: 1
        });

        if (files && files.length > 0) {
            const fileId = files[0].fileId;
            await imagekit.deleteFile(fileId);
            logger.info(`Deleted image: ${filename} (ID: ${fileId})`);
        } else {
            logger.warn(`Image not found in ImageKit: ${filename}`);
        }
    } catch (error) {
        logger.error(`Error deleting image ${url}:`, error);
    }
};
