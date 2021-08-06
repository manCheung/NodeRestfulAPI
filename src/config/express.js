import express from 'express';
import config from './config';
import index from '../server/routes/index.route';
import cors from 'cors';
import morgan from 'morgan';
import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import APPError from '../server/helper/AppError';

const app = express();

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
// HTTP request logger middleware for node.js
app.use(morgan('dev'));

/* GET home page. */
app.get('/', (req, res) => {
    res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
});

app.use('/api', index);

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    let errorMessage;
    let errorCode;
    // express validation error 
    if (err instanceof expressValidation.ValidationError) {
        errorMessage = "Validation Failed";
        if(typeof(err.details.body) !== 'undefined'){
            errorMessage = err.details.body[0].message;
        }
        errorCode = err.statusCode;

        const error = new APPError.APIError(errorMessage, errorCode);
        return next(error);

        // if (err.errors[0].location === 'query' || err.errors[0].location === 'body') {
        //     errorMessage = err.errors[0].messages;
        //     errorCode = 400;
        //     errorStatus = httpStatus.BAD_REQUEST;
        // }
        // const error = new APPError.APIError(errorMessage, errorStatus, true, errorCode);
        // return next(error);
    }
    return next(err);
});

//error handler, send stacktrace only during development
app.use(function (err, req, res, next) {
    res.status(err.status).json({
        message: err.message,
        status: err.status ? err.status : httpStatus[err.status],
        stack: config.env === 'development' ? err.stack : {}
    });
    next();
});

export default app;
