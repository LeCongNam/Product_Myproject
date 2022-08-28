const jwt = require('jsonwebtoken');

async function generalToken({ id }) {
    const privateKey = process.env.PRIVATE_KEY
    const accessToken = jwt.sign(
        { 
            data: id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60), 
        },
         privateKey,
        { algorithm: 'RS256' },
        
    );

    const refreshToken = jwt.sign(
        { 
            data: id,
            exp: Math.floor(6*24*60*60*1000), 
        },
         privateKey,
        { algorithm: 'RS256' },
    );

    return {
        accessToken,
        refreshToken
    }
}