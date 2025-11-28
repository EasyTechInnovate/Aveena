import locationModel from "../models/location.model.js";



export default async (location) => {
    
    try {

        const rootLocation = await locationModel.findOne({
        name: { $regex: new RegExp(`^${location.trim()}$`, "i") }
        }).lean();
        
        if(!rootLocation) return [];

        const ids = [rootLocation._id];

        async function findChlidrenLocations(parentId) {
            const childrens = await locationModel.find({
                parentLocationId: parentId
            }).lean();
            
            for (const child of childrens) {
                ids.push(child._id);
                await findChlidrenLocations(child._id);
            }
        }

        await findChlidrenLocations(rootLocation._id);
        return ids;

    } catch (error) {
        console.error(error);
        return new Error('Error while fetching location.');
    }
}