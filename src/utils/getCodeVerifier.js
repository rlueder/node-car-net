/**
 * @name getCodeVerifier
 * @summary Creates code verifier needed for PKCE protection.
 * @see {@link https://www.oauth.com/oauth2-servers/pkce/}
 * @param {number} length
 * @returns {string} - the PKCE code verifier
 */

const getCodeVerifier = (length = 128) => {
  let verifier = "";
  const str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  for (let i = 0; i < length; i++) {
    verifier += str.charAt(Math.floor(Math.random() * str.length));
  }
  return verifier;
};

export default getCodeVerifier;
