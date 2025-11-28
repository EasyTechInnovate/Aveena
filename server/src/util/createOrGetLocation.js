import slugify from 'slugify';
import locationModel from '../models/location.model.js';

export default async ({name, type, parentId, placeId}) => {

    if(!name || !type) return null;
    
    const slug = slugify(`${name}-${type}`, { lower: true, strict: true });

    const location = await locationModel.findOneAndUpdate({
        name: name.trim(),
        type: type,
        parentLocationId: parentId || null
    }, {
        $setOnInsert: {
            name: name.trim(),
            slug: slug,
            type: type,
            parentLocationId: parentId || null,
            placeId: placeId || null
        }
    }, {
        new: true,
        upsert: true
    }).lean();

    return location;
}