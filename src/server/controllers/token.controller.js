import tokenModule from '../modules/token.module';


const tokenPost = (req, res) => {
    tokenModule.generateToken().then((result) => {
      res.send(result);
    }).catch((err) => { return res.send(err); });
};

export default {
    tokenPost
};