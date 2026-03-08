import jwt from 'jsonwebtoken';


export const protect = (req, res, next) => {


    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.startWith('Bearer')) {

        return res.status(401).json({ message: "not authorizd" });
    }

    const token = authHeader.aplit('')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {

        return res.status(401).json({ message: "inavlid token" });

    }

};