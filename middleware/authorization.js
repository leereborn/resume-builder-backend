const jwt = require('jsonwebtoken');

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(err.status).json({success: false, err});
        } else {
          req.decodedToken = decodedToken.email;
          next();
        }
      });
    } else {
        res.status(401).json({success: false, err:{msg:"Authorization failed. JWT token does not exists"}});
    }
};