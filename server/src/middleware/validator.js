import httpError from "../util/httpError.js";



export default (schema, type) => {
    return (req, res, next) => {
        try {
            
            const parsed = schema.safeParse(type === 'query' ? req.query : req.body);
            
            if (!parsed.success) {
                
                const firstError = parsed.error.issues[0]; 
                
                return httpError(next, new Error(firstError.message), req, 400);
            }
            
            if(type === 'body') {
                req.body = parsed.data;
            }
            
            next();
        } catch (err) {
            return httpError(next, err, req, 500);
        }
    };
}


