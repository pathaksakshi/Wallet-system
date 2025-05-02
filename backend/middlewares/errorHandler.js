import AppError from "../utils/appError.js";

const handleCastErrorDB = err => new AppError(`Invalid ${err.path}: ${err.value}`,400)

/**
 * Sends an error response to the client.
 * @param {Error} err - The error object containing information about the error.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @description
 * If the error is operational (i.e. was intended to happen), it sends a JSON response
 * with the error message and status code. Otherwise, it logs the error and sends a
 * generic 500 error response.
 */
const sendError = (err,req,res)=>{
    if(err.statusCode){
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }else{
        console.log(err);
        res.status(500).json({
            status:'error',
            message:'Something went wrong'
        })
    }
}

/**
 * Global error-handling middleware for Express.
 * 
 * @function
 * @param {Object} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function.
 *
 * @description
 * Sets default `statusCode` and `status` if not provided.
 * Handles specific MongoDB errors (e.g., CastError).
 * Then passes the error to `sendError()` for response formatting.
 */ 
export default (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if(err.name === 'CastError') err = handleCastErrorDB(err);
    sendError(err,req,res);
}
