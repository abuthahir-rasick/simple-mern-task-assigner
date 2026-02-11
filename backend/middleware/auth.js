const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;
        if(!authHeader){
            return res.status(403).json({
                success:false,
                message:'No token'
            })
        }
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

        req.user = jwt.verify(token, 'SECRET');
        next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:'Invalid token',
            error
        })
    }
}