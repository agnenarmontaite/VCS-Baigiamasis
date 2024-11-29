import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        // Tikrinama ar yra autorizacijos header / lyginam / paduodam duomenis
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwidXNlcklkIjoiNjc0OTkzNDA1ODRlYjhhYjMxODE3Mzk2Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMyODgxOTEzLCJleHAiOjE3MzI4ODkxMTN9.j3YASUu48JW-nbNkhJHllMb_w4S23lF9PC7-hbHbmc4'
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded user data:', decoded)
        req.userData = decoded;
        next();
    } catch (error) {
        console.log('auth fail', error)
        return res.status(401).json({
            message: 'Authentication fail'
        });
    }
};

export default auth;