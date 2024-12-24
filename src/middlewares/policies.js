export const executePolicies = (policies) =>{
    return (req,res,next)=>{
        if(policies.includes('PUBLIC')) return next();
        if(policies.includes('AUTHORIZED')&& !req.user) return res.status(401).send('Unauthorized');
        if(policies.includes(req?.user?.role?.toUpperCase())) return next(); // toUpperCase() para evitar errores de mayusculas y minusculas
        //return res.status(401).send('/unauthorized');
    }
}