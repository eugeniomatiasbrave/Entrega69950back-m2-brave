export const executePolicies = (policies) =>{
    return (req,res,next)=>{
        
        console.log('Policies:', policies);
        console.log('User:', req.user);

        if(policies.includes('PUBLIC')) return next();
        if(policies.includes('AUTHORIZED')&& !req.user) return res.sendUnauthorized();
        if(policies.includes(req?.user?.role?.toUpperCase())) return next(); // toUpperCase() para evitar errores de mayusculas y minusculas
        return res.status(401).redirect('/unauthorized');
    }
}