const errorHandler = (err, req, res, next)=>{
    let status = 500
    let message = "internal server error"

    switch (err.name) {
        case "BadRequest":
            status = err.status
            message = err.message
            break;
        case "Unauthorized":
            status = err.status
            message = err.message
            break;
        case "NotFound":
            status = err.status
            message = err.message
            break;
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors[0].message
            break;
        case "SequelizeValidationError":
            status = 400
            message = err.errors[0].message
            break;
        case "JsonWebTokenError":
            status = 401
            message = "jwt expired"
        default:
            break;
    }
    
    res.status(status).json(message)
}

module.exports = errorHandler