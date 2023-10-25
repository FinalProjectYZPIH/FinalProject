import { logError } from "../utils/writeFile.js";

export async function errorHandler(err, req, res, next) {
//     // logError(err);  // als file ausschreiben 
    // const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // res.status(statusCode);
    // res.json({
    //   message: err?.message,
    //   // stack: process.env.NODE_ENV === "production" ? null : err.stack,
    // });

const errorStatus = err.status || 500;
const errorMessage = err || err.message;
return res.status(errorStatus).json({
    success:false,
    message: errorMessage,
    // stack: err.stack
})
}

