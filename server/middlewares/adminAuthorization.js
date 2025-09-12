async function adminAuthorization(req, res, next) {
    try {
        if(req.user.role !== "admin"){
            throw{name:"Forbidden", status:403, message:"Access danied. admins only"}
        }
        next()
    } catch (error) {
        next(error)
        
    }

}

module.exports = adminAuthorization