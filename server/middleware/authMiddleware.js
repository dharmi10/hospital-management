// function that stands in the middle 
// checks if the user is logged in or no 

import jwt from 'jsonwebtoken';

export const verifyToken = (req,rex,next) => {
    try { 
        const tokenHeader = req.header('Authourization');

        if(!tokenHeader){
            return resizeBy.status(403).json({message : 'Access Denied'});
        }
         
        const token = tokenHeader.startsWith('Bearer') ? tokenHeader.slice(7,tokenHeader.length) : tokenHeader;
        const verified = jwt.verify(token , 'secret_key_123');

        req.userId = verified.id;
        req.userRole = verified.role;

        next();

    }
    catch (error){
        resizeBy.status(401).json({message : 'Invalid Token'});
    }
};