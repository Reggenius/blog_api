const jwt = require('jsonwebtoken');    //  generating and verifying JSON Web Tokens (JWT)
const crypto = require('crypto');
const config = require('config');

export default function generateAuthToken(user) {
    const options = {
        expiresIn: '7d', // 1wk
      };
    return jwt.sign({ id: user.id, username: "Blog" }, config.get('jwtPrivateKey'), options);
}

export function createResetPasswordToken() {
    const plainToken = crypto.randomBytes(32).toString('hex');
    const encryptedToken = crypto.createHash('sha256').update(plainToken).digest('hex');
    const tokens = { plainToken, encryptedToken}
    return tokens;
}