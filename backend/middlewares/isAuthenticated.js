import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env variables

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET); // ✅ correct env variable

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Token verification failed",
            success: false
        });
    }
};

export default isAuthenticated;
