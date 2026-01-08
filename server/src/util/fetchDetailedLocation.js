import config from "../config/config.js";


export default async (latitude, longitude) => {
    try {
        
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.google.apiKey}`
        );
        const data = await res.json();
        
        if (data.status !== "OK") {
            console.error(data);
            
            throw new Error("Failed to fetch location details");
        }
        
        const find = (types) =>
        data.results[0].address_components.find((comp) =>
            comp.types.some(t => types.includes(t))
        );

        const result = data.results[0];
        const countryComp = find(["country"]);
        const stateComp = find(["administrative_area_level_1"]);
        const cityComp = find(["locality", "administrative_area_level_3", "administrative_area_level_2"]);
        const areaComp =
            find(["sublocality_level_1", "sublocality"]) ||
            find(["neighborhood"]) ||
            find(["premise"]) ||
            find(["route"]);
        const postalComp = find(["postal_code"]);
        
        return {
            formattedAddress: result.formatted_address,
            placeId: result.place_id,
            lat: result.geometry?.location?.lat,
            lng: result.geometry?.location?.lng,
            country: countryComp?.long_name,
            state: stateComp?.long_name,
            city: cityComp?.long_name,
            area: areaComp?.long_name,
            neighborhood: find(["neighborhood"])?.long_name,
            postalCode: postalComp?.long_name,
            raw: result
        };
    } catch (err) {
        console.error("Geocoding error:", err);
        throw new Error("Could not fetch location information.");
    }
};
