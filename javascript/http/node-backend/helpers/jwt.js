const jwt = require('jsonwebtoken');

/**
 *
 * @param {string} uid - ID del usuario
 * @returns {Promise<string>} - Token del usuario loggeado
 */
const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
