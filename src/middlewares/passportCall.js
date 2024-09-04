import passport from "passport";

export const passportCall = (strategy) =>{
    return async(req,res,next)=>{
        passport.authenticate(strategy,function(error,user,info){
            //Aquí cae toda la info del "done" de las estrategias.
            if(error) return next(error);
            
            if(!user){
                req.user = null;
            }
            
            req.user = user;
            next();
        })(req,res,next);
    }
}