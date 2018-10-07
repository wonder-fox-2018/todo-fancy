const crypto = require('crypto');

function encryptPassword(instance) {
    const secret = process.env.SECRET_PASSWORD;
    const hash = crypto.createHmac('sha256', secret)
                        .update(instance.password)
                        .digest('hex');
    
    instance.password = hash;

    return instance;
}

module.exports = encryptPassword;