exports.restrict=(req,res,next)=>{
    if(!req.user){
        const url=req.originalUrl;
        return res.redirect(`/users/sign-in?retURL=${url}`);
    }

    next();
}