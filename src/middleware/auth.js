export const checkRole = (role) => {
    return (req, res, next) => {
        if(!req.user){
            return res.json({status:"error", message:"Necesitas estar autenticado"});
        }
        if(!role.includes(req.user.rol)){
            return res.json({status:"error", message:"No estas autorizado"});
        }
        next();
    }
};