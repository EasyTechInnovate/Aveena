import config from "../config/config.js";

export default async (query) => {
    try {
        console.log("heh");
        
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${config.google.apiKey}&types=(regions)`
        );

        const data = await res.json();
        console.log(data);
        
        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            throw new Error("Failed to search locations");
        }

        if (data.status === "ZERO_RESULTS") {
            return [];
        }

        const predictions = data.predictions.map(prediction => (prediction.description));

        return predictions;
    } catch (err) {
        console.error("Location search error:", err);
        throw new Error("Could not search locations.");
    }
};
