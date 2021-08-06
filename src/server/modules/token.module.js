import config from '../../config/config';
import jwt from 'jsonwebtoken';
import APPError from '../helper/AppError';


const generateToken = () => {
    return new Promise((resolve, reject) => {
        // generate JWT
        const payload = {
            companyName: "Hello",
            token: config.jwtSecret
        };
        const token = jwt.sign({ payload, exp: Math.floor(Date.now() / 1000) + (60 * 15) }, config.hash);
        if(token){
            resolve(Object.assign({ code: 200 }, { message: '', token }));
        }else{
            reject(new APPError.GetTokenError());
        }

    });
  };

export default {
    generateToken
};