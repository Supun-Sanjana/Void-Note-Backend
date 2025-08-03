import jwt from 'jsonwebtoken'

const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startWith("Bearer ")) {
        return res.status(401).json({ 'message': "No token provided!" })
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 'message': "Invalid Token" })
    }
}

