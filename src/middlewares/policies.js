export const executePolicies = (policies) =>{
    return (req,res,next)=>{
        if(policies.includes('PUBLIC')) return next();
        if(policies.includes('AUTHORIZED')&& !req.user) return res.sendUnauthorized();
        if(policies.includes(req?.user?.role?.toUpperCase())) return next(); // toUpperCase() para evitar errores de mayusculas y minusculas
        return res.sendUnauthorized();
    }
}


/*

Quisiera desarollar la logica de permisos:
Poder  como admin y como user.
El rol de admin:
-que tenga acceso a rutas de crear , actualizar y eliminar productos. /realTimeProducts.
-que no pueda agregar productos al carrito.

El rol de user:
-que tenga acceso a rutas de agregar productos al carrito.
-que no pueda acceder a las rutas de crear, actualizar y eliminar productos.

*/