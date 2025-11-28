import createOrGetLocation from './createOrGetLocation.js';
import httpError from './httpError.js';


export default async (locationDetails) => {

    try {
        let country, state, city, area;
        
        if(locationDetails.country) {
            country = await createOrGetLocation({
                name: locationDetails.country,
                type: 'country'
            });
        }

        if(locationDetails.state) {
            state = await createOrGetLocation({
                name: locationDetails.state,
                type: 'state',
                parentId: country._id
            });
        }

        if(locationDetails.city) {
            city = await createOrGetLocation({
                name: locationDetails.city,
                type: 'city',
                parentId: state._id
            });
        }

        if(locationDetails.area) {
            area = await createOrGetLocation({
                name: locationDetails.area,
                type: 'area',
                parentId: city._id
            });
        }

        return {
            country,
            state,
            city,
            area,
            locationId: area?._id || city?._id || state?._id
        }

    } catch (error) {
        throw new Error(error || 'Not able to create locatiuon hierarchy.');
    }
}