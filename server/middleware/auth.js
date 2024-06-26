import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {
    try {
        var token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimleft();
        }

        const verified = jwt.verify(token, process.env.jwt_secret);
        req.user = verified;

        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}